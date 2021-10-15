
console.log('from foreground')
var body = document.body;


const first = document.createElement('button');
first.innerText= "TOGGLE";
body.appendChild(first);



//POPUP HAS YET TO BE FINISHED

var popup = document.createElement("div");
popup.setAttribute('id', 'warning_popup')
popup.innerHTML = 
  "<h2>Boom Boom PAW</h2>" +
  "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>" +
  "<button>Test</button>";

    body.appendChild(popup);

const container = document.createElement('div');

function toggle(){
    blur = container; 
    blur.classList.toggle('active')
    popup.classList.toggle('active');
}

first.addEventListener('click', () => {
    toggle()
});






//foreground.js is where u add css classes and shit

//chrome.runtine.sendMessage({message: 'this where we would send data to backend and store in db'});
// we would use this ^ when user wants to submit hate speech word. 

/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message)
})
-----This ^ would be used when wanting to retrieve the message sent from backend "Thank you for your submission! "
*/