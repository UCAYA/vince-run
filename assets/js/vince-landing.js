var Api = {

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
        var email = $emailInput.value
        var request = new XMLHttpRequest();
        request.open('POST', 'https://getform.org/f/0b925986-3bcb-47ce-a7d2-1547c6e4020b', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(encodeURIComponent("email") + "=" + encodeURIComponent(email));

        UserInfo.getInfo(function(data) {
    			// the "data" object contains the info

            var payload = {
      				"text": "Un utilisateur s'est ajouté à la waitinglist",
      				"attachments": [{
      								"title": email,
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
              "text": "Infos",
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

if(document.getElementById("particles-js")) {
particlesJS("particles-js",
{
  "particles": {
    "number": {
      "value": 14,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.08680624057955,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 0.40603860615067255,
        "opacity_min": 0.056845404861094156,
        "sync": false
      }
    },
    "size": {
      "value": 201.23264861622954,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 40,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 8,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "remove"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
);
}
