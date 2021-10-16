let loaded = false;
let requested = false;
let fetched = false;
let fetch_result = null;

chrome.tabs.onUpdated.addListener(function (tabId, info) {
  if(status === "complete") {
    loaded = true;
    checkWebsiteStatus();
  }
  if(!requested) {
    chrome.tabs.get(tabId, (current_tab_info) => {
      const live_url = current_tab_info.url;
      //if (live_url.includes(".ca/")) {
        fetch(`http://localhost:5000/ai/?url=${live_url}`).then(r => r.text()).then(onRequestResult)
      //}
    });
  }
});

const onRequestResult = (result) => {
  fetch_result = result;
  fetched = true;
  checkWebsiteStatus();
}

const checkWebsiteStatus = () => {
  if(fetch_result && JSON.parse(fetch_result).is_harmful){
    chrome.tabs.insertCSS(null, {file: './style/style.css'});
    chrome.tabs.executeScript(null, {file: "./library/modernizr.custom.js"});
    chrome.tabs.executeScript(null, {file: "./library/classie.js"});
    chrome.tabs.executeScript(null, {file: "./library/modalEffects.js"});
    chrome.tabs.executeScript(null, {file: "./library/pre-css-filters.js"})
    chrome.tabs.executeScript(null, {file: "./library/cssParser.js"});
    chrome.tabs.executeScript(null, {file: "./library/css-filters-polyfill.js"});
    chrome.tabs.executeScript(null, {file: "./helpers/popup.js"});
    chrome.tabs.executeScript(null, {file: "./foreground.js"}, () =>
        console.log("Hate Speech Scanner launched")
    );
  }
}

/*chrome.runtime.onMessage.addListener((request,sender, sendResponse) => {
    if(request.message === 'message sent from front'){
        chrome.storage.local.get("sent from foreground***")
        then store new words in db
        chrome.tabs.sendMessage(active_tab_id, {message: 'yo i got your message'})
    }
})*/
//*** we would use this when a user wants to submit a hate speech word. Use in key/value format