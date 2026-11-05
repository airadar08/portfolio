# The Four Minutes

Interactive thriller site. React (CRA + craco) frontend, FastAPI + MongoDB backend.

## Run

```bash
# 1. MongoDB (Docker)
docker run -d --name fm-mongo -p 27017:27017 mongo:7

# 2. Backend  -> http://localhost:8001
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# 3. Frontend -> http://localhost:3000
cd frontend
npm install
npm start
```
