import { P } from "@/lib/path";
// Content for the portfolio. Anything in [square brackets] is a fact only you know —
// fill these before publishing. They render as dashed "add" pills so they're easy to spot.
export const TODO = (label) => ({ todo: label });

export const SITE = {
  name: "Arin",
  headline: "I turn ideas into AI-made stories, automatically.",
  pitch:
    "I turn ideas into automated workflows, from enterprise AI agents to a one-command pipeline that makes finished story videos.",
  bio:
    "I'm Arin, an AI consultant who builds automation and agentic workflows for enterprises, and I make AI-generated story videos end to end. Before this I was a Business Analyst working on procurement automation. I'm based in Pune, with a background in electronics and telecommunication engineering.",
  link: "The same automation thinking I apply to business workflows, applied to storytelling.",
  role: "AI Consultant · enterprise agentic AI",
  location: "Pune, Maharashtra",
  education: "B.E. Electronics & Telecommunication, IET DAVV Indore",
  email: { label: "arinsingh2304@gmail.com", href: "mailto:arinsingh2304@gmail.com" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/arin-singh-70a66b256/" },
};

export const PROOF = [
  { label: "Videos or episodes produced", value: TODO("number") },
  { label: "Total views", value: TODO("number") },
  { label: "Avg. production time / episode", value: TODO("number") },
  { label: "Platforms", value: "Instagram · YouTube Shorts · X" },
];

export const SERIES = {
  summary:
    "A three-episode, Hinglish interactive thriller where viewers vote in the comments and the next episode follows the winning choice.",
  story:
    "A night cleaner at a museum has a 4-minute window at 3:12 AM. A guard offers her a golden mask to steal, and her rent is overdue. Each episode ends on a binary choice: TAKE or WALK, then RUN or TELL, then BOARD or HIDE.",
  points: [
    ["Audience as co-writer", "EP2 opens with the poll result on screen, then continues from the winning choice. The vote is part of the plot, not an add-on."],
    ["Built-in tension device", "A “3:59 LEFT” countdown and alarm UI run through EP1, so the clock itself carries the suspense."],
    ["Consistent character", "The red beanie, yellow jacket and cargo pants stay recognisable across three episodes and three locations: museum, locker room, railway platform."],
    ["Twists planted early", "The yellow glove clue in EP2, the “FAKE” mask reveal and the detective boarding the train with the guard in EP3 pay off the setup."],
    ["Native language", "Hinglish voiceover and captions, written for Indian short-form viewers."],
  ],
  episodes: [
    { id: "ep1", tag: "EP1 · 0:44", choice: "TAKE or WALK", src: P("/videos/ep1.mp4"), poster: P("/images/posters/ep1.jpg") },
    { id: "ep2", tag: "EP2 · 0:59", choice: "RUN or TELL", src: P("/videos/ep2.mp4"), poster: P("/images/posters/ep2.jpg") },
    { id: "ep3", tag: "EP3 · 0:59", choice: "BOARD or HIDE", src: P("/videos/ep3.mp4"), poster: P("/images/posters/ep3.jpg") },
  ],
  results: TODO("views, comments, vote counts, follows gained, watch-through rate, per episode"),
  tools: TODO("image model, video model, voice, editor, automation tool"),
};

export const HISTORY = {
  summary:
    "A 55-second vertical short that mixes a realistic AI presenter speaking to camera with cinematic period scenes: a fort gate, baskets of sweets carried past guards, a rider, and a Maratha ruler under a saffron flag.",
  points: [
    ["Photoreal range", "A different look from the illustrated series, proving I can switch genre and visual style."],
    ["Presenter plus B-roll", "A talking head frames the story, then scenes play it out: the format documentary channels use, built with AI."],
    ["Culturally specific detail", "Costume, architecture and Indian history, which generic prompts rarely get right without careful direction."],
    ["Cinematic grading", "Warm light, shallow depth of field, slow camera moves."],
  ],
  video: { tag: "Cinematic history · 0:55", src: P("/videos/maratha.mp4"), poster: P("/images/posters/maratha.jpg") },
  results: TODO("views, shares, saves, retention"),
};

export const FORMAT = {
  summary:
    "A 27-second stick-figure explainer in Hinglish that turns a “what if” question into a story with a hook, a twist and a closing question.",
  beats: [
    ["Hook", "“Imagine the whole world freezes and only you can move.”"],
    ["Payoff", "No traffic, no school, no office, free pizza."],
    ["Turn", "No internet, no electricity, and only you are moving."],
    ["Twist", "A frozen man's eyes slowly turn toward you."],
    ["Question", "“If the world froze, would you really be alone?”"],
  ],
  points: [
    ["Built to repeat", "The title says “Day 3”, so it reads as a daily series: consistency and volume."],
    ["Simple look, designed feel", "An illustrated stick figure on realistic backgrounds keeps generation simple while still feeling designed."],
    ["Captions as a track", "Subtitles are embedded, so the same file works with or without burned-in text."],
    ["Fast to produce", "One question in, one short out. This is the throughput proof."],
  ],
  video: { tag: "Day 3 · 0:27", src: P("/videos/day3.mp4"), poster: P("/images/posters/day3.jpg") },
  results: TODO("days posted, total views, best-performing day, posting streak"),
};

export const PIPELINE = [
  { n: "01", title: "Story", tool: "Claude", body: "From a story idea, Claude writes story.json: narration and an image prompt for every scene, plus one shared art style and character description.", out: "01_script/story.json" },
  { n: "02", title: "Images", tool: "OpenAI gpt-image-1", body: "Every scene is drawn vertically at 1024×1536. A fixed character description in each prompt, plus an optional reference image, keeps the character consistent.", out: "02_images/scene_NN.png" },
  { n: "03", title: "Voice", tool: "ElevenLabs", body: "Each scene is narrated through the timestamps endpoint, which returns timing for every word and drives the captions.", out: "03_audio/scene_NN.mp3" },
  { n: "04", title: "Edit", tool: "ffmpeg", body: "A slow zoom at 30 fps, alternating direction by scene, is synced to the narration. Scenes are joined and captions are timed from the word timings, three words at a time.", out: "04_clips/ · 05_captions/captions.srt" },
  { n: "05", title: "Review & final", tool: "ffmpeg · Python", body: "Captions are burned in and every run saves a new final_vN.mp4. A review.html page shows each scene's image, narration, prompt and audio player.", out: "06_final/final_vN.mp4" },
];

export const PIPELINE_POINTS = [
  ["Fix one scene, pay for one scene", "Existing images and audio are reused, so a re-run regenerates only what you changed."],
  ["Every run is a new version", "Each run saves its own final_vN.mp4, so versions can be compared side by side."],
  ["Captions timed, not guessed", "Timing comes from the voice service's word-level timestamps."],
  ["Vertical by default", "9:16 output for short-form, with a horizontal option."],
  ["Keys stay out of the loop", "API keys live in a .env file and never appear in prompts or chat."],
];

export const STORY_JSON = `{
  "title": "The Last Chai Stall",
  "style": "<one shared art style>",
  "character": "<one fixed character description>",
  "scenes": [
    {
      "narration": "<what the voice says>",
      "image_prompt": "<what the scene looks like>"
    }
  ]
}`;

export const PIPELINE_TOOLS = ["Claude", "OpenAI gpt-image-1", "ElevenLabs", "ffmpeg", "Python"];

export const SERVICES = [
  "Done-for-you AI story or explainer series for brands and creators.",
  "Story-to-video pipelines: one story file in, a captioned 9:16 video out.",
  "Enterprise AI agents and automation for repetitive business workflows.",
  "Hindi and Hinglish AI video, captions and voice.",
  "Consulting: audit a team's process and automate it.",
];

export const SKILLS = [
  "AI video generation", "Image & character consistency", "Scriptwriting & story structure", "AI voice",
  "Video editing & captions", "Workflow automation & agents", "Python", "Short-form storytelling",
];
