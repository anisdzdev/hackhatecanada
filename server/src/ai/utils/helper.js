const axios = require("axios");
const cheerio = require("cheerio");

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

//https://data.world/sya/list-of-bad-words/workspace/file?filename=en.csv