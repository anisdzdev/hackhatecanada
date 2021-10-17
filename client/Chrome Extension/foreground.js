const body = document.body;

show_popup(body);

document.getElementById('hcc-close-btn').addEventListener('click', () => {
  if (popup) popup.parentNode.removeChild(popup);
});

// chrome.tabs.onRequest.addListener(function (request, sender, sendResponse) {
//   console.log('outisde if');
//   if (request.method == 'getText') {
//     console.log('inside if');
//     sendResponse({ data: document.innerText, method: 'getText' }); //same as innerText
//   }
// });

// toggleButton.addEventListener('click', () => {
//   toggle();
// });

// *********

//foreground.js is where u add css classes and shit

//chrome.runtine.sendMessage({message: 'this where we would send data to backend and store in db'});
// we would use this ^ when user wants to submit hate speech word.

/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message)
})
-----This ^ would be used when wanting to retrieve the message sent from backend "Thank you for your submission! "
*/
