'use strict';

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['funny', 'plitical'] },
    { id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 3, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 4, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 5, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 6, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 7, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 8, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 9, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 10, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 11, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 12, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 13, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 14, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 15, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 16, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 17, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 18, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] },
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Line 1',
            size: 20,
            align: 'left',
            color: 'white',
            font: 'Impact',
            storkeStyle: 'black',
            pos: { x: null, y: null }
        }

    ]
}

function getMeme() {
    return gMeme;
}

//image that were selceted for meme editor
function getImgForDisplay(imgId) {
    return gImgs.find(img => imgId === img.id);
}

//Upadte gMeme text line
function setLineTxt(line) {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].txt = line;
}

//updating the id of the selcted img in the gMeme object
function setImg(imgId) {
    gMeme.selectedImgId = +imgId;

}
// Change color of font or stroke
function setColor(colorPurpose, selectedColor) {
    var memeAtrr = gMeme.lines[gMeme.selectedLineIdx];
    memeAtrr[colorPurpose] = selectedColor;
}

function setFontSize(diff) {
    var memeAtrr = gMeme.lines[gMeme.selectedLineIdx];

    if (memeAtrr.size === 8 && diff < 0 || memeAtrr.size === 72 && diff > 0) return;
    memeAtrr.size += diff;
}

function addLine() {
    (gMeme.lines).push({
        txt: 'New Line',
        size: 20,
        align: 'left',
        color: 'white',
        font: 'Impact',
        storkeStyle: 'black',
        pos: { x: null, y: null }
    })

    //to switch to the new line
    gMeme.selectedLineIdx = (gMeme.lines).length - 1;
};

function removeLine() {
    (gMeme.lines).splice(gMeme.selectedLineIdx, 1);
    //to switch to the previos line
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

function onSetLinePos(x, y, lineIdx) {
    gMeme.lines[lineIdx].pos.x = x;
    gMeme.lines[lineIdx].pos.y = y;
}