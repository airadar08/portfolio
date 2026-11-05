import asyncio
import os
import re
import logging
from contextlib import suppress
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import List, Literal, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Query
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from pymongo import ASCENDING, DESCENDING, IndexModel, ReturnDocument
from pymongo.errors import DuplicateKeyError
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

INDEXES: dict[str, list[IndexModel]] = {
    "subscribers": [
        IndexModel([("email", ASCENDING)], name="email", unique=True),
    ],
    "leaderboard": [
        IndexModel([("points", DESCENDING)], name="points_desc"),
    ],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)


LEADERBOARD_SEED = [
    {"handle": "@arjun.watches", "points": 2840, "comments": 96},
    {"handle": "@reel_detective", "points": 2615, "comments": 88},
    {"handle": "@mumbai.noir", "points": 2402, "comments": 81},
    {"handle": "@fourminutetheory", "points": 2187, "comments": 76},
    {"handle": "@chawl.chronicles", "points": 1954, "comments": 70},
    {"handle": "@dadardiaries", "points": 1730, "comments": 64},
    {"handle": "@neon.local", "points": 1588, "comments": 59},
    {"handle": "@plot.twist.police", "points": 1421, "comments": 52},
    {"handle": "@late.local.lata", "points": 1276, "comments": 47},
    {"handle": "@vada.pav.vision", "points": 1102, "comments": 41},
    {"handle": "@signal.from.bandra", "points": 987, "comments": 36},
    {"handle": "@cst.midnight", "points": 843, "comments": 31},
]

VOTE_META = {
    "episode": "EP 4",
    "question": "The train is moving. The real mask is in the director's safe, and you hold the only key.",
    "a_label": "STEAL",
    "a_detail": "Do their job. Break into the director's office and take the real mask.",
    "b_label": "JUMP",
    "b_detail": "Throw the key away and leap from the moving train.",
}


app = FastAPI()
api_router = APIRouter(prefix="/api")


class VoteIn(BaseModel):
    choice: Literal["a", "b"]


class SubscribeIn(BaseModel):
    email: EmailStr


def vote_payload(doc: dict) -> dict:
    a, b = doc["a"], doc["b"]
    total = a + b
    if total == 0:
        a_pct = b_pct = 50.0
    else:
        a_pct = round(a * 1000 / total) / 10
        b_pct = round(b * 1000 / total) / 10
    return {
        **VOTE_META,
        "a": a,
        "b": b,
        "total": total,
        "a_pct": a_pct,
        "b_pct": b_pct,
    }


@api_router.get("/")
async def root():
    return {"message": "The Four Minutes API"}


IST = timezone(timedelta(hours=5, minutes=30))
# Daily publish time in IST (24h clock). Override with PUBLISH_HOUR_IST / PUBLISH_MINUTE_IST.
PUBLISH_HOUR_IST = int(os.environ.get("PUBLISH_HOUR_IST", "19"))
PUBLISH_MINUTE_IST = int(os.environ.get("PUBLISH_MINUTE_IST", "0"))


def next_drop_utc() -> datetime:
    """Next daily episode drop. Each vote window is 24h and closes at this moment."""
    now = datetime.now(IST)
    drop = now.replace(hour=PUBLISH_HOUR_IST, minute=PUBLISH_MINUTE_IST, second=0, microsecond=0)
    if drop <= now:
        drop += timedelta(days=1)
    return drop.astimezone(timezone.utc)


@api_router.get("/stats")
async def get_stats():
    doc = await db.config.find_one({"key": "story"}, {"_id": 0}) or {}
    doc["drop_at"] = next_drop_utc().isoformat()
    doc["vote_closes_at"] = doc["drop_at"]
    return doc


@api_router.get("/vote")
async def get_vote():
    doc = await db.vote_counts.find_one({"key": "ep4"}, {"_id": 0})
    return vote_payload(doc)


@api_router.post("/vote")
async def cast_vote(vote: VoteIn):
    doc = await db.vote_counts.find_one_and_update(
        {"key": "ep4"},
        {"$inc": {vote.choice: 1, "site_boosts": 1}},
        projection={"_id": 0},
        return_document=ReturnDocument.AFTER,
    )
    return vote_payload(doc)


@api_router.get("/leaderboard")
async def get_leaderboard(search: Optional[str] = Query(None)):
    query = {}
    if search:
        query = {"handle": {"$regex": re.escape(search.lstrip("@")), "$options": "i"}}
    docs = await db.leaderboard.find(query, {"_id": 0}).sort("points", DESCENDING).limit(50).to_list(50)
    for i, d in enumerate(docs):
        d["rank"] = i + 1
    return docs


@api_router.post("/subscribe")
async def subscribe(body: SubscribeIn):
    email = body.email.lower().strip()
    try:
        await db.subscribers.insert_one(
            {"email": email, "created_at": datetime.now(timezone.utc).isoformat()}
        )
    except DuplicateKeyError:
        return {"status": "exists", "message": "You're already on the list. The drop will find you."}
    return {"status": "ok", "message": "You're on the list. Watch your inbox before EP 5."}


async def seed() -> None:
    # Story config: static fields refreshed on every start, drop date set once.
    await db.config.update_one(
        {"key": "story"},
        {
            "$set": {
                "proof_pct": 6,
                "heat_pct": 86,
                "comments": 0,
            },
        },
        upsert=True,
    )
    await db.config.update_one(
        {"key": "story"},
        {"$unset": {"cash_in_play": "", "cash_secured_pct": ""}},
    )
    await db.vote_counts.update_one(
        {"key": "ep4"},
        {"$setOnInsert": {"a": 0, "b": 0, "site_boosts": 0}},
        upsert=True,
    )
    if await db.leaderboard.count_documents({}) == 0:
        await db.leaderboard.insert_many(LEADERBOARD_SEED)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())
    await seed()


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
