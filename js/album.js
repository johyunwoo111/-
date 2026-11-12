(() => {
    const strip = document.querySelector('.album-strip');
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