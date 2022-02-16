'use strict';

renderGallery();
function renderGallery() {
    const imgsIds = getImgId();

    var htmlStr = imgsIds.map(imgId => {
        return `<img onclick="onImgSelect(${imgId})" src="img/meme-imgs/${imgId}.jpg" alt= "pic${imgId}">`
    });

    document.querySelector('.gallery-container').innerHTML = htmlStr.join('');
}

function onImgSelect(imgId) {
    setImg(imgId);
    renderMeme();
}