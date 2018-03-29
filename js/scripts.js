
/* Functions */

/*
 * Initializes the user interface
 */
function init() {
	// Show only button submit
	document.getElementById("loader").style.visibility = "hidden";
	document.getElementById("message").style.visibility = "hidden";
	document.getElementById("marker").style.visibility = "hidden";
	document.getElementById("success").style.visibility = "hidden";
	document.getElementById("clipboard").style.visibility = "hidden";
	document.getElementById("gotomap").style.visibility = "hidden";
	document.getElementById("whatsapp").style.visibility = "hidden";
	document.getElementById("locate").style.visibility = "visible";
	document.getElementById("submit").style.visibility = "visible";
}

/*
 * On submit, get the geographical position of the device.
 */
function getLocalisation() {															// Check if Geolocation is supported
	init();																						// Initialize the user interface
	document.getElementById("loader").style.visibility = "visible";			// Display loader
	navigator.geolocation.getCurrentPosition(success, fail);					// Get current position
};

/*
 * On success, display features :
 * - clipboard
 * - go to Google map
 */
function success(position) {
	document.getElementById("loader").style.visibility = "hidden";
	document.getElementById("success").style.visibility = "visible";
	// Display coordinates
	var node = document.getElementById("message");
	node.innerHTML = position.coords.latitude + "," + position.coords.longitude;
	node.style.visibility = "visible";
	// Set clipboard
	document.getElementById("clipboard").setAttribute("data-clipboard-text","https://www.google.fr/maps/?q=" + position.coords.latitude + "," + position.coords.longitude);
	document.getElementById("clipboard").style.visibility = "visible";
	// Set go to Google map
	document.getElementById("map").href='https://www.google.fr/maps/?q=' + position.coords.latitude + ',' + position.coords.longitude;
	document.getElementById("gotomap").href='https://www.google.fr/maps/?q=' + position.coords.latitude + ',' + position.coords.longitude;
	document.getElementById("marker").style.visibility = "visible";
	document.getElementById("gotomap").style.visibility = "visible";
	// Set whatsapp
	var text = encodeURIComponent('https://www.google.fr/maps/?q=' + position.coords.latitude + ',' + position.coords.longitude);
	document.getElementById("whatsapp").href='https://api.whatsapp.com/send?text=' + text;;
	document.getElementById("whatsapp").style.visibility = "visible";
}

/*
 * On error, display error
 */
function fail(error) {
	/* Debug
	console.error('Error code: ', error.code);
	console.error('Message: ' + error.message);	
	*/
	// Hide loader
	document.getElementById("loader").style.visibility = "hidden";
	// Display error
	var node = document.getElementById("message"); 
	node.innerHTML = "Geolocation IS NOT available !";
	switch(error.code) {
		case error.UNKNOWN_ERROR:
			node.innerHTML = "An unknown error occurred."
			break;
		case error.PERMISSION_DENIED:
			node.innerHTML = "User denied the request for Geolocation."
			break;
		case error.POSITION_UNAVAILABLE:
			node.innerHTML = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			node.innerHTML = "The request to get user location timed out."
			break;
	}
	node.style.visibility = "visible";
}

/* Main */

// Check if Geolocation is supported
if (navigator.geolocation) {
	// If geolocation is available : display submit
	document.getElementById("locate").style.visibility = "visible";	
	document.getElementById("submit").style.visibility = "visible";	
} else {
	// If geolocation is not available : display error
	var node = document.getElementById("message");
	node.innerHTML = "Geolocation IS NOT available !";
	node.style.visibility = "visible";
}

/* Clipboard */

var clipboard = new ClipboardJS('.cp');


clipboard.on('success', function(e) {
	var node = document.getElementById("message");
	node.innerHTML = "copied !";
	node.style.visibility = "visible";
    //console.info('Action: ', e.action);
	//console.info('Text: ', e.text);
	//console.info('Trigger: ', e.trigger);
    e.clearSelection();
});

/*
clipboard.on('error', function(e) {
    console.error('Action: ', e.action);
	console.error('Trigger: ', e.trigger);
});
*/