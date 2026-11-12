(() => {
    const videos = [
        ['7V7ZsMt6r-w', 'ELEVATE · 이세계페스티벌 2025 실황'],
        ['y-klhPVFblg', 'REBELS · Official MV'],
        ['fff8P0kYexQ', 'Nameless · Performance MV'],
        ['nsVbRO_k9b8', 'MEMORY · 이세계페스티벌 2025 실황'],
        ['zFmKBpHrKY8', 'Be My Light · Performance MV'],
        ['nz2_gNQDiVM', 'STARGAZERS · Official MV']
    ];
    const root = document.getElementById('music-video');
    const find = selector => root.querySelector(selector);
    const poster = find('.mv-poster');
    const rail = find('.mv-rail');
    const ambient = find('.mv-ambient');
    const status = find('.mv-status');
    const link = find('.mv-meta a');
    let selected = 0, pending = false;
    let main, background, mainReady = false, bgReady = false, syncTimer;
    const thumb = id => 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';

    function sync() {
        if (!mainReady || !bgReady || !pending) return;
        const id = videos[selected][0];
        if (main.getVideoData().video_id !== id) return;
        const state = main.getPlayerState();
        const time = main.getCurrentTime();
        if (state === YT.PlayerState.PLAYING) {
            if (background.getVideoData().video_id !== id) return;
            if (Math.abs(background.getCurrentTime() - time) > .65) background.seekTo(time, true);
            if (background.getPlayerState() !== YT.PlayerState.PLAYING) background.playVideo();
            if (background.getPlaybackRate() !== main.getPlaybackRate()) background.setPlaybackRate(main.getPlaybackRate());
        } else if (background.getPlayerState() === YT.PlayerState.PLAYING) {
            background.pauseVideo();
        }
    }

    function loadBackground() {
        if (!bgReady || !pending) return;
        background.mute();
        background.loadVideoById({videoId: videos[selected][0], startSeconds: mainReady ? main.getCurrentTime() || 0 : 0});
    }

    function start() {
        if (!/^https?:$/.test(location.protocol)) {
            link.click();
            return;
        }
        pending = true;
        if (!mainReady) { status.textContent = 'YouTube 플레이어 연결 중…'; return; }
        poster.hidden = true;
        status.textContent = '';
        main.loadVideoById(videos[selected][0]);
        if (bgReady) {
            background.mute();
            background.loadVideoById(videos[selected][0]);
        }
    }

    function select(i, autoplay) {
        selected = i;
        const [id,title] = videos[i];
        ambient.classList.remove('is-live');
        root.style.setProperty('--mv-art','url("' + thumb(id) + '")');
        poster.querySelector('img').src = thumb(id);
        poster.setAttribute('aria-label',title + ' 재생');
        find('.mv-meta h3').textContent = title;
        link.href = 'https://www.youtube.com/watch?v=' + id;
        [...rail.children].forEach((button,n) => button.setAttribute('aria-pressed', String(n === i)));
        if (autoplay) start();
    }

    videos.forEach(([id,title],i) => {
        const button = document.createElement('button');
        button.type = 'button';
        const image = new Image();
        image.src = thumb(id);
        image.alt = '';
        button.append(image,document.createTextNode(title));
        button.onclick = () => select(i,true);
        rail.append(button);
    });
    poster.onclick = start;
    find('.mv-list-actions').querySelectorAll('button').forEach((button,i) => {
        button.onclick = () => rail.scrollBy({left: (i ? 1 : -1) * (rail.children[1].offsetLeft - rail.children[0].offsetLeft), behavior:'smooth'});
    });
    select(0,false);
    if (!/^https?:$/.test(location.protocol)) return;

    function connect() {
        if (main) return;
        const playerVars = {playsinline:1, origin:location.origin, rel:0};
        main = new YT.Player('mv-main-player', {
            videoId: videos[selected][0], playerVars,
            events: {
                onReady() { mainReady = true; if (pending) start(); },
                onStateChange(e) {
                    clearInterval(syncTimer);
                    if (e.data === YT.PlayerState.PLAYING) {
                        document.querySelector('.teaser-video')?.pause();
                        document.dispatchEvent(new Event('mv-playing'));
                        syncTimer = setInterval(sync, 700);
                    }
                    sync();
                },
                onError() {
                    pending = false;
                    if (bgReady) background.pauseVideo();
                    ambient.classList.remove('is-live');
                    status.textContent = '이 영상은 YouTube에서 보기를 눌러 재생해 주세요.';
                }
            }
        });
        background = new YT.Player('mv-background-player', {
            videoId: videos[selected][0], playerVars: {...playerVars, mute:1, controls:0, disablekb:1},
            events: {
                onReady() { bgReady = true; background.mute(); loadBackground(); },
                onStateChange(e) {
                    if (e.data === YT.PlayerState.PLAYING) {
                        ambient.classList.toggle('is-live',pending && background.getVideoData().video_id === videos[selected][0]);
                        sync();
                    }
                },
                onError() { ambient.classList.remove('is-live'); }
            }
        });
    }
    document.addEventListener('music-playing', () => { if (mainReady && main.getPlayerState() === 1) main.pauseVideo(); });
    if (window.YT?.Player) connect();
    else {
        const existing = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => { existing?.(); connect(); };
    }
})();