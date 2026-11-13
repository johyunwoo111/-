// channelUrl에 각 채널의 전체 주소를 입력하세요. 영상 ID는 watch?v= 뒤의 값입니다.
const youtubeChannels = [
    {
        label: 'INE', portrait: 'images/INE 2.webp', name: '아이네', channelUrl: '', videos: [
            ["BZWqXM0v-fM", "호박아 무럭무럭 자라렴~"],
            ["UqVFtS26F2g", "우와5주년기념게임이라니정말너무궁금해서플레이해보고싶은걸"],
            ["OJfAWxSGekU", "우리 결혼했어요(구라임)"],
            ["-hBmEbE-UBA", "기필코 복수한다."],
            ["otRC11XhUsE", "날 속인거니 미웡"],
            ["P9Ogfy8cZKk", "뇌절을 예술로 하는 드라마 '취사병 전설이 되다' 리뷰"]
        ]
    },
    {
        label: 'JINGBURGER', portrait: 'images/JINGBURGER 2.webp', name: '징버거', channelUrl: '', videos: [
            ["spsJTTy5x4U", "이번 크리스마스에 함께 보내고 싶은 여자친구를 고르시오 - [징버거 핫클립]"],
            ["dZOLiKV_7kg", "세구는 아가가 맞아 ㅋㅋ - [징버거 핫클립]"],
            ["H49UIM0kLuk", "치이카와 극장판 보고 완전히 입덕해버린 나 - 징버거 노가리"],
            ["ifAP7DIfxKw", "2년 후에도 우솝은 배에서 안 내리나요? - 징버거 원피스 노가리 2부"],
            ["7BFng20VDQg", "Love wins allㅣ징버거 COVER"],
            ["-QtLLL1T3b8", "과거의 나 그만 귀여우라고!!!!!!!!! - [징버거 핫클립]"]
        ]
    },
    {
        label: 'LILPA', portrait: 'images/LILPA 2.WebP', name: '릴파', channelUrl: '', videos: [
            ["L8h32-mknoA", "봉루먼쇼"],
            ["C0rds74PwMA", "SBO 시작!! 부터 대패??!!!"],
            ["1J9KQu_x20c", "감자탕 일주일 먹기 vs 투구 17,000개 vs 발 셀카 vs 와우 게임하기"],
            ["c6lEYBWwhIg", "날칭찬하란말이야아아!!!!!!!!!!"],
            ["Q2ZiMDpNZDg", "야구에 진심인 야진녀와 야구 알아보기 - [VR야구 알아보기 w.다키, 사이다]"],
            ["Lu2yMVAL8GM", "귀여운 모습과 대비되는 세계관.. 이게 왜 유행할까 - [치이카와 알아보기 w.나리]"]
        ]
    },
    {
        label: 'ISEGYE IDOL', name: '이세계아이돌', official: true, channelUrl: '', videos: [
            ["fff8P0kYexQ", "이세계아이돌(ISEGYE IDOL) 'Nameless' Official Performance MV"],
            ["3cEUPoPXz7E", "이세계아이돌(ISEGYE IDOL) 'Be My Light' Official MV"],
            ["zFmKBpHrKY8", "이세계아이돌(ISEGYE IDOL) 'Be My Light' Official Performance MV"],
            ["8IY44RZHyw8", "ISEGYE IDOL (이세계아이돌) ‘Smile For You’ Special Clip"],
            ["hT8ahye6kTg", "이세계아이돌(ISEGYE IDOL) '화이트 (White)' Special Clip"],
            ["y-klhPVFblg", "ISEGYE IDOL (이세계아이돌) ‘REBELS’ Official MV"]
        ]
    },
    {
        label: 'JURURU', portrait: 'images/JURURU 2.WebP', name: '주르르', channelUrl: '', videos: [
            ["owI3jTdgt3s", "챠니 부산 풀코스 해주기"],
            ["BRJ-vYE4Nv8", "2차 한국전쟁 발발"],
            ["PzVxItVTyGs", "로블록스에서 머독님 준내패기"],
            ["NgBaS1vXZ54", "쭐 한명을 조심하라고?"],
            ["ueMK4SeJNAU", "터질듯한 세구"],
            ["9f_oFaPpgxA", "어느 점이 좋아?"]
        ]
    },
    {
        label: 'GOSEGU', portrait: 'images/GOSEGU 2.WebP', name: '고세구', channelUrl: '', videos: [
            ["zlnlCwFVl1E", "분명 둘 중 하나인데"],
            ["Xrz38ATUrXc", "고생하셨습니다...! [롤드컵 4강 T1 vs BLG]"],
            ["JSOv2vmrHNw", "젠지, 결승으로 가는 길 [롤드컵 4강 GEN vs IG]"],
            ["Wj_ofspa7FY", "\"역대급 천재 괴물\" [롤드컵 8강 T1 vs KC]"],
            ["CRB1nWAHECY", "전혀 예상 못한 결과 [롤드컵 8강 DK vs BLG]"],
            ["MIlpZ7NMiVg", "버튜버들이 좀비게임 하는 법"]
        ]
    },
    {
        label: 'VIICHAN', portrait: 'images/VIICHAN 2.WebP', name: '비챤', channelUrl: '', videos: [
            ["8AP0xq7uqK0", "이게 내 갓생이야"],
            ["rB4N-DkVM2k", "스포나먹어라"],
            ["uh4fJbzOBKI", "얼어붙은 남극에서 살아남을 수 있을까?! 로블록스 남극원정대! ❄️"],
            ["cDZhIuN4pS0", "또 당신이야 쭐룰루"],
            ["cQ98Q0vqZLs", "멸망전 첫참가 했습니다!"],
            ["2KRKLHsAq30", "모몽가 트롤이라고해서 기분이 조금 안 좋다고!!!!!!!!!!"]
        ]
    }
];

