'use-strict';

var gElCanvas;
var gCtx;
var gMeme;

function Oninit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();

    // window.addEventListener('resize', () => {
    //     resizeCanvas();
    //     console.log('resize?');
    //     renderMeme();
    // })

}

function renderMeme() {
    const meme = getMeme();
    showEditor();
    drawImg(meme);
}

function drawImg(meme) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

        (meme.lines).forEach((line, idx, lines) => {
            if (idx === 0) drawText(gElCanvas.width / 2, 30, line, idx);
            else if (idx === 1)
                drawText(gElCanvas.width / 2, gElCanvas.height - 30, line, idx);
            else {
                drawText(gElCanvas.width / 2, gElCanvas.height / 2, line, idx)
            };


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


function onEnterLine(ev) {
    ev.preventDefault();
    var elLine = document.getElementsByName('line-text')[0];
    setMemeAttr('txt', elLine.value);
    elLine.value = '';
    renderMeme();
}

function onChangeColor(colorPurpose, color) {
    if (colorPurpose === 'font-color')
        setMemeAttr('color', color);
    else if (colorPurpose === 'stroke-color')
        setMemeAttr('storkeStyle', color);
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
    var elLine = document.getElementsByName('line-text')[0];
    elLine.value = '';
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
    var elLine = document.getElementsByName('line-text')[0];
    elLine.value = memeLine.txt;

}



function showEditor() {
    const elMemeGenerator = document.querySelector('.meme-generator-container');

    elMemeGenerator.classList.remove('hide');
    hideGallery();
}

function hideEditor() {
    const elMemeGenerator = document.querySelector('.meme-generator-container');

    elMemeGenerator.classList.add('hide');
}

// function resizeCanvas() {
    // var elContainer = document.querySelector('.canvans-container');
    // Note: changing the canvas dimension this way clears the canvas
    // gElCanvas.width = elContainer.offsetWidth;
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight;}