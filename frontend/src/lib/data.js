export const LINKS = {
  instagram: "https://www.instagram.com/thefourminutes",
  youtube: "https://www.youtube.com/@thefourminutes",
};

export const IMAGES = {
  hero: `${process.env.PUBLIC_URL}/images/hero.jpg`,
  ep1: `${process.env.PUBLIC_URL}/images/ep1.jpg`,
  ep2: `${process.env.PUBLIC_URL}/images/ep2.jpg`,
  ep3: `${process.env.PUBLIC_URL}/images/ep3.jpg`,
  ep4: "https://images.unsplash.com/photo-1609761884183-5b8121294194?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjB0aHJpbGxlciUyMHBvcnRyYWl0JTIwc2hhZG93JTIwZHJhbWF8ZW58MHx8fHwxNzkzODIxNzcxfDA&ixlib=rb-4.1.0&q=85",
  film: "https://images.pexels.com/photos/10586614/pexels-photo-10586614.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const EPISODES = [
  {
    id: "ep1",
    num: "EP 01",
    title: "The Gold Mask",
    date: "RELEASED",
    status: "RELEASED",
    choice: "A museum job goes sideways. Juno walks out holding a gold mask with deep blue stripes.",
    image: IMAGES.ep1,
    alt: "EP 1 poster: Juno reaches for the gold mask in its glass case while a masked guard watches from the shadows",
    locked: false,
  },
  {
    id: "ep2",
    num: "EP 02",
    title: "Run",
    date: "RELEASED",
    status: "RELEASED",
    choice: "The city chose: RUN · 75%",
    image: IMAGES.ep2,
    alt: "EP 2 poster: Juno runs through the museum hall clutching the green bundle, a guard with a torch chasing behind",
    locked: false,
  },
  {
    id: "ep3",
    num: "EP 03",
    title: "The Midnight Train",
    date: "RELEASED",
    status: "RELEASED",
    choice: "The city chose: BOARD · 80%",
    image: IMAGES.ep3,
    alt: "EP 3 poster: Juno on a rainy midnight platform as the Detective boards the dark-red train",
    locked: false,
  },
  {
    id: "ep4",
    num: "EP 04",
    title: "The Unmasking",
    date: "NOW",
    status: "VOTING OPEN",
    choice: "The city is deciding: STEAL or JUMP. Comment your choice on the latest Reel.",
    image: IMAGES.ep4,
    alt: "Inside a dark-maroon train carriage, two figures face a woman in a mustard-yellow jacket",
    locked: false,
    live: true,
  },
  {
    id: "ep5",
    num: "EP 05",
    title: "██████████",
    date: "TBA",
    status: "CLASSIFIED",
    choice: "Written by whoever votes. Sealed until then.",
    image: IMAGES.ep4,
    alt: "Blurred figure framed by a glowing doorway, contents classified",
    locked: true,
  },
];

export const CHARACTERS = [
  {
    id: "juno",
    image: `${process.env.PUBLIC_URL}/images/char-juno.jpg`,
    alt: "Juno in a red beanie and mustard jacket, clutching the gold mask in a green bundle",
    name: "Juno",
    role: "The one holding the bundle",
    blurb:
      "Short dark-brown bob, red knit beanie, an oversized mustard work jacket. She carries a faded green cloth bundle and a mask that may be worthless. Now the prime suspect.",
  },
  {
    id: "detective",
    image: `${process.env.PUBLIC_URL}/images/char-detective.jpg`,
    alt: "The Detective in a trench coat and dark scarf, holding a leather folder",
    name: "The Detective",
    role: "Calm. Cold. Holding the photo.",
    blurb:
      "Long trench coat, dark scarf, low black ponytail. She was never chasing the mask. She was chasing Juno.",
  },
  {
    id: "landlord",
    image: `${process.env.PUBLIC_URL}/images/char-guard.jpg`,
    alt: "The Guard in a navy uniform and peaked cap, his face lost in shadow",
    name: "The Guard",
    role: "Black mask. Gloved hands.",
    blurb:
      "Navy uniform, silver buttons, a face nobody has seen. Until the train. Juno knows that face, and has paid it rent.",
    spoiler: true,
  },
];

export const FAQS = [
  {
    q: "How does voting work?",
    a: "Every episode ends on a two-way cliffhanger. Watch the Reel, then comment the keyword, like STEAL or JUMP, on the latest post within 24 hours. The majority becomes canon and writes the next episode.",
  },
  {
    q: "When do episodes drop?",
    a: "A new episode of about a minute drops every day on Instagram Reels, narrated in Hinglish. Each vote stays open for 24 hours and closes when the next episode goes live.",
  },
  {
    q: "Is it free?",
    a: "Watching and voting is free, forever. The Supporter Pass exists for those who want early intel, extended cuts, and their name in the credits. The story itself belongs to everyone.",
  },
  {
    q: "Can my brand appear in the story?",
    a: "Yes. A signboard, a chai stall, a train door. Write to collab@thefourminutes.in and the writers' room will take it from there.",
  },
];

export const nextVoteDeadlineIso = () => {
  const now = new Date();
  const target = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 15, 30, 0)
  );
  if (now >= target) target.setUTCDate(target.getUTCDate() + 1);
  return target.toISOString();
};
