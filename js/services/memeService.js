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
            'storke-style': 'black'
        }
    ]
}

function getMeme() {
    return gMeme;
}

function getImgForDisplay(imgId) {
    return gImgs.find(img => imgId === img.id);
}

function setLineTxt(line) {
    gMeme.lines[0].txt = line;
}

function setImg(imgId) {
    gMeme.selectedImgId = +imgId;

}

function getImgId() {
    return gImgs.map(img => img.id);
}