const axios = require('axios');
const fs = require('fs');

axios.defaults.baseURL = 'https://index.commoncrawl.org/';

// Get search parameters from CLI.
var domainSearchParam = process.argv.slice(2)[0];

if (!domainSearchParam) {
    console.log('You need to provide a domain search parameter, wildcards are accepted. (eg. *.ca, *.io, etc.)');
    process.exit(1);
}

// Get latest index and obtain list of domains urls.
let crawlIndex;
axios.get('collinfo.json')
    .then(response => {
        crawlIndex = response.data[0].id + '-index';
        console.log('Grabbed latest index: ' + crawlIndex);

        axios.get(`${crawlIndex}?url=${domainSearchParam}&output=json`)
            .then(urls => {
                console.log('\x1b[33m%s\x1b[0m', 'Generating list... Using a broad search parameter might cause the API to timeout.');
                
                // Since the API returns broken JSON, we have to fix it using this dodgy solution.
                let urlString = urls.data;
                urlString = '[' + urlString + ']';

                const regexSymbol = new RegExp('}', 'g');
                urlString = urlString.replace(regexSymbol, '},');
                urlString = urlString.slice(0, urlString.lastIndexOf(',')) + urlString.slice(urlString.lastIndexOf(',') + 1);

                // Parse the urls to remove unused data.
                parsedUrls = JSON.parse(urlString);
                
                let acceptedUrls = [];
                parsedUrls.forEach(url => {
                    if (url["mime-detected"] === 'text/html') {
                        delete url.urlkey;
                        delete url.timestamp;   
                        delete url.mime;
                        delete url.digest;
                        delete url.length;
                        delete url.offset;
                        delete url.filename;
                        
                        url.isUsed = false;
                        acceptedUrls.push(url);
                    }
                })

                fs.writeFile(`url-list-${domainSearchParam.replace('*.', '')}.json`, JSON.stringify(acceptedUrls), (error) => console.log(error))
            })
            .catch(e => console.log('Error happened while fetching list, make sure that you have not been timed out from the API', e))
    })
    .catch(error => console.log(error));
