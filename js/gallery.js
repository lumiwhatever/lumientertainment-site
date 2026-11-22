(function () {
  var data = window.LUMI_GALLERY;
  var root = document.getElementById("gallery");
  if (!data || !root) return;

  var base = data.siteRoot;
  var items = data.items || [];

  function abs(path) {
    return new URL(path, base).href;
  }

  function mapSrcset(value) {
    return value.split(",").map(function (part) {
      var bits = part.trim().split(/\s+/);
      bits[0] = abs(bits[0]);
      return bits.join(" ");
    }).join(", ");
  }

  function makeImage(item, eager) {
    var picture = document.createElement("picture");
    var useWebp = (item.src && /\.webp($|\?)/i.test(item.src)) || item.srcset;
    if (useWebp && (item.fallback || item.srcset)) {
      var source = document.createElement("source");
      source.type = "image/webp";
      source.srcset = item.srcset ? mapSrcset(item.srcset) : abs(item.src);
      if (item.sizes) source.sizes = item.sizes;
      picture.appendChild(source);
    }
    var img = document.createElement("img");
    img.src = abs(item.fallback || item.src);
    img.alt = item.alt || "";
    if (item.width) img.width = item.width;
    if (item.height) img.height = item.height;
    if (item.sizes && !useWebp && item.srcset) {
      img.srcset = mapSrcset(item.srcset);
      img.sizes = item.sizes;
    }
    img.decoding = "async";
    img.loading = eager ? "eager" : "lazy";
    if (eager) img.setAttribute("fetchpriority", "high");
    picture.appendChild(img);
    return picture;
  }

  function figure(item, node, wide) {
    var fig = document.createElement("figure");
    if (wide || item.wide) fig.className = "is-wide";
    fig.appendChild(node);
    if (item.caption) {
      var cap = document.createElement("figcaption");
      cap.textContent = item.caption;
      fig.appendChild(cap);
    }
    return fig;
  }

  if (!items.length) {
    var empty = document.createElement("p");
    empty.textContent = "Photos and videos will be added here.";
    root.appendChild(empty);
    return;
  }

  items.forEach(function (item, index) {
    if (item.type === "youtube") {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "yt";
      var title = item.title || item.caption || "Play video";
      button.setAttribute("aria-label", "Play video: " + title);
      var poster = item.poster ? abs(item.poster) : "https://i.ytimg.com/vi/" + encodeURIComponent(item.id) + "/hqdefault.jpg";
      var posterImg = document.createElement("img");
      posterImg.src = poster;
      posterImg.alt = "";
      posterImg.loading = "lazy";
      posterImg.decoding = "async";
      if (item.width) posterImg.width = item.width;
      if (item.height) posterImg.height = item.height;
      var play = document.createElement("span");
      play.className = "play";
      play.setAttribute("aria-hidden", "true");
      button.appendChild(posterImg);
      button.appendChild(play);
      button.addEventListener("click", function () {
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(item.id) + "?autoplay=1";
        iframe.title = title;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        button.replaceWith(iframe);
      });
      root.appendChild(figure(item, button, false));
      return;
    }

    if (item.type === "video") {
      var video = document.createElement("video");
      video.controls = true;
      video.preload = "none";
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      if (item.poster) video.poster = abs(item.poster);
      if (item.width) video.width = item.width;
      if (item.height) video.height = item.height;
      video.setAttribute("aria-label", item.alt || item.title || "Event video");

      function attach() {
        if (video.querySelector("source")) return;
        var source = document.createElement("source");
        source.src = abs(item.src);
        source.type = item.mime || "video/mp4";
        video.appendChild(source);
        if (item.captions) {
          var track = document.createElement("track");
          track.kind = "captions";
          track.src = abs(item.captions);
          track.srclang = item.srclang || "en";
          track.label = item.captionLabel || "English";
          track.default = item.defaultCaptions !== false;
          video.appendChild(track);
        }
        video.load();
      }

      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              attach();
              observer.disconnect();
            }
          });
        }, { rootMargin: "400px" });
        observer.observe(video);
      } else {
        attach();
      }

      root.appendChild(figure(item, video, false));
      return;
    }

    var picture = makeImage(item, index === 0);
    var full = abs(item.src || item.fallback);
    var link = document.createElement("a");
    link.className = "zoom";
    link.href = full;
    link.appendChild(picture);
    root.appendChild(figure(item, link, false));
  });

  var dialog = document.getElementById("lightbox");
  var dialogImg = document.getElementById("lightbox-img");
  if (!dialog || !dialogImg || typeof dialog.showModal !== "function") return;

  root.addEventListener("click", function (event) {
    var link = event.target.closest("a.zoom");
    if (!link) return;
    event.preventDefault();
    var img = link.querySelector("img");
    dialogImg.src = link.href;
    dialogImg.alt = img ? img.alt : "";
    if (img && img.width) dialogImg.width = img.width;
    if (img && img.height) dialogImg.height = img.height;
    dialog.showModal();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    dialogImg.removeAttribute("src");
  });
})();
