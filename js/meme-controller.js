'use-strict';

var gElCanvas;
var gCtx;
var gMeme;

function Oninit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMeme();
}

function renderMeme() {
    const meme = getMeme();
    drawImg(meme);


}

function drawImg(meme) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(50, 50, meme.lines[0].txt);
    };
    img.src = `${getImgForDisplay(meme.selectedImgId).url}`;
}


function drawText(x, y, text) {

    // gCtx.lineWidth = 1;
    // gCtx.strokeStyle = 'red';
    gCtx.fillStyle = 'blue';
    gCtx.font = '20px Arial';
    gCtx.fillText(text, x, y);
    // gCtx.strokeText(text, x, y);
}