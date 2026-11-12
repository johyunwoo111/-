const header = document.querySelector('header');

function updateHeader() {
    header.classList.toggle('is-floating', window.scrollY >= header.offsetHeight);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', updateHeader);
window.addEventListener('pageshow', updateHeader);

// 클릭한 방울을 터뜨린 뒤에 링크로 이동합니다.
const bubbleLinks = document.querySelectorAll('.bubble-link');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
bubbleLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        // Ctrl/Command+클릭, 새 탭 열기 등의 브라우저 기본 기능 보존
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.classList.contains('is-popping')) { event.preventDefault(); return; }
        const destination = link.getAttribute('href');
        if (!destination) return;
        if (reduceMotion.matches) return;
        event.preventDefault();
        link.classList.add('is-popping');
        const ring = document.createElement('span');
        ring.className = 'bubble-ring';
        ring.setAttribute('aria-hidden', 'true');
        link.appendChild(ring);
        const colors = ['#fff', link.style.getPropertyValue('--heart'), '#ffffffcc'];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const distance = 32 + Math.random() * 33;
            const drop = document.createElement('span');
            drop.className = 'bubble-drop';
            drop.setAttribute('aria-hidden', 'true');
            drop.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
            drop.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
            drop.style.setProperty('--size', `${4 + Math.random() * 7}px`);
            drop.style.setProperty('--tint', colors[i % colors.length]);
            link.appendChild(drop);
        }
        window.setTimeout(() => {
            link.classList.remove('is-popping');
            link.querySelectorAll('.bubble-ring,.bubble-drop').forEach(el => el.remove());
            // href에 실제 페이지 주소를 넣으면 해당 페이지로 이동합니다.
            window.location.assign(destination);
        }, 550);
    });
});


async function showLogoIntro() {
    if (location.hash || reduceMotion.matches) {
        startTeaser();
        return;
    }
    const intro = document.querySelector('.logo-intro');
    const video = intro.querySelector('video');
    const skip = intro.querySelector('.intro-skip');
    const play = intro.querySelector('.intro-play');
    const page = document.querySelector('#wrap');
    const logo = header.querySelector('.brand img');
    let finishing = false;

    async function finish() {
        if (finishing) return;
        finishing = true;
        video.pause();
        intro.querySelector('.intro-controls').hidden = true;
        const box = logo.getBoundingClientRect();
        const dx = innerWidth / 2 - (box.left + box.width / 2);
        const dy = innerHeight / 2 - (box.top + box.height / 2);
        const scale = Math.min(innerWidth * .72, innerHeight * .85) / Math.min(box.width, box.height);
        try {
            const travel = logo.animate([
                { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, offset: 0 },
                { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, offset: .22 },
                { transform: 'none' }
            ], { duration: 1500, easing: 'cubic-bezier(.22,.7,.15,1)' });
            await Promise.all([
                travel.finished,
                intro.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' }).finished
            ]);
        } finally {
            intro.hidden = true;
            page.inert = false;
            document.documentElement.classList.remove('intro-active');
            logo.parentElement.focus({ preventScroll: true });
            startTeaser();
        }
    }

    async function startVideo() {
        try {
            await video.play();
            play.hidden = true;
        } catch {
            if (!finishing) play.hidden = false;
        }
    }

    scrollTo({ top: 0, behavior: 'instant' });
    updateHeader();
    page.inert = true;
    intro.hidden = false;
    document.documentElement.classList.add('intro-active');
    video.addEventListener('ended', finish, { once: true });
    video.addEventListener('error', finish, { once: true });
    skip.addEventListener('click', finish);
    play.addEventListener('click', startVideo);
    intro.addEventListener('keydown', event => {
        if (event.key === 'Escape') finish();
    });
    skip.focus({ preventScroll: true });
    await startVideo();
}

const teaser = document.querySelector('.teaser-video');
const seek = document.querySelector('.teaser-time');
const volume = document.querySelector('.teaser-volume');
const sound = document.querySelector('.teaser-sound');

function startTeaser() {
    // 자동 재생이 제한된 환경에서도 영상 클릭으로 재생할 수 있습니다.
    teaser.play().catch(() => { });
}

function toggleTeaser() {
    if (teaser.paused) startTeaser();
    else teaser.pause();
}

teaser.addEventListener('click', toggleTeaser);
teaser.addEventListener('keydown', event => {
    if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        if (!event.repeat) toggleTeaser();
    }
});
teaser.addEventListener('play', () => teaser.setAttribute('aria-label', '배너 영상 일시정지'));
teaser.addEventListener('pause', () => teaser.setAttribute('aria-label', '배너 영상 재생'));

function updateTime() {
    if (!Number.isFinite(teaser.duration)) return;
    seek.max = teaser.duration;
    seek.value = teaser.currentTime;
    seek.setAttribute('aria-valuetext', Math.floor(teaser.currentTime) + '초');
}
teaser.addEventListener('loadedmetadata', updateTime);
teaser.addEventListener('timeupdate', updateTime);
updateTime();
seek.addEventListener('input', () => {
    if (Number.isFinite(teaser.duration)) teaser.currentTime = Number(seek.value);
});
function updateVolume() {
    const level = teaser.muted ? 0 : teaser.volume;
    volume.value = level;
    sound.textContent = level ? '소리 끄기' : '소리 켜기';
}
volume.addEventListener('input', () => {
    teaser.volume = Number(volume.value);
    teaser.muted = teaser.volume === 0;
});
sound.addEventListener('click', () => {
    const enable = teaser.muted || teaser.volume === 0;
    if (enable && teaser.volume === 0) teaser.volume = 0.5;
    teaser.muted = !enable;
});
teaser.addEventListener('volumechange', updateVolume);
updateVolume();

showLogoIntro();
const memberTrack = document.querySelector('#gallery .member-band-track');
if (memberTrack) {
    const repeatedNames = memberTrack.firstElementChild.cloneNode(true);
    repeatedNames.setAttribute('aria-hidden', 'true');
    memberTrack.append(repeatedNames);
    document.querySelector('.member-band-bottom').append(memberTrack.cloneNode(true));
}