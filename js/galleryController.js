'use strict';

renderGallery();
function renderGallery() {
    var htmlStr = `<img onclick="onImgSelect(this)" src="img/meme-imgs/1.jpg" alt="001"><img onclick="onImgSelect(this)" src="img/meme-imgs/2.jpg" alt="002">`;
    document.querySelector('.gallery-container').innerHTML = htmlStr;
}

function onImgSelect() { }