// 소개 문구와 해당 연도의 활동은 각 멤버의 intro, events에서 수정하세요.
const galleryProfiles = [
  {
    id: 'INE', name: '아이네', color: '#b799db', cover: 'RE  WIND.webp', year: 2021,
    intro: [
      '이세계아이돌의 멤버 첫째 아이네.',
      '신체 : 158cm',
      '별명 : 아기토끼, 슬라임, 158',
      '성별 : 여성',
      '소속사 : 패러블',
      '데뷔 : 2021년 트위치',
      '상징하는 색 : 파란제비꽃색',
      '팬덤명 : 둘기',
    ],
    fandomImage: 'FANDOM INE.webp',
    events: [
      '6월 22일 · 우왁굳의 사이버 아이돌 프로젝트 모집 시작',
      '7월 10일 · 이세계아이돌 오디션 시작',
      '7~8월 · 다단계 오디션 및 참가자 선발',
      '8월 26일 · 최종 멤버 6명 확정',
      '12월 10일 · RE : WIND 티저 공개',
      '12월 17일 · 첫 디지털 싱글 〈RE : WIND〉 발매, 정식 데뷔',
    ]
  },
  {
    id: 'JINGBURGER', name: '징버거', color: '#f0d677', cover: 'WINTER SPRING.webp', year: 2023,
    fandomImage: 'FANDOM JINGBURGER.png',
    intro: [
      '이세계아이돌의 멤버 둘째 징버거.',
      '신체 : 161cm',
      '별명 : 부가땅, 징부기, 햇살가나디',
      '성별 : 여성',
      '소속사 : 패러블',
      '데뷔 : 2018년 트위치',
      '상징하는 색 : 노랑색',
      '팬덤명 : 똥강아지',
    ],
    events: [
      '6월 . 이세계 아이돌 웹툰 2개 공개',
      '6월 . 웹툰 OST(락다운) 공개로 버츄얼 첫 멜론의 전당 달성',
      '7월 . 웹툰 두번째 OST(어나더 월드)발표 멜론의 전당 2회 연속달성',
      '8월 . 세번째 앨범 키딩을 발매 발매후 하루만에 200만 스트리밍으로 3연속 멜론의 전당 3회 달성!',
      '8월 . 버츄얼 최초로 빌보드 차트에 입성',
      '9월 . 이세계아이돌 첫 오프라인 콘서트 이세계 페스티벌 음원(Superhero, OVER) 공개 후 멜론최초 멜론의 전당4회 달성',
      '12월 . 텀블벅에 웹툰(마법소녀 이세돌) 단행본 및 굿즈 펀딩시작 역대 최고 41억 달성',
    ]
  },
  {
    id: 'LILPA', name: '릴파', color: '#9ba1e7', cover: 'KIDDING.webp', year: 2026,
    fandomImage: 'FANDOM LILPA.png',
    intro: [
      '이세계아이돌의 멤버 셋째 릴파.',
      '신체 : 164cm',
      '별명 : 릴트리버, 어질몬스터',
      '성별 : 여성',
      '소속사 : 패러블',
      '데뷔 : 2021년 트위치',
      '상징하는 색 : 남색',
      '팬덤명 : 박쥐',
    ],
    events: [
      '2월 . 한터뮤직어워즈 버츄얼 최초 포스트제너레이션상을 수상',
      '6월 . 스페셜 싱글 Smile For You 발매',
      '11월 . 두 번째 미니 앨범 Across Dimensions을 발매',
      '11월 . 서울 두번째 팝업 개시',
    ]
  },
  {
    id: 'JURURU', name: '주르르', color: '#ed9cc1', cover: 'Stargazers.webp', year: 2022,
    fandomImage: 'FANDOM JURURU.png',
    intro: [
      '이세계아이돌의 멤버 넷째 주르르.',
      '신체 : 162cm',
      '별명 : 쯀',
      '성별 : 여성',
      '소속사 : 패러블',
      '데뷔 : 2018년 트위치',
      '상징하는 색 : 분홍색',
      '팬덤명 : 폭도',
    ],
    events: [
      '3월 . 두번째 디지컬 싱글 <겨울봄> 발매',
      '이세계아이돌 정식 계약 체결',
      '이세계 아이돌 공식 웹툰 제작 발표 및 공모전 시작',
    ]
  },
  {
    id: 'GOSEGU', name: '고세구', color: '#9bdfeb', cover: 'Be My Light.webp', year: 2024,
    fandomImage: 'FANDOM GOSEGU.jpg',
    intro: [
      '이세계아이돌의 멤버 다섯쨰 고세구',
      '신체 : 300m',
      '별명 : 고양이, 유출구',
      '성별 : 여성',
      '소속사 : 패러블',
      '데뷔 : 2021년 트위치',
      '상징하는 색 : 하늘색',
      '팬덤명 : 세균',
    ],
    events: [
      '1월 . 한국 트위치 철수로 SOOP으로 우왁굳과 함께 이적',
      '2월 . SOOP 첫방송 과 더현대 서울 첫 팝업 "이세돌팝업봤?" 진행',
      '9월 . SOOP 이세돌 전원 파트너 체결',
      '12월 . 텀블벅을 통해 두번째 크라우드 펀딩(차원을 넘어 이세계아이돌)시작. 하루만에 66억원을 돌파하며 최종으로 88억을 모이며 국내 역대 최고액 1위 달성',
      '12월 . 첫 프랜차이즈 "두찜"과 콜라보',
    ]
  },
  {
    id: 'VIICHAN', name: '비챤', color: '#a8d998', cover: 'Smile For You.webp', year: 2025,
    fandomImage: 'FANDOM VIICHAN.jpg',
    intro: [
      '이세계아이돌의 멤버 막내 비챤',
      '신체 : 162cm',
      '별명 : 챠니, 납작복숭아',
      '성별 : 여성',
      '소속사 : 패러블',
      '데뷔 : 2013년 우타이테로 유튜브, 정식 데뷔 21년 트위치',
      '상징하는 색 : 스프링버드',
      '팬덤명 : 고라니',
    ],
    events: [
      '3월 . 콘서트 이세계 페스티벌 개최(고척돔) 발표 홍보곡(SYZYGY), 4집, 5집, 6집 동시발표',
      '3월 . SYZYGY 발매',
      '4월 . 4집 Misty Rainbow 발매',
      '5월 . 고척 스카이돔 이세계 페스티벌 개최 Stargazers, ELEVATE, MEMORY 선공개',
      '5월 . 콘서트 다음날 바로 5집 Stargazers 발매',
      '10월 . 롯데웰푸드 뺴뺴로 와 공식 콜라보',
      '10월 . MBC 버추얼 라이브 페스티벌 1일차 참여하여 첫 미니앨범(Be My Light) 선공개',
      '11월 . 첫 미니앨범(Be My Light) 발매',
      '12월 . 한터차트 초동 10만장 달성 브론즈 인증패 수상',
    ]
  }
];

