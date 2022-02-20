'use strict';

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['funny', 'plitical'] },
    { id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['cute', 'animals', 'baby'] },
    { id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['cute', 'animals'] },
    { id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['cute', 'baby'] },
    { id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['funny', 'sarcastic'] },
    { id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['cute', 'baby'] },
    { id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['funny', 'movie'] },
    { id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['funny', 'plitical'] },
    { id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['sarcastic', 'sport'] },
    { id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['sarcastic', 'funny'] },
    { id: 13, url: 'img/meme-imgs/13.jpg', keywords: ['movie', 'funny'] },
    { id: 14, url: 'img/meme-imgs/14.jpg', keywords: ['movie', 'sarcastic'] },
    { id: 15, url: 'img/meme-imgs/15.jpg', keywords: ['movie', 'sarcastic'] },
    { id: 16, url: 'img/meme-imgs/16.jpg', keywords: ['movie', 'funny'] },
    { id: 17, url: 'img/meme-imgs/17.jpg', keywords: ['sarcastic', 'plitical'] },
    { id: 18, url: 'img/meme-imgs/18.jpg', keywords: ['cute', 'movie'] },
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

function getMeme() {
    return gMeme;
}

//image that were selceted for meme editor
function getImgForDisplay(imgId) {
    return gImgs.find(img => imgId === img.id);
}

// Change meme attribute
function setMemeAttr(attr, val) {
    var memeAtrr = gMeme.lines[gMeme.selectedLineIdx];
    memeAtrr[attr] = val;
}

//updating the id of the selcted img in the gMeme object
function setImg(imgId) {
    gMeme.selectedImgId = +imgId;

}

function setFontSize(diff) {
    var memeAtrr = gMeme.lines[gMeme.selectedLineIdx];

    if (memeAtrr.size === 8 && diff < 0 || memeAtrr.size === 72 && diff > 0) return;
    memeAtrr.size += diff;
}

function addLine() {
    var idx = gMeme.lines.length;
    (gMeme.lines).push({
        txt: `New Line${idx + 1}`,
        size: 20,
        align: 'left',
        color: 'white',
        font: 'Impact',
        storkeStyle: 'black',
        pos: SetLinePos(idx),
        isDrag: false
    })

    //Switch to the new line
    gMeme.selectedLineIdx = (gMeme.lines).length - 1;
};

function SetLinePos(idx) {
    if (idx === 0) return { x: gElCanvas.width / 2, y: 30 }

    if (idx === 1) return { x: gElCanvas.width / 2, y: gElCanvas.height - 30 }
    else if (idx > 1) return { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
}

function removeLine() {
    (gMeme.lines).splice(gMeme.selectedLineIdx, 1);
    //Switch to the prev line
    gMeme.selectedLineIdx = (gMeme.lines).length - 1;
}

function setLineSwitch() {
    if (!(gMeme.lines).length) return null;
    if (gMeme.selectedLineIdx < (gMeme.lines).length - 1)
        gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx = 0;
    return (gMeme.lines.length) ? gMeme.lines[gMeme.selectedLineIdx] : null;
}

// Array of images id to use when rendering the gallery
function getImgId() {
    return gImgs.map(img => img.id);
}


function isLineClicked(clickedPos) {
    const idx = (gMeme.lines).findIndex(line => {
        var txt = gCtx.measureText(line.txt);
        return (Math.abs(clickedPos.x - line.pos.x) <= txt.width && Math.abs(clickedPos.y - line.pos.y) <= line.size);
    })
    if (idx === -1) return false;
    gMeme.selectedLineIdx = idx;
    return true;
}


function setLineDrag(isDrag) {
    var memeAtrr = gMeme.lines[gMeme.selectedLineIdx];
    memeAtrr.isDrag = isDrag;
}
function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx;
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy;
}

