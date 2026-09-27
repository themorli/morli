console.log('Speaker website loaded');

// Горизонтальные карусели: стрелки для мыши, свайп на тачскрине работает сам
document.querySelectorAll('[data-carousel]').forEach(function (track) {
    var nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = '<button type="button" aria-label="Назад">&larr;</button>' +
                    '<button type="button" aria-label="Вперёд">&rarr;</button>';
    track.parentNode.insertBefore(nav, track);
    var prev = nav.children[0], next = nav.children[1];
    function step() { return Math.max(track.clientWidth * 0.8, 200); }
    function update() {
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
});

