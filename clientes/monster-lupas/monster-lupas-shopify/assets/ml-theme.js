document.addEventListener('DOMContentLoaded', function () {
  // Setas de rolagem horizontal (carrosséis e sticker row)
  document.querySelectorAll('[data-ml-carousel]').forEach(function (wrap) {
    var track = wrap.querySelector('[data-ml-track]');
    if (!track) return;
    var prev = wrap.querySelector('[data-ml-prev]');
    var next = wrap.querySelector('[data-ml-next]');
    var step = function () { return Math.min(track.clientWidth * 0.8, 600); };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  });
});
