# Lumi Entertainment

Static site for DJ Lumi / Lumi Entertainment LLC. Plain HTML, CSS, and a little JavaScript. No build step.

Preview it locally from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## GitHub Pages

The site is meant to be served from the repository root on `main`.

- Do not add a `CNAME` file until the owner approves the domain switch. The live Squarespace site stays up until then.
- Paths are relative, so the same files work as a project site at `https://lumiwhatever.github.io/lumientertainment-site/` and, later, at `https://www.lumientertainment.net/`.
- Canonical, Open Graph, and structured data URLs already point at `https://www.lumientertainment.net/`.
- `.nojekyll` is present so GitHub Pages serves the files as-is.

After the owner approves the cutover, add a `CNAME` file containing `www.lumientertainment.net` and point the domain at GitHub Pages.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/weddings/` | `weddings/index.html` (nav label: Events) |
| `/gallery/` | `gallery/index.html` |
| `/booklumi/` | `booklumi/index.html` |
| `/booklumi/thanks/` | thank-you page after the form |
| `/home/` | redirect to `/` |
| `/reviews/` | scaffold only. Not linked in the nav. `noindex` until real reviews exist. |

## Add a gallery photo or video

Edit the list in `js/gallery-items.js`. Paths are relative to the site root (the folder that contains `index.html`).

A photo:

```js
{
  type: "image",
  alt: "Describe what is actually in the photo.",
  caption: "Short caption",
  width: 1600,
  height: 900,
  src: "images/gallery/photo.webp",
  fallback: "images/gallery/photo.jpg"
}
```

A video file (the file loads only when the tile is near the screen):

```js
{
  type: "video",
  alt: "Describe the video.",
  caption: "Short caption",
  width: 1280,
  height: 720,
  src: "videos/set.mp4",
  poster: "images/gallery/set-poster.webp"
}
```

A YouTube video (the player loads only after a tap):

```js
{
  type: "youtube",
  title: "Title of the video",
  caption: "Short caption",
  id: "VIDEO_ID"
}
```

Use the id from the YouTube URL, not the full link. Put new image files in `images/gallery/` and video files in `videos/`. WebP plus a JPEG fallback is ideal. A single JPEG works if that is all you have.

The triptych on the Events page (`images/scenes-1400.webp`) is a generated background, not a photo of a Lumi event, so it is not in the gallery.

## Add a review

`reviews/index.html` is a scaffold and is hidden from the header and footer. When a real client writes a review:

1. Add it with the markup in the HTML comment on that page. Do not write a placeholder quote.
2. Remove `<meta name="robots" content="noindex,follow">`.
3. Add a Reviews link next to Gallery in the header and footer of every page.

## Inquiry form

The form posts to [FormSubmit](https://formsubmit.co/lumi@lumientertainment.net) at `lumi@lumientertainment.net`.

The first submission sends a confirmation email to that address. The owner has to open it and confirm before inquiries are delivered. The form includes a honeypot field named `_honey`, a subject, and a thank-you redirect (`_next`).

## Coverage line

Use this sentence until the owner confirms or changes it:

Based in Naples, FL. Serving Southwest Florida and beyond.

## Brand

- Near-black `#18181B`, warm off-white `#F6F6F4`, crimson `#B51217`
- Montserrat for headings, Inter for body (files in `fonts/`)
- Phone `(239) 687-6355` in the footer and on the Book Lumi page only. Email `lumi@lumientertainment.net`
- Instagram `https://instagram.com/djlumiofficial`
- TikTok `https://www.tiktok.com/@lumiwhatever`
