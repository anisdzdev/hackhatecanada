let popup = null;
const show_popup = function (body) {
  popup = document.createElement('div');
  popup.innerHTML = `
        <div class="hcc-md-modal hcc-md-effect-1 hcc-md-show" id="hcc-modal-1">
            <div class="hcc-md-content">
                <h3>Are you sure you want to proceed?</h3>
                <div>
                      <p><strong>Hate Speech Scanner</strong> has flagged this website as potentially containing hate speech.
                         You may click off the website or continue by clicking on the button below.</p>
                    <div class="hcc-popup-buttons">   
                        <button onclick="history.back()" class="hcc-md-back">Take me back</button>
                        <button class="hcc-md-close" id="hcc-close-btn">Proceed anyway</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="hcc-md-overlay"></div>
    `;
  body.appendChild(popup);
};
