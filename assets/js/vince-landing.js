var cssClasses = {
    displayConfirmation: "display-confirmation"
}

var $emailInput = document.getElementById("email-input");
var $contactForm = document.getElementById("contact-form");
var $contactSubmitButton = document.getElementById("contact-submit");
var $confirmationMessage = document.getElementById("confirmation-message");

function displayConfirmationMessage(title, message)
{
    $confirmationMessage.getElementsByClassName("title")[0].innerText = title;
    $confirmationMessage.getElementsByClassName("message")[0].innerText = message;
    document.body.classList.add(cssClasses.displayConfirmation);
    setTimeout(function displayConfirmationMessage_timeout() {
        document.body.classList.remove(cssClasses.displayConfirmation);
    }, 5000);
}

function onEmailInputUpdate(eventArgs) {
    if($emailInput.value.match(/.+@.+\..+/i)) {        
        $contactSubmitButton.removeAttribute("disabled");
    } else {
        $contactSubmitButton.setAttribute("disabled", true);
    }
}

if($contactForm != null) {

    $contactForm.onsubmit = function(eventArgs) {
        eventArgs.preventDefault();
        // TODO : Send email
        displayConfirmationMessage("Merci !", "À très vite*");
        $emailInput.value = "";
        $contactSubmitButton.setAttribute("disabled", true);
    }
    
}

if($emailInput != null) {

    $emailInput.onchange = onEmailInputUpdate;

    $emailInput.onkeydown = onEmailInputUpdate;

}