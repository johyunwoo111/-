(() => {
    const strip = document.querySelector('.album-strip');
    const [previous, next] = document.querySelectorAll('.album-controls button');
    let timer;
    function schedule() {
        clearTimeout(timer);
        if (!document.hidden) timer = setTimeout(() => move(1), 5000);
    }
    function move(direction) {
        const limit = strip.scrollWidth - strip.clientWidth;
        const first = strip.firstElementChild.offsetLeft;
        const stops = [...strip.children].map(card => Math.min(card.offsetLeft - first, limit));
        const left = direction > 0
            ? stops.find(x => x > strip.scrollLeft + 2) ?? 0
            : stops.reverse().find(x => x < strip.scrollLeft - 2) ?? limit;
        strip.scrollTo({left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
        schedule();
    }
    previous.onclick = () => move(-1);
    next.onclick = () => move(1);
    strip.addEventListener('pointerdown', () => clearTimeout(timer));
    window.addEventListener('pointerup', schedule);
    strip.addEventListener('pointercancel', schedule);
    document.addEventListener('visibilitychange', schedule);
    schedule();
    let drag;
    let suppressClick = false;
    strip.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        const card = event.target.closest('a');
        if (!card) return;
        drag = { id: event.pointerId, x: event.clientX, left: strip.scrollLeft };
        suppressClick = false;
        card.setPointerCapture(event.pointerId);
    });
    strip.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const distance = event.clientX - drag.x;
        if (!suppressClick && Math.abs(distance) < 6) return;
        suppressClick = true;
        strip.classList.add('is-dragging');
        strip.scrollLeft = drag.left - distance;
    });
    function release(event) {
        if (drag?.id !== event.pointerId) return;
        drag = null;
        strip.classList.remove('is-dragging');
    }
    strip.addEventListener('pointerup', release);
    strip.addEventListener('lostpointercapture', release);
    strip.addEventListener('click', event => {
        if (suppressClick && event.detail > 0) event.preventDefault();
        suppressClick = false;
    });
})();