'use strict';

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['funny', 'plitical'] },
    { id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['cute', 'animals'] }
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'end',
            color: 'white',
            font: 'Impact',
            storkeStyle: 'black'
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
    gMeme.lines[0].txt = line;
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

// Array of images id to use when rendering the gallery
function getImgId() {
    return gImgs.map(img => img.id);
}