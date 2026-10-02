/* Ezéchiel Sawadogo — thème clair / sombre + bienvenue multilingue */
(function () {
  var root = document.documentElement;

  // ---- thème
  var btn = document.getElementById("theme-btn");
  function current() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  if (btn) btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---- bienvenue
  var word = document.getElementById("hello-word"), lang = document.getElementById("hello-lang");
  if (!word || !lang) return;
  var W = [
    ["Bienvenue", "fr · français"],
    ["Welcome", "en · english"],
    ["Ne y waoogo", "mos · mooré"],
    ["I bisimila", "dyu · dioula"],
    ["Akwaba", "bci · baoulé"],
    ["Ẹ káàbọ̀", "yo · yorùbá"],
    ["Barka da zuwa", "ha · hausa"],
    ["Karibu", "sw · kiswahili"],
    ["Boyei malamu", "ln · lingála"],
    ["أهلاً وسهلاً", "ar · العربية"]
  ];
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var i = document.documentElement.lang === "en" ? 1 : 0;  // la page anglaise commence par « Welcome »
  function show(k, text) {
    word.dir = /[؀-ۿ]/.test(W[k][0]) ? "rtl" : "ltr";
    word.textContent = text;
    lang.textContent = W[k][1];
  }
  if (calm) {
    setInterval(function () { i = (i + 1) % W.length; show(i, W[i][0]); }, 2600);
    return;
  }
  function type(k, n) {
    var chars = Array.from(W[k][0]);
    show(k, chars.slice(0, n).join(""));
    if (n < chars.length) return setTimeout(function () { type(k, n + 1); }, 70);
    setTimeout(function () { erase(k, chars.length); }, 1700);
  }
  function erase(k, n) {
    var chars = Array.from(W[k][0]);
    show(k, chars.slice(0, n).join(""));
    if (n > 0) return setTimeout(function () { erase(k, n - 1); }, 30);
    i = (k + 1) % W.length;
    setTimeout(function () { type(i, 1); }, 250);
  }
  setTimeout(function () { erase(i, Array.from(W[i][0]).length); }, 1800);
})();
