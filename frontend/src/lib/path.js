// Prefix public-folder URLs so the site works from a sub-path (e.g. GitHub Pages).
export const P = (p) => `${process.env.PUBLIC_URL}${p}`;
