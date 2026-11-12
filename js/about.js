(() => {
    const photos = [["ISEGYE IDOL.jpeg", "ISEGYE-IDOL.webp", 700, 395], ["ISEGYE IDOL1.jpg", "ISEGYE-IDOL1.webp", 270, 340], ["ISEGYE IDOL2.png", "ISEGYE-IDOL2.webp", 414, 517], ["ISEGYE IDOL3.jpg", "ISEGYE-IDOL3.webp", 640, 640], ["ISEGYE IDOL4.jpg", "ISEGYE-IDOL4.webp", 700, 477], ["ISEGYE IDOL5.jpg", "ISEGYE-IDOL5.webp", 700, 394], ["ISEGYE IDOL6.jpg", "ISEGYE-IDOL6.webp", 436, 640], ["ISEGYE IDOL7.jpg", "ISEGYE-IDOL7.webp", 436, 640], ["ISEGYE IDOL8.jpg", "ISEGYE-IDOL8.webp", 436, 640], ["ISEGYE IDOL9.jpg", "ISEGYE-IDOL9.webp", 700, 477], ["ISEGYE IDOL10.jpg", "ISEGYE-IDOL10.webp", 436, 640], ["ISEGYE IDOL11.jpg", "ISEGYE-IDOL11.webp", 436, 640], ["ISEGYE IDOL12.jpg", "ISEGYE-IDOL12.webp", 422, 640], ["ISEGYE IDOL13.jpg", "ISEGYE-IDOL13.webp", 436, 640], ["ISEGYE IDOL14.jpg", "ISEGYE-IDOL14.webp", 422, 640], ["ISEGYE IDOL15.jpg", "ISEGYE-IDOL15.webp", 436, 640], ["ISEGYE IDOL16.jpg", "ISEGYE-IDOL16.webp", 422, 640], ["ISEGYE IDOL17.jpg", "ISEGYE-IDOL17.webp", 436, 640], ["ISEGYE IDOL18.jpg", "ISEGYE-IDOL18.webp", 422, 640], ["ISEGYE IDOL19.jpg", "ISEGYE-IDOL19.webp", 436, 640], ["ISEGYE IDOL20.jpg", "ISEGYE-IDOL20.webp", 422, 640], ["ISEGYE IDOL21.jpg", "ISEGYE-IDOL21.webp", 436, 640], ["ISEGYE IDOL22.jpg", "ISEGYE-IDOL22.webp", 422, 640], ["ISEGYE IDOL23.jpg", "ISEGYE-IDOL23.webp", 436, 640]];
    const album = document.querySelector('.memory-album');
    const viewer = document.querySelector('.memory-viewer');
    const full = viewer.querySelector('img');
    const tilts = [-8, 6, -4, 9, 3, -7];
    for (let laneIndex = 0; laneIndex < 2; laneIndex++) {
        const lane = document.createElement('div');
        lane.className = 'memory-lane';
        const reel = document.createElement('div');
        reel.className = 'memory-reel';
        const group = document.createElement('div');
        group.className = 'memory-group';
        for (let i = laneIndex; i < photos.length; i += 2) {
            const [file, thumbnail, width, height] = photos[i];
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'memory-photo';
            button.dataset.file = file;
            button.style.setProperty('--tilt', tilts[i % tilts.length] + 'deg');
            button.style.setProperty('--width', (86 + (i * 7) % 15) + '%');
            button.style.setProperty('--offset', ((i * 3) % 9 - 4) + '%');
            button.setAttribute('aria-label', '이세계아이돌 사진 ' + (i + 1) + ' 크게 보기');
            const image = new Image(width, height);
            image.alt = '이세계아이돌 사진 ' + (i + 1);
            image.src = 'images/about-thumbs/' + thumbnail;
            button.append(image);
            group.append(button);
        }
        const repeat = group.cloneNode(true);
        repeat.setAttribute('aria-hidden', 'true');
        repeat.querySelectorAll('button').forEach(b => b.tabIndex = -1);
        reel.append(group, repeat);
        lane.append(reel);
        album.append(lane);
    }
    const closeButton = viewer.querySelector('button');
    let opener;
    function closePhoto() {
        if (!viewer.open) return;
        viewer.open = false;
        album.inert = false;
        opener.focus({ preventScroll: true });
    }

    // 움직이는 버튼에 마우스 초점이 가면서 화면이 따라가는 것을 방지합니다.
    album.addEventListener('mousedown', event => {
        if (event.button === 0 && event.target.closest('.memory-photo')) event.preventDefault();
    });
    album.addEventListener('click', event => {
        const button = event.target.closest('.memory-photo');
        if (!button) return;
        opener = button;
        full.src = 'images/' + button.dataset.file;
        full.alt = button.querySelector('img').alt;
        viewer.open = true;
        closeButton.focus({ preventScroll: true });
        album.inert = true;
    });
    const stage = viewer.parentElement;
    stage.addEventListener('pointerleave', event => {
        if (event.pointerType === 'mouse') closePhoto();
    });
    stage.addEventListener('keydown', event => {
        if (event.key === 'Escape') closePhoto();
    });
    closeButton.onclick = closePhoto;
    viewer.addEventListener('click', event => {
        if (event.target === viewer) closePhoto();
    });
})();