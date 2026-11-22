(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var label = toggle.querySelector(".sr-only");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      if (label) label.textContent = open ? "Close menu" : "Open menu";
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 960px)").matches && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });
  }

  var focusable = document.querySelectorAll("input, textarea, select");
  focusable.forEach(function (el) {
    el.addEventListener("focus", function () {
      document.body.classList.add("input-focus");
    });
    el.addEventListener("blur", function () {
      document.body.classList.remove("input-focus");
    });
  });

  var form = document.getElementById("inquiry");
  if (!form) return;

  var next = form.querySelector('input[name="_next"]');
  if (next) {
    var path = window.location.pathname.replace(/index\.html$/, "");
    if (path.slice(-1) !== "/") path += "/";
    next.value = window.location.origin + path + "thanks/";
  }

  var select = form.querySelector('[name="Type of Event"]');
  var otherWrap = document.getElementById("other-field");
  var otherInput = document.getElementById("event-other");
  var subject = form.querySelector('input[name="_subject"]');

  function syncOther() {
    if (!select || !otherWrap || !otherInput) return;
    var on = select.value === "Other";
    otherWrap.hidden = !on;
    otherInput.required = on;
    if (!on) otherInput.value = "";
  }

  if (select) {
    select.addEventListener("change", syncOther);
    var preset = new URLSearchParams(window.location.search).get("type");
    if (preset) {
      Array.prototype.forEach.call(select.options, function (option) {
        if (option.value === preset) select.value = preset;
      });
    }
    syncOther();
  }

  var dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    var now = new Date();
    var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    dateInput.min = local.toISOString().slice(0, 10);
  }

  form.addEventListener("submit", function () {
    if (!subject) return;
    var bits = ["New event inquiry — Lumi Entertainment"];
    if (select && select.value) bits.push(select.value);
    if (dateInput && dateInput.value) bits.push(dateInput.value);
    subject.value = bits.join(" — ");
  });
})();
