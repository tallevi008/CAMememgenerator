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
        drawText(50, 50, meme.lines[0]);
    };
    img.src = `${getImgForDisplay(meme.selectedImgId).url}`;
}


function drawText(x, y, meme) {

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = meme.strokeStyle;
    gCtx.fillStyle = meme.color;
    gCtx.font = `${meme.size}px ${meme.font}`;
    gCtx.strokeText(meme.txt, x, y);
    gCtx.textAlign = meme.align;
    gCtx.fillText(meme.txt, x, y);
}

function onEnterLine(ev, line) {
    ev.preventDefault();
    var line = document.getElementsByName('line-text')[0];
    setLineTxt(line.value);
    line.value = '';
    renderMeme();



}