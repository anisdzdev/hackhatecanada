var fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

async function readHateSpeechWebsite(url) {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        
        var allHateWords = new Array();

        const firstTable = $('.ttop tbody tr');
        firstTable.each((index, element) => {
            if (index == 0) {
                return;
            }

            else {
                const hateWord = $(element).children("td:first-child").text();
                allHateWords.push(hateWord);
            }
        });

        const otherTables = $(".tmid tbody tr");
        otherTables.each((index, element) => {
                const hateWord = $(element).children("td:first-child").text();
                allHateWords.push(hateWord);
        });

    } catch (err) {
        console.error(err);
    }

    return allHateWords;
}

 function readHateSpeechTextFile(file) {
     const separator = /,/g;
     var fileContent = fs.readFileSync(file, 'utf-8');
    var matchIndexes = new Array();

    while((match = separator.exec(fileContent)) != null)
    {
        matchIndexes.push(match.index);
    }

    var allHateWords = new Array();
    var lastIndex = 0;

    for (var i = 0; i < matchIndexes.length; i++)
    {
        if (i == 0) {
         allHateWords.push((fileContent.substring(lastIndex, matchIndexes[i])).toLowerCase());
        }
        else {
            allHateWords.push((fileContent.substring(lastIndex+1, matchIndexes[i])).toLowerCase());
        }
        lastIndex = matchIndexes[i];
    }
    return allHateWords;
 }

 async function hateWordsArray () {
     var textFileArray = readHateSpeechTextFile(path.resolve('hackhatecanada/server', 'hate_speech.txt'));
     var websiteArray = await readHateSpeechWebsite('https://www.certifiedchinesetranslation.com/rsdb/');
     

     var allHateWords = new Array();

     textFileArray.forEach(textFileHateWord => {
         allHateWords.push(textFileHateWord);
     });

     
     websiteArray.forEach(websiteHateWord => {
         allHateWords.push(websiteHateWord);
     });

    //  var allHateWordsArr1 = new Array();
    //  var allHateWordsArr2 = new Array();
    //  var allHateWordsArr3 = new Array();
    //  var allHateWordsArr4 = new Array();
    //  var allHateWordsArr5 = new Array();


    // for (var i = 0; i < 540; i++){
    //     allHateWordsArr1.push(allHateWords[i]);
    // }

    //  for (var i = 541; i < 1081; i++) {
    //      allHateWordsArr2.push(allHateWords[i]);
    //  }

    //  for (var i = 1082; i < 1622; i++) {
    //      allHateWordsArr3.push(allHateWords[i]);
    //  }

    //  for (var i = 1623; i < 2162; i++) {
    //      allHateWordsArr4.push(allHateWords[i]);
    //  }

    //  for (var i = 2163; i < 2698; i++) {
    //      allHateWordsArr5.push(allHateWords[i]);
    //  }

    //  fs.writeFileSync('hateWords1.txt', allHateWordsArr1);
    //  fs.writeFileSync('hateWords2.txt', allHateWordsArr2);
    //  fs.writeFileSync('hateWords3.txt', allHateWordsArr3);
    //  fs.writeFileSync('hateWords4.txt', allHateWordsArr4);
    //  fs.writeFileSync('hateWords5.txt', allHateWordsArr5);

     return allHateWords;
 }

console.log(readHateSpeechTextFile(path.resolve('hackhatecanada/server', 'hate_speech.txt')));










