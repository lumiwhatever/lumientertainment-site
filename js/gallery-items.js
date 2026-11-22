/* Gallery list — add a photo or video by appending one object.
   Paths are relative to the site root (the folder with index.html).

   Photo (WebP, with a JPEG fallback for older browsers):
   {
     type: "image",
     alt: "Describe what is actually in the photo.",
     caption: "Short caption",
     width: 1600,
     height: 900,
     src: "images/gallery/photo.webp",
     srcset: "images/gallery/photo-800.webp 800w, images/gallery/photo.webp 1600w",
     fallback: "images/gallery/photo.jpg"
   }

   A single JPEG is enough if you do not have a WebP:
   { type: "image", alt: "...", caption: "...", width: 1600, height: 900, src: "images/gallery/photo.jpg" }

   Video file. The file is not requested until the tile is near the screen.
   Optional captions: a WebVTT file in captions, srclang, captionLabel.
   {
     type: "video",
     alt: "Describe the video.",
     caption: "Short caption",
     width: 1280,
     height: 720,
     src: "videos/set.mp4",
     mime: "video/mp4",
     poster: "images/gallery/set-poster.webp"
   }

   YouTube. The player loads only after a tap. Use the video id, not the full URL.
   { type: "youtube", title: "Title of the video", caption: "Short caption", id: "VIDEO_ID" }
*/
(function () {
  var script = document.currentScript;
  var src = script && script.src;
  if (!src) {
    var scripts = document.getElementsByTagName("script");
    src = scripts[scripts.length - 1].src;
  }
  var siteRoot = new URL("../", src);

  var items = [
    {
      type: "image",
      alt: "DJ Lumi smiling behind a DJ controller at an outdoor evening event, wearing a black suit with headphones around his neck.",
      caption: "Evening set",
      width: 2000,
      height: 2664,
      src: "images/hero-2000.webp",
      srcset: "images/hero-800.webp 800w, images/hero-1400.webp 1400w, images/hero-2000.webp 2000w",
      fallback: "images/hero-1400.jpg",
      sizes: "(min-width: 800px) 48vw, 100vw"
    },
    {
      type: "image",
      alt: "A celebration hall seen from the DJ booth: a controller in the foreground, a white throne chair and tiered cake on a stage, draped ceilings, and purple uplighting.",
      caption: "Before the floor fills",
      width: 2200,
      height: 1237,
      src: "images/reception-2200.webp",
      srcset: "images/reception-900.webp 900w, images/reception-1600.webp 1600w, images/reception-2200.webp 2200w",
      fallback: "images/reception-1600.jpg",
      sizes: "(min-width: 800px) 48vw, 100vw"
    }
  ];

  window.LUMI_GALLERY = { siteRoot: siteRoot.href, items: items };
})();
