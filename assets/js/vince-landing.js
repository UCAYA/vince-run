var api = {

  slackIt: function(slackWebhookUrl, payload) {
		return fetch(slackWebhookUrl,
              { method: 'post',
                body: JSON.stringify(payload)
              }).then(function(response) {
      //return response.json();
      return null;
    });
	}

};

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

        // fetch("https://getform.org/f/0b925986-3bcb-47ce-a7d2-1547c6e4020b",
        //           { method: 'post',
        //             body:  encodeURIComponent("email") + "=" + encodeURIComponent($emailInput.value)
        //           }).then(function(response) {
        //   //return response.json();
        //   return null;
        // });
        var request = new XMLHttpRequest();
        request.open('POST', 'https://getform.org/f/0b925986-3bcb-47ce-a7d2-1547c6e4020b', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(encodeURIComponent("email") + "=" + encodeURIComponent($emailInput.value));

        UserInfo.getInfo(function(data) {
    			// the "data" object contains the info

            var payload = {
      				"text": "Un utilisateur s'est ajouté à la waitinglist",
      				"attachments": [{
      								"title": $emailInput.value,
                      "text": "Infos"
                      "fields": [
                        {
                            "title": "IP",
                            "value": data.ip_address ? data.ip_address : "N/A",
                            "short": false
                        },
                        {
                            "title": "Continent",
                            "value": data.continent ? data.continent.name : "N/A",
                            "short": false
                        },
                        {
                            "title": "Country",
                            "value": data.country ? data.country.name : "N/A",
                            "short": false
                        },
                        {
                            "title": "City",
                            "value": data.city ? data.city.name : "N/A",
                            "short": false
                        },
                        {
                            "title": "Position",
                            "value": data.position ? JSON.stringify(data.position) : "N/A",
                            "short": false
                        }
                      ]
      							}]
      					};

      			Api.slackIt("https://hooks.slack.com/services/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", payload);

    		}, function(err) {
    			// the "err" object contains useful information in case of an error
    		});

        displayConfirmationMessage("Vous êtes sur la liste !", "À très vite*");
        $emailInput.value = "";
        $contactSubmitButton.setAttribute("disabled", true);
    }

}

if($emailInput != null) {

    $emailInput.onchange = onEmailInputUpdate;

    $emailInput.onkeydown = onEmailInputUpdate;

}

UserInfo.getInfo(function(data) {
  // the "data" object contains the info

    var payload = {
      "text": "Un utilisateur vient d'arriver",
      "attachments": [{
              "title": "",
              "text": "Infos"
              "fields": [
                {
                    "title": "IP",
                    "value": data.ip_address ? data.ip_address : "N/A",
                    "short": false
                },
                {
                    "title": "Continent",
                    "value": data.continent ? data.continent.name : "N/A",
                    "short": false
                },
                {
                    "title": "Country",
                    "value": data.country ? data.country.name : "N/A",
                    "short": false
                },
                {
                    "title": "City",
                    "value": data.city ? data.city.name : "N/A",
                    "short": false
                },
                {
                    "title": "Position",
                    "value": data.position ? JSON.stringify(data.position) : "N/A",
                    "short": false
                }
              ]
            }]
        };

    Api.slackIt("https://hooks.slack.com/services/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", payload);

}, function(err) {
  // the "err" object contains useful information in case of an error
});
