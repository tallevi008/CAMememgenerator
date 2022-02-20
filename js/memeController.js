'use-strict';

var gElCanvas;
var gCtx;
var gMeme;
var gStartPos;

function Oninit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    addListeners();

}

function addListeners() {
    addMouseListeners();
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}


function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return;
    setLineDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

function onMove(ev) {
    const meme = getMeme();
    const line = meme.lines[gMeme.selectedLineIdx];
    if (line.isDrag) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        moveLine(dx, dy);
        gStartPos = pos;
        renderMeme();
    }
}


function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos;
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

        (meme.lines).forEach(line => drawText(line));
    };

    img.src = `${getImgForDisplay(meme.selectedImgId).url}`;
}

function drawText(line) {

    gCtx.lineWidth = 4;
    gCtx.strokeStyle = line.storkeStyle;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);

    gCtx.closePath();
}


function onEnterLine(txt) {
    setMemeAttr('txt', txt);
    renderMeme();
}

function onChangeColor(colorPurpose, color) {
    if (colorPurpose === 'font-color')
        setMemeAttr('color', color);
    else if (colorPurpose === 'stroke-color')
        setMemeAttr('storkeStyle', color);
    renderMeme();
}

function onChangeFontSize(ev, fontSizeChange) {
    ev.preventDefault();
    if (fontSizeChange === 'font-increase')
        setFontSize(1);
    else setFontSize(-1);
    renderMeme();
}

function onAddLine() {
    addLine();
    renderMeme();

}

function onRemoveLine() {
    removeLine();
    renderMeme();
}

function onSwitchLine() {
    const memeLine = setLineSwitch();
    if (!memeLine) return;
    var elLine = document.getElementsByName('line-text')[0];
    elLine.value = memeLine.txt;
    // lineFocus(memeLine);
}

// function lineFocus(memeLine) {
//     const pos = memeLine.pos;
//     const { left, top, width, height } = getrectMesures(memeLine.txt);
//     const half_line = gCtx.lineWidth / 2;

//     if (memeLine.isFocused) {
//         gCtx.clearRect(left + pos.x - half_line, top + pos.y - half_line, width + gCtx.lineWidth, height + gCtx.lineWidth);
//     }

//     gCtx.beginPath();
//     gCtx.strokeStyle = 'orange';
//     gCtx.strokeRect(left + pos.x - half_line, top + pos.y - half_line, width + gCtx.lineWidth, height + gCtx.lineWidth);
//     gCtx.stroke();
// }

// function getrectMesures(txt) {
//     const metrics = gCtx.measureText(txt);
//     const left = metrics.actualBoundingBoxLeft * -1;
//     const top = metrics.actualBoundingBoxAscent * -1;
//     const right = metrics.actualBoundingBoxRight;
//     const bottom = metrics.actualBoundingBoxDescent;
//     const width = txt.trim() === txt ? right - left : metrics.width;
//     const height = bottom - top;
//     return { left, top, right, bottom, width, height };


function showEditor() {
    const elMemeGenerator = document.querySelector('.meme-generator-container');

    elMemeGenerator.classList.remove('hide');
    hideGallery();
}

function hideEditor() {
    const elMemeGenerator = document.querySelector('.meme-generator-container');

    elMemeGenerator.classList.add('hide');
}