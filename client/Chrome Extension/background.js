/*chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
                live_url = current_tab_info.url
        if(live_url.includes(".ca"))
   chrome.tabs.executeScript(null, {file: "./foreground.js"}, ()=> console.log("injected"))
    })
});*/
/*document.addEventListener("DOMContentLoaded", function() { 
    var live_url = window.location.href;
    //if(live_url.includes(".ca"))
        console.log(live_url)
    //if(live_url.includes(".ca"))
  // chrome.tabs.executeScript(null, {file: "./foreground.js"}, ()=> console.log("injected"))
});*/

let active_tab_id = 0; 

chrome.tabs.onUpdated.addListener(function (tabId, info) {
    active_tab_id = tabId;
  if (info.status === "complete") {
    chrome.tabs.get(tabId, (current_tab_info) => {
      live_url = current_tab_info.url;
      if (live_url.includes(".ca/"))
        chrome.tabs.insertCSS(null, {file:'./style/style.css'});
        chrome.tabs.executeScript(null, { file: "./foreground.js" }, () =>
          console.log("injected")
        );
    });
  }
});

/*chrome.runtime.onMessage.addListener((request,sender, sendResponse) => {
    if(request.message === 'message sent from front'){
        chrome.storage.local.get("shit sent from foreground***")
        then store new words in db
        chrome.tabs.sendMessage(active_tab_id, {message: 'yo i got your message'})
    }
})*/

//*** we would use this when a user wants to submit a hate speech word. Use in key/value format