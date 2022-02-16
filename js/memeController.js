'use-strict';

var gElCanvas;
var gCtx;
var gMeme;

function Oninit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
}

function renderMeme() {
    const meme = getMeme();
    drawImg(meme);
}

function drawImg(meme) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(50, 50, meme.lines[meme.selectedLineIdx]);
    };
    img.src = `${getImgForDisplay(meme.selectedImgId).url}`;
}


function drawText(x, y, meme) {

    gCtx.lineWidth = 4;
    gCtx.strokeStyle = meme.storkeStyle;
    gCtx.fillStyle = meme.color;
    gCtx.font = `${meme.size}px ${meme.font}`;
    gCtx.strokeText(meme.txt, x, y);
    gCtx.textAlign = meme.alignges;
    gCtx.fillText(meme.txt, x, y);
}

function onEnterLine(ev, line) {
    ev.preventDefault();
    var line = document.getElementsByName('line-text')[0];
    setLineTxt(line.value);
    line.value = '';
    renderMeme();
}

function onChangeColor(ev, colorPurpose, color) {
    ev.preventDefault();
    if (colorPurpose === 'font-color')
        setColor('color', color);
    else if (colorPurpose === 'stroke-color')
        setColor('storkeStyle', color);
}

function onChangeFontSize(ev, fontSizeChange) {
    ev.preventDefault();
    if (fontSizeChange === 'font-increase')
        setFontSize(1);
    else setFontSize(-1);
}