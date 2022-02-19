'use strict';

function renderGallery() {
    const imgsIds = getImgId();

    var htmlStr = imgsIds.map(imgId => {
        return `<img onclick="onImgSelect(${imgId})" src="img/meme-imgs/${imgId}.jpg" alt= "pic${imgId}">`
    });

    document.querySelector('.gallery-container').innerHTML = htmlStr.join('');
    hideEditor();
}

function onImgSelect(imgId) {
    setImg(imgId);
    renderMeme();
}

function showGallery() {
    const elMemeGenerator = document.querySelector('.meme-generator-container');

    elMemeGenerator.classList.add('hide');
}

function hideGallery() {

    const elMemeGenerator = document.querySelector('.gallery-container');

    elMemeGenerator.classList.add('hide');
};

function showGallery() {
    hideEditor();
    const elMemeGenerator = document.querySelector('.gallery-container ');

    elMemeGenerator.classList.remove('hide');

};