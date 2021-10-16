var body = document.body;

const toggleButton = document.createElement('button');
toggleButton.innerText = 'TOGGLE';
toggleButton.setAttribute('id', 'myButton');
body.appendChild(toggleButton);

const modal = document.createElement('div');
//modal.setAttribute('id', 'warning_popup');
modal.classList.add('modal');

const image = document.createElement('img');
image.classList.add('img');
image.src = '/style/images/bear.png';

const modalContent = document.createElement('div');
const modalHeader = document.createElement('h2');
const modalText = document.createElement('p');
const closeButton = document.createElement('span');

modalHeader.innerHTML = 'Warning';
modalText.innerHTML = 'We have detected some hateful language on this webpage.';
closeButton.classList.add('close');
closeButton.innerHTML = 'Close';

modalContent.appendChild(image);
modalContent.appendChild(modalHeader);
modalContent.appendChild(modalText);
modalContent.appendChild(closeButton);
modalContent.classList.add('modal-content');

modal.appendChild(modalContent);
body.appendChild(modal);

// When the user clicks on the button, open the modal
toggleButton.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

//POPUP HAS YET TO BE FINISHED

// var popup = document.createElement('div');
// popup.setAttribute('id', 'warning_popup');
// popup.innerHTML =
//   '<h2>Warning</h2>' +
//   '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>' +
//   '<button>Test</button>';

// body.appendChild(popup);

// const container = document.createElement('div');

// function toggle() {
//   blur = container;
//   blur.classList.toggle('active');
//   modal.classList.toggle('active');
// }

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
