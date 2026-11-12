const musicCatalog = [
  {
    "title": "RE : WIND",
    "videoId": "ZuttYdmPfzU",
    "lyricId": 13748973
  },
  {
    "title": "겨울봄",
    "videoId": "RbysxH3gt-Q",
    "lyricId": 23899182
  },
  {
    "title": "LOCKDOWN",
    "videoId": "3KZCKKeCuAc",
    "lyricId": 14205307
  },
  {
    "title": "Another World",
    "videoId": "JtETM1FFA6I",
    "lyricId": 14360360
  },
  {
    "title": "KIDDING",
    "videoId": "rDFUl2mHIW4",
    "lyricId": 4454828
  },
  {
    "title": "OVER",
    "videoId": "74GWu9hVYyc",
    "lyricId": 8277696
  },
  {
    "title": "Superhero",
    "videoId": "bHybqkNbUD8",
    "lyricId": 24831841
  },
  {
    "title": "SYZYGY",
    "videoId": "wTRJLyzhR4U",
    "lyricId": 22159840
  },
  {
    "title": "Misty Rainbow",
    "videoId": "DJLa8QYUtmQ",
    "lyricId": 33057978
  },
  {
    "title": "Stargazers",
    "videoId": "poeO7eDT_Xo",
    "lyricId": null,
    "trackPage": "https://music.bugs.co.kr/track/33539943"
  },
  {
    "title": "ELEVATE",
    "videoId": "42FCSSxlAqo",
    "lyricId": 24600600
  },
  {
    "title": "MEMORY",
    "videoId": "TjocZaYTeAM",
    "lyricId": 36395385
  },
  {
    "title": "Be My Light",
    "videoId": "3cEUPoPXz7E",
    "lyricId": 24453970
  },
  {
    "title": "Nameless",
    "videoId": "fff8P0kYexQ",
    "lyricId": 25016765
  },
  {
    "title": "화이트 (White)",
    "videoId": "qkLUVeFdZfQ",
    "lyricId": null,
    "trackPage": "https://music.bugs.co.kr/track/6394221"
  },
  {
    "title": "Smile For You",
    "videoId": "tGMwZ0O2-Oc",
    "lyricId": null,
    "trackPage": "https://music.bugs.co.kr/track/6480066"
  },
  {
    "title": "연애세포",
    "videoId": "NCrqAAdZlGk",
    "lyricId": null,
    "trackPage": "https://music.bugs.co.kr/track/6515834"
  },
  {
    "title": "REBELS",
    "videoId": "Wqx8qNFpQbo",
    "lyricId": null,
    "trackPage": "https://music.bugs.co.kr/track/6515835"
  },
  {
    "title": "BACK 2 THE FUTURE",
    "videoId": "GHJ9XiIx_AQ",
    "lyricId": null,
    "trackPage": "https://music.bugs.co.kr/track/6515836"
  },
  {
    "title": "ANTI-HERO",
    "videoId": "HlKpuPGpG84",
    "lyricId": null,
    "trackPage": "https://music.bugs.co.kr/track/6515837"
  },
  {
    "title": "Dream Residue",
    "videoId": "zI3m2AmGQhI",
    "lyricId": 40278912
  }
];
(() => {
    const root = document.getElementById('music');
    const find = selector => root.querySelector(selector);
    const list = find('.music-tracks');
    const disc = find('.music-disc');
    const play = find('[data-action="play"]');
    const range = find('.music-time input');
    const lines = find('.music-lines');
    const status = find('.music-status');
    const lyrics = new Map();
    let index = 0, player, ready = false, wanted = false, active = -1;
    let request = 0, timestamps = [], dragging = false, failed = false;
    const http = /^https?:$/.test(location.protocol);
    const clock = n => Math.floor(n / 60) + ':' + String(Math.floor(n % 60)).padStart(2, '0');

    document.addEventListener('mv-playing', () => { if (ready && player.getPlayerState() === 1) player.pauseVideo(); });
    function playback(on) {
        if (on) document.dispatchEvent(new Event('music-playing'));
        disc.classList.toggle('playing', on);
        play.textContent = on ? 'Ⅱ' : '▶';
        play.setAttribute('aria-label', on ? '일시정지' : '재생');
        if (on) document.querySelector('.teaser-video')?.pause();
    }

    async function showLyrics(song) {
        const serial = ++request;
        active = -1;
        timestamps = [];
        lines.replaceChildren();
        lines.scrollTop = 0;
        const link = find('.music-lyrics-link');
        link.hidden = !song.trackPage;
        if (song.trackPage) link.href = song.trackPage;
        if (!song.lyricId) {
            lines.textContent = '이 곡의 가사는 아래 음원 페이지에서 볼 수 있습니다.';
            return;
        }
        lines.textContent = '가사를 불러오는 중…';
        try {
            let entry = lyrics.get(song.lyricId);
            if (!entry) {
                const response = await fetch('https://lrclib.net/api/get/' + song.lyricId);
                if (!response.ok) throw Error();
                entry = await response.json();
                lyrics.set(song.lyricId, entry);
            }
            if (serial !== request) return;
            const timed = [...(entry.syncedLyrics || '').matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]\s*([^\r\n]*)/g)]
                .filter(m => m[3].trim());
            timestamps = timed.map(m => Number(m[1]) * 60 + Number(m[2]));
            const text = timed.length ? timed.map(m => m[3]) : (entry.plainLyrics || '').split('\n');
            lines.replaceChildren(...text.map(value => {
                const p = document.createElement('p');
                p.textContent = value;
                return p;
            }));
        } catch {
            if (serial === request) lines.textContent = '가사를 불러오지 못했습니다.';
        }
    }

    function select(i, autoplay) {
        index = (i + musicCatalog.length) % musicCatalog.length;
        const song = musicCatalog[index];
        wanted = autoplay;
        failed = false;
        playback(false);
        const art = 'https://i.ytimg.com/vi/' + song.videoId + '/hqdefault.jpg';
        disc.querySelector('img').src = art;
        root.style.setProperty('--art', 'url("' + art + '")');
        find('.music-title').textContent = find('.music-lyrics-title').textContent = song.title;
        find('.music-video-link').href = 'https://www.youtube.com/watch?v=' + song.videoId;
        [...list.children].forEach((button, n) => button.setAttribute('aria-pressed', String(n === index)));
        range.value = 0;
        range.disabled = true;
        find('.music-time span:first-child').textContent = find('.music-time span:last-child').textContent = '0:00';
        showLyrics(song);
        if (ready) player[autoplay ? 'loadVideoById' : 'cueVideoById'](song.videoId);
        status.textContent = !http ? 'Live Server로 열거나 YouTube에서 들어주세요.' : autoplay && !ready ? '플레이어 연결 중…' : '';
    }

    musicCatalog.forEach((s, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        const number = document.createElement('span');
        number.textContent = String(i + 1).padStart(2, '0');
        b.append(number, document.createTextNode(s.title));
        b.onclick = () => select(i, true);
        list.append(b);
    });
    find('[data-action="prev"]').onclick = () => select(index - 1, true);
    find('[data-action="next"]').onclick = () => select(index + 1, true);
    play.onclick = () => {
        if (!http) { find('.music-video-link').click(); return; }
        if (!ready) { wanted = true; status.textContent = '플레이어 연결 중…'; return; }
        if (failed) { select(index,true); return; }
        if (player.getPlayerState() === 1) player.pauseVideo();
        else player.playVideo();
    };
    range.oninput = () => { dragging = true; find('.music-time span:first-child').textContent = clock(Number(range.value)); };
    range.onchange = () => { if (ready) player.seekTo(Number(range.value), true); dragging = false; };
    range.onblur = range.onpointercancel = () => { dragging = false; };

    select(0,false);
    if (!http) return;
    function connect() {
        player = new YT.Player('music-yt', {
            width: '100%', height: 200, videoId: musicCatalog[index].videoId,
            playerVars: { playsinline: 1, origin: location.origin, rel: 0 },
            events: {
                onReady() { ready = true; select(index, wanted); },
                onStateChange(e) {
                    if (player.getVideoData().video_id !== musicCatalog[index].videoId) return;
                    playback(e.data === 1);
                    if (e.data === 1) status.textContent = '';
                    if (e.data === 0) select(index + 1,true);
                },
                onError() { failed = true; playback(false); status.textContent = '재생이 제한되었습니다. YouTube에서 들어주세요.'; },
                onAutoplayBlocked() { playback(false); status.textContent = '재생 버튼을 눌러 주세요.'; }
            }
        });
    }
    window.onYouTubeIframeAPIReady = connect;
    if (window.YT?.Player) connect();
    else {
        const api = document.createElement('script');
        api.src = 'https://www.youtube.com/iframe_api';
        api.onerror = () => { status.textContent = 'YouTube 연결을 확인해 주세요.'; };
        document.head.append(api);
    }
    setInterval(() => {
        if (!ready || player.getVideoData().video_id !== musicCatalog[index].videoId) return;
        const duration = player.getDuration(), time = player.getCurrentTime();
        if (!duration) return;
        range.disabled = false;
        range.max = duration;
        find('.music-time span:last-child').textContent = clock(duration);
        if (!dragging) {
            range.value = time;
            find('.music-time span:first-child').textContent = clock(time);
        }
        const next = timestamps.findLastIndex(t => t <= time);
        if (next === active) return;
        lines.children[active]?.classList.remove('active');
        active = next;
        const p = lines.children[next];
        if (p) {
            p.classList.add('active');
            lines.scrollTop = p.offsetTop - lines.clientHeight * .4;
        }
    }, 250);
})();