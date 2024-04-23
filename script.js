chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
	if (url.substring(0, 18) == 'https://glitch.com') {
		chrome.scripting.insertCSS({
			target: { tabId },
			files: [ "glitch/style.css" ]
		});
		chrome.scripting.executeScript({
			target: { tabId },
			files: [ "glitch/glitch.js" ],
			world: "MAIN"
		});
	}
});