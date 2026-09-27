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
        nav.style.visibility = track.scrollWidth > track.clientWidth + 2 ? 'visible' : 'hidden';
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
});

// «Где выступал»: показываем первые N плиток, остальное по кнопке
document.querySelectorAll('.timeline[data-collapse]').forEach(function (list) {
    var limit = parseInt(list.getAttribute('data-collapse'), 10) || 6;
    var items = list.querySelectorAll(':scope > li');
    if (items.length <= limit) return;
    for (var i = limit; i < items.length; i++) items[i].classList.add('is-hidden');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'timeline-more';
    btn.textContent = 'Показать все выступления (' + items.length + ')';
    btn.addEventListener('click', function () {
        list.querySelectorAll('li.is-hidden').forEach(function (li) { li.classList.remove('is-hidden'); });
        btn.remove();
    });
    list.parentNode.insertBefore(btn, list.nextSibling);
});

// Тезисы свёрнуты: ссылка вида #thesis-... раскрывает нужный блок
function openThesisFromHash() {
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    if (el && el.tagName === 'DETAILS') {
        el.open = true;
        el.scrollIntoView({ block: 'start' });
    }
}
window.addEventListener('hashchange', openThesisFromHash);
openThesisFromHash();
document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#thesis-"]');
    if (!a) return;
    var d = document.getElementById(a.getAttribute('href').slice(1));
    if (d && d.tagName === 'DETAILS') d.open = true;
});
