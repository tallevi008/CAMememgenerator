'use-strict';

var gElCanvas;
var gCtx;

function Oninit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMeme();
}

function renderMeme() {
    drawImg();

}

function drawImg() {
    var img = new Image();
    img.src = getImgForDisplay();

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    };
}