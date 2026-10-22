// Runs in <head> so the saved theme is applied before the page paints (no flash).
(function () {
  try { var t = localStorage.getItem('theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}
})();
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('theme-btn').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
});
