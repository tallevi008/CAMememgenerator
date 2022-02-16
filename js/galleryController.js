'use strict';

renderGallery();
function renderGallery() {
    const imgsIds = getImgId();

    var htmlStr = imgsIds.forEach(imgId => {
        `<img onclick="onImgSelect(${imgId})" src="img/meme-imgs/1.jpg" alt= "pic1">`
    });
    console.log(htmlStr);

    // document.querySelector('.gallery-container').innerHTML = htmlStr.join('');
}

function onImgSelect(imgId) {
    setImg(imgId);
    renderMeme();
}