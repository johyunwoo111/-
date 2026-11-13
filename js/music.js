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

  let previousTime = null, lastAdvance = -Infinity;
  function setWanted(on) {
    wanted = on;
    lastAdvance = -Infinity;
    previousTime = null;
    play.textContent = on ? 'Ⅱ' : '▶';
    play.setAttribute('aria-label', on ? '일시정지' : '재생');
    if (!on) playback(false);
  }

  function pause() {
    setWanted(false);
    if (ready) player.pauseVideo();
    status.textContent = '';
  }
  document.addEventListener('mv-playing', () => { if (wanted) pause(); });
  function playback(on) {
    if (disc.classList.contains('playing') === on) return;
    disc.classList.toggle('playing', on);
    if (on) {
      status.textContent = '';
      document.dispatchEvent(new Event('music-playing'));
      document.querySelector('.teaser-video')?.pause();
    }
  }

  async function showLyrics(song) {
    const serial = ++request;

    active = -1;
    timestamps = [];

    lines.replaceChildren();
    lines.scrollTop = 0;

    const link = find('.music-lyrics-link');
    link.hidden = !song.trackPage;

    if (song.trackPage) {
      link.href = song.trackPage;
    }

    if (!song.lyricId) {
      lines.textContent =
        '이 곡은 시간 동기화 가사가 제공되지 않습니다.';
      return;
    }

    lines.textContent = '가사를 불러오는 중…';

    try {
      let entry = lyrics.get(song.lyricId);

      if (!entry) {
        const response = await fetch(
          'https://lrclib.net/api/get/' + song.lyricId
        );

        if (!response.ok) {
          throw new Error('가사 요청 실패');
        }

        entry = await response.json();
        lyrics.set(song.lyricId, entry);
      }

      // 곡이 변경되었다면 이전 요청 결과 무시
      if (serial !== request) return;

      const synced = entry.syncedLyrics || '';

      const timed = [...synced.matchAll(
        /\[(\d+):(\d+(?:\.\d+)?)\]\s*([^\r\n]*)/g
      )].filter(match => match[3].trim());

      timestamps = timed.map(match =>
        Number(match[1]) * 60 + Number(match[2])
      );

      const lyricText = timed.length
        ? timed.map(match => match[3])
        : (entry.plainLyrics || '').split('\n');

      lines.replaceChildren(
        ...lyricText.map(value => {
          const p = document.createElement('p');
          p.textContent = value;
          return p;
        })
      );

      // 시간 동기화 여부 확인
      console.log(
        `[${song.title}] 동기화 가사:`,
        timed.length > 0 ? '있음' : '없음',
        '타임스탬프 수:',
        timestamps.length
      );

      // 가사 로딩 후 현재 재생 시간에 맞춰 동기화
      if (ready && player && timestamps.length) {
        syncLyrics(player.getCurrentTime());
      }

    } catch (error) {
      if (serial === request) {
        lines.textContent =
          '가사를 불러오지 못했습니다.';
      }

      console.error('가사 로딩 오류:', error);
    }
  }


  function syncLyrics(time) {
    if (!timestamps.length) return;

    const next = timestamps.findLastIndex(t => t <= time);

    // 활성 가사가 바뀌지 않았다면 실행하지 않음
    if (next === active) return;

    // 이전 가사 활성화 해제
    lines.children[active]?.classList.remove('active');

    active = next;

    const currentLine = lines.children[next];

    if (currentLine) {
      // 현재 가사 활성화
      currentLine.classList.add('active');

      // 현재 가사가 가사 영역 중앙 부근에 오도록 스크롤
      const scrollPosition =
        currentLine.offsetTop - lines.clientHeight * 0.4;

      lines.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }

  function select(i, autoplay) {
    index = (i + musicCatalog.length) % musicCatalog.length;
    const song = musicCatalog[index];
    setWanted(autoplay && http);
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
    status.textContent = !http ? 'Live Server로 열거나 YouTube에서 들어주세요.' : autoplay ? (ready ? '재생 준비 중…' : '플레이어 연결 중…') : '';
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
    // 로컬 파일로 실행한 경우
    if (!http) {
      status.textContent =
        'Live Server 또는 GitHub Pages에서 실행해 주세요.';
      return;
    }

    // 플레이어 연결 전
    if (!ready) {
      wanted = true;
      status.textContent = '플레이어 연결 중…';
      return;
    }

    // 재생 오류가 발생한 경우
    if (failed) {
      select(index, true);
      return;
    }

    // 재생 및 일시정지
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };
  
  range.oninput = () => {
    if (!ready || failed) return;

    dragging = true;

    find('.music-time span:first-child').textContent =
      clock(Number(range.value));
  };

  range.onchange = () => {
    if (
      ready &&
      !failed &&
      player.getDuration() > 0
    ) {
      player.seekTo(Number(range.value), true);
    }

    dragging = false;
  };

  select(0, false);

  // HTML 파일 직접 실행 여부 확인
  if (!http) return;

  let connecting = false;
  let connectionTimer;

  function connect() {
    // 중복 생성 방지
    if (connecting || ready) return;
    if (!window.YT?.Player) return;

    connecting = true;

    player = new YT.Player('music-yt', {
      width: '100%',
      height: '200',
      videoId: musicCatalog[index].videoId,

      playerVars: {
        playsinline: 1,
        origin: location.origin,
        rel: 0,
        controls: 1
      },

      events: {
        onReady() {
          clearTimeout(connectionTimer);
          ready = true;
          status.textContent = '';
          select(index, wanted);
          console.log('YouTube 플레이어 연결 성공');
        },

        onStateChange(e) {
          if (
            player.getVideoData()?.video_id !==
            musicCatalog[index].videoId
          ) return;

          playback(e.data === YT.PlayerState.PLAYING);

          if (e.data === YT.PlayerState.PLAYING) {
            status.textContent = '';
          }

          if (e.data === YT.PlayerState.ENDED) {
            select(index + 1, true);
          }
        },

        onError(e) {
          failed = true;
          playback(false);

          status.textContent =
            `YouTube 재생 오류 (${e.data})`;

          console.error('YouTube 오류 코드:', e.data);
        },

        onAutoplayBlocked() {
          playback(false);
          status.textContent =
            '자동 재생이 차단되었습니다. 재생 버튼을 눌러 주세요.';
        }
      }
    });
  }

  // API가 이미 로드되어 있다면 바로 연결
  if (window.YT?.Player) {
    connect();
  } else {
    // 다른 JS의 기존 콜백도 유지
    const previousCallback =
      window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = function () {
      if (typeof previousCallback === 'function') {
        previousCallback();
      }
      connect();
    };

    // API 스크립트 중복 추가 방지
    if (!document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    )) {
      const api = document.createElement('script');
      api.src = 'https://www.youtube.com/iframe_api';

      api.onerror = () => {
        clearTimeout(connectionTimer);
        status.textContent =
          'YouTube API를 불러오지 못했습니다.';
      };

      document.head.append(api);
    }
  }

  // 연결이 지연되거나 실패한 경우 안내
  connectionTimer = setTimeout(() => {
    if (!ready) {
      status.textContent =
        'YouTube 플레이어 연결에 실패했습니다.';
      console.error('YouTube 플레이어 초기화 실패');
    }
  }, 10000);

  setInterval(() => {
    if (!ready || player.getVideoData()?.video_id !== musicCatalog[index].videoId) return;
    const duration = player.getDuration(), time = player.getCurrentTime();
    if (!duration) return;
    range.disabled = false;
    range.max = duration;
    find('.music-time span:last-child').textContent = clock(duration);
    if (!dragging) {
      range.value = time;
      find('.music-time span:first-child').textContent = clock(time);
    }
    // const next = timestamps.findLastIndex(t => t <= time);
    // if (next === active) return;
    // lines.children[active]?.classList.remove('active');
    // active = next;
    // const p = lines.children[next];
    // if (p) {
    //   p.classList.add('active');
    //   lines.scrollTop = p.offsetTop - lines.clientHeight * .4;
    // }

    syncLyrics(time);
  }, 250);
})();