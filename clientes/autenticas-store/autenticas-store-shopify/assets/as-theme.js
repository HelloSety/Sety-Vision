document.addEventListener('DOMContentLoaded', function () {
  // Setas de rolagem horizontal (carrosséis e sticker row)
  document.querySelectorAll('[data-as-carousel]').forEach(function (wrap) {
    var track = wrap.querySelector('[data-as-track]');
    if (!track) return;
    var prev = wrap.querySelector('[data-as-prev]');
    var next = wrap.querySelector('[data-as-next]');
    var step = function () { return Math.min(track.clientWidth * 0.8, 600); };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  });
});
