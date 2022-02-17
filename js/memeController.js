'use-strict';

var gElCanvas;
var gCtx;
var gMeme;

function Oninit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    renderGallery();

    window.addEventListener('resize', () => {
        resizeCanvas();
    })
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvans-container')
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;

}

function renderMeme() {
    const meme = getMeme();
    drawImg(meme);
}

function drawImg(meme) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

        (meme.lines).forEach((line, idx, lines) => {
            if (idx === 0) drawText(gElCanvas.width / 2, 100, line, idx);
            else if (idx === 1)
                drawText(gElCanvas.width / 2, 700, line, idx);
            else drawText(gElCanvas.width / 2, gElCanvas.height / 2, line, idx);


        });
    };
    img.src = `${getImgForDisplay(meme.selectedImgId).url}`;
}

function drawText(x, y, meme, lineIdx) {

    gCtx.lineWidth = 4;
    gCtx.strokeStyle = meme.storkeStyle;
    gCtx.fillStyle = meme.color;
    gCtx.font = `${meme.size}px ${meme.font}`;
    gCtx.strokeText(meme.txt, x, y);
    gCtx.textAlign = meme.alignges;
    gCtx.fillText(meme.txt, x, y);

    //update line pos on canvas after drowing
    onSetLinePos(x, y, lineIdx);
}


function onEnterLine(ev, line) {
    ev.preventDefault();
    var line = document.getElementsByName('line-text')[0];
    setLineTxt(line.value);
    line.value = '';
    renderMeme();
}

function onChangeColor(colorPurpose, color) {
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

function onAddLine(ev) {
    ev.preventDefault();
    addLine();
    renderMeme();
}

function onRemoveLine(ev) {
    ev.preventDefault();
    removeLine();
    renderMeme();
}

function onSwitchLine(ev) {
    ev.preventDefault();
    const memeLine = setLineSwitch();
    if (!memeLine) return;
    openModal(memeLine);
}