(() => {
  const stage = document.querySelector('.member-room');
  const dialog = document.querySelector('.member-profile');
  const close = dialog.querySelector('button');
  function fillRows(selector, rows) {
    dialog.querySelector(selector).replaceChildren(...rows.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
  }
  let opener;
  // 벤치의 왼쪽부터 단체 사진과 같은 순서입니다.
  for (const id of ['INE', 'JURURU', 'JINGBURGER', 'GOSEGU', 'VIICHAN', 'LILPA']) {
    const member = galleryProfiles.find(m => m.id === id);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'member-figure';
    button.setAttribute('aria-label', member.name + ' 프로필 열기');
    button.setAttribute('aria-haspopup', 'dialog');
    const figure = new Image();
    figure.src = 'images/member-cutouts/' + id + '.webp';
    figure.alt = '';
    button.append(figure);
    stage.append(button);
    button.onclick = () => {
      opener = button;
      dialog.style.setProperty('--profile-art', 'url("' + new URL('images/' + member.cover, document.baseURI).href + '")');
      dialog.style.setProperty('--member-color', member.color);
      const portrait = dialog.querySelector('figure img');
      portrait.sizes = '(max-width: 650px) min(72vw, 28dvh), min(32vw, 41dvh, 370px)';
      portrait.srcset = [320, 640, 960].map(width =>
          `images/profile-shots/${id}-${width}.webp ${width}w`
      ).join(', ');
      portrait.src = 'images/profile-shots/' + id + '-640.webp';
      portrait.alt = member.name;
      dialog.querySelector('h2').textContent = member.name;
      dialog.querySelector('figcaption span').textContent = id;
      fillRows('.profile-bio ul', member.intro);
      const fandom = dialog.querySelector('.profile-fandom');
      fandom.hidden = !member.fandomImage;
      if (member.fandomImage) {
        fandom.src = 'images/' + member.fandomImage;
        fandom.alt = member.name + ' 팬덤 이미지';
      }
      dialog.querySelector('.profile-year').textContent = member.year;
      fillRows('.profile-history ul', member.events);
      dialog.showModal();
      close.focus({ preventScroll: true });
    };
  }
  close.onclick = () => dialog.close();
  dialog.onclick = e => {
    if (e.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close();
  };
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
})();