console.log('from foreground')
//foreground.js is where u add css classes and shit

//chrome.runtine.sendMessage({message: 'this where we would send data to backend and store in db'});
// we would use this ^ when user wants to submit hate speech word. 

/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message)
})
-----This ^ would be used when wanting to retrieve the message sent from backend "Thank you for your submission! "
*/