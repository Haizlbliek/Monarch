chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
	if (url.startsWith("https://glitch.com")) {
		chrome.scripting.insertCSS({
			target: { tabId },
			files: [ "glitch.css" ]
		});
		chrome.scripting.executeScript({
			target: { tabId },
			files: [ "glitch.js" ],
			world: "MAIN"
		});
	}
});