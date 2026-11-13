(() => {
    const videos = [
        ["y-klhPVFblg", "ISEGYE IDOL (이세계아이돌) ‘REBELS’ Official MV"],
        ["zGOzGcEbd-s", "GOSEGU (고세구) ‘고양이가 세상을 구한다!’ Official MV"],
        ["8IY44RZHyw8", "ISEGYE IDOL (이세계아이돌) ‘Smile For You’ Special Clip"],
        ["hT8ahye6kTg", "이세계아이돌(ISEGYE IDOL) '화이트 (White)' Special Clip"],
        ["zFmKBpHrKY8", "이세계아이돌(ISEGYE IDOL) 'Be My Light' Official Performance MV"],
        ["fff8P0kYexQ", "이세계아이돌(ISEGYE IDOL) 'Nameless' Official Performance MV"],
        ["3cEUPoPXz7E", "이세계아이돌(ISEGYE IDOL) 'Be My Light' Official MV"],
        ["nz2_gNQDiVM", "이세계아이돌 (ISEGYE IDOL) 'STARGAZERS' Official MV"],
        ["DJLa8QYUtmQ", "이세계아이돌 (ISEGYE IDOL) 'Misty Rainbow' Official MV"],
        ["v9Jqz13gg8k", "이세계아이돌 (ISEGYE IDOL) - SYZYGY (ISEGYE FESTIVAL SEOUL 2025 THEME SONG)"],
        ["rDFUl2mHIW4", "이세계아이돌 (ISEGYE IDOL) - KIDDING (키딩) Official MV"],
        ["8KTFf2X-ago", "이세계아이돌 (ISEGYE IDOL) - Another World (어나더 월드) Official MV (차원을넘어 이세계아이돌 웹툰 OST)"],
        ["7XFJ4s0j9z0", "숲튽훈 & 주르르 (STH & JURURU) - 고속도로 로망스 (Freeway Romance) Official MV"],
        ["QgMFpuos4Rg", "이세계아이돌 (ISEGYE IDOL) - LOCKDOWN (락다운) Official MV (마법소녀 이세계아이돌 웹툰 OST)"],
        ["JY-gJkMuJ94", "겨울봄 (Winter Spring) MV - 이세계아이돌 (ISEGYE IDOL)"],
        ["fgSXAKsq-Vo", "이세계아이돌 (ISEGYE IDOL) - 리와인드 (RE:WIND) Official MV"],
        ["fZcNvcB6KpI", "이세계아이돌(ISEGYE IDOL) - RE : WIND 🌐 이세계 페스티벌 2025"],
        ["cZ2jFT4HehI", "이세계아이돌(ISEGYE IDOL) 오프닝 무대 | 🌐 이세계 페스티벌 2025 - SOOP Limited Streaming Soon"],
        ["nsVbRO_k9b8", "이세계아이돌 (ISEGYE IDOL) 'MEMORY' 이세계페스티벌 2025 실황"],
        ["7V7ZsMt6r-w", "이세계아이돌 (ISEGYE IDOL) 'ELEVATE' 이세계페스티벌 2025 실황"],
        ["MCyL9k_Tiok", "이세계아이돌 (ISEGYE IDOL) 'STARGAZERS' 이세계페스티벌 2025 실황"],
        ["opQWTxOwK2I", "We Are - ONE OK ROCK / COVER by LILPA @ LILPACON : Going Out"],
        ["0dOQ1pEkpTY", "[Official 4K] RE:WIND(리와인드) : ISEGYE IDOL (이세계아이돌 | イセゲアイドル)  | 🌐 이세계페스티벌"],
        ["IdKit_sig7Y", "[Official 4K] OVER(오버) : ISEGYE IDOL (이세계아이돌 | イセゲアイドル)  | 🌐 이세계페스티벌"],
        ["w8uZZw1Grp8", "[Official 4K] Superhero(슈퍼 히어로) : ISEGYE IDOL (이세계아이돌 | イセゲアイドル)  | 🌐 이세계페스티벌 l presented by 슈퍼아이"],
        ["3tJI2oSNUFI", "[Official 4K] Winter Spring(겨울봄) : ISEGYE IDOL (이세계아이돌 | イセゲアイドル)  | 🌐 이세계페스티벌"],
        ["k5O1F_IS0mU", "이세계 페스티벌 - RE:WIND"],
        ["i4SRH9jfUMQ", "이세계아이돌 (ISEGYE IDOL) - OVER (오버) 이세계 페스티벌 Ver."],
        ["wyhwJnNpVJI", "이세계아이돌 (ISEGYE IDOL) - Superhero (슈퍼히어로) 이세계 페스티벌 Ver."],
        ["DIomV3Ebmz8", "이세계 페스티벌 - 겨울봄"]
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