(() => {
    const section = document.querySelector('#youtube');
    const members = section.querySelector('.yt-members');
    const shelf = section.querySelector('.yt-shelf');
    const track = section.querySelector('.yt-track');
    const heading = section.querySelector('h2');
    let current;
    let start = 0;

    function syncBackdrop() {
        const left = track.getBoundingClientRect().left;
        const first = [...track.children].find(card => card.getBoundingClientRect().right > left + 2);
        if (first) shelf.style.setProperty('--thumbnail', 'url("' + first.querySelector('img').src + '")');
    }

    function render() {
        heading.textContent = current.name;
        track.replaceChildren();
        track.scrollLeft = 0;
        for (let i = 0; i < current.videos.length; i++) {
            const [id, title] = current.videos[(start + i) % current.videos.length];
            const card = document.createElement('a');
            card.href = 'https://www.youtube.com/watch?v=' + id;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            const image = new Image();
            image.alt = '';
            image.addEventListener('error', () => {
                image.src = current.official ? 'images/MEMBER.jpg' : current.portrait;
                syncBackdrop();
            }, { once: true });
            image.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
            const caption = document.createElement('span');
            caption.textContent = title;
            card.append(image, caption);
            track.append(card);
        }
        syncBackdrop();
    }

    for (const channel of youtubeChannels) {
        const profile = document.createElement(channel.channelUrl ? 'a' : 'button');
        if (channel.channelUrl) {
            profile.href = channel.channelUrl;
            profile.target = '_blank';
            profile.rel = 'noopener noreferrer';
        } else profile.type = 'button';
        const portrait = new Image();
        portrait.alt = '';
        if (!channel.official) {
            portrait.sizes = '(max-width: 700px) 58px, 116px';
            portrait.srcset = [58, 116, 232, 348].map(width =>
                `images/portraits/${channel.label}-${width}.webp ${width}w`
            ).join(', ');
        }
        portrait.src = channel.official ? 'images/logo.png' : channel.portrait;
        const label = document.createElement('span');
        label.textContent = channel.label;
        profile.append(portrait, label);
        profile.classList.toggle('yt-official', !!channel.official);
        profile.setAttribute('aria-label', channel.name + (channel.channelUrl ? ' 유튜브 채널 열기 및 추천 영상 보기' : ' 추천 영상 보기'));
        profile.addEventListener('click', () => select(channel, profile));
        members.append(profile);
        if (channel.official) select(channel, profile);
    }

    function select(channel, profile) {
        members.querySelector('[aria-current]')?.removeAttribute('aria-current');
        profile.setAttribute('aria-current', 'true');
        current = channel;
        start = 0;
        render();
    }
    function shift(direction) {
        const first = [...track.children].findIndex(card => card.getBoundingClientRect().right > track.getBoundingClientRect().left + 2);
        start = (start + Math.max(first, 0) + direction + current.videos.length) % current.videos.length;
        render();
    }
    section.querySelector('.yt-prev').onclick = () => shift(-1);
    section.querySelector('.yt-next').onclick = () => shift(1);
    let drag = null;
    let suppressClick = false;
    track.addEventListener('dragstart', event => event.preventDefault());
    track.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        const card = event.target.closest('a');
        if (!card) return;
        drag = { id: event.pointerId, x: event.clientX, left: track.scrollLeft, moved: false };
        suppressClick = false;
        card.setPointerCapture(event.pointerId);
    });
    track.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.id) return;
        const delta = drag.x - event.clientX;
        if (!drag.moved && Math.abs(delta) < 6) return;
        drag.moved = true;
        track.classList.add('is-dragging');
        track.scrollLeft = drag.left + delta;
    });
    function endDrag(event) {
        if (!drag || event.pointerId !== drag.id) return;
        if (drag.moved) {
            suppressClick = true;
            const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
            const distance = drag.x - event.clientX;
            let index = Math.round(track.scrollLeft / step);
            if (event.type === 'pointerup' && Math.abs(distance) >= 24 &&
                index === Math.round(drag.left / step)) index += Math.sign(distance);
            track.classList.remove('is-dragging');
            track.scrollTo({ left: index * step, behavior: 'instant' });
        }
        drag = null;
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('lostpointercapture', endDrag);
    track.addEventListener('click', event => {
        if (suppressClick && event.detail > 0) event.preventDefault();
        suppressClick = false;
    }, true);
    track.addEventListener('scroll', syncBackdrop, { passive: true });
})();