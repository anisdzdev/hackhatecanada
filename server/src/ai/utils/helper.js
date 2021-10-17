const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports.is_absolute = function(url) {
    const r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(url);
}

module.exports.get_web_content = async function(URL) {
    try {
        const {data} = await axios.get(URL);
        const $ = cheerio.load(data);
        return $.text();
    } catch (e){
        console.log(`Failure: ${e}`);
        return null
    }
}

module.exports.readHateSpeechTextFile = function(file) {
    const separator = /,/g;
    const fileContent = fs.readFileSync(file, 'utf-8');
    const matchIndexes = [];

    let match;
    while ((match = separator.exec(fileContent)) != null) {
        matchIndexes.push(match.index);
    }

    const allHateWords = [];
    let lastIndex = 0;

    for (let i = 0; i < matchIndexes.length; i++) {
        if (i === 0) {
            allHateWords.push((fileContent.substring(lastIndex, matchIndexes[i])).toLowerCase());
        }
        else {
            allHateWords.push((fileContent.substring(lastIndex + 1, matchIndexes[i])).toLowerCase());
        }
        lastIndex = matchIndexes[i];
    }
    return allHateWords;
}


//https://data.world/sya/list-of-bad-words/workspace/file?filename=en.csv