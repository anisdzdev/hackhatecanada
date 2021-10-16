let popup = null;
const show_popup = function(body) {
    popup = document.createElement("div");
    popup.innerHTML =  `
        <div class="hcc-md-modal hcc-md-effect-1 hcc-md-show" id="hcc-modal-1">
            <div class="hcc-md-content">
                <h3>Are you sure ?</h3>
                <div>
                    <p>We know you don't like popups but this is important:</p>
                    <ul>
                        <li><strong>Who:</strong> We, Hate Speech Scanner, are informing you of a potential alert on this website.</li>
                        <li><strong>What:</strong> The website you are trying to access is flagged and might contain hate speech.</li>
                        <li><strong>Want to proceed?</strong> Click on the button below to close the modal.</li>
                    </ul>
                    <button class="hcc-md-close" id="hcc-close-btn">Proceed anyway</button>
                </div>
            </div>
        </div>
        <div class="hcc-md-overlay"></div>
    `
    body.appendChild(popup);
}
