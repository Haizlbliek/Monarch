chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
	url = new URL(url);
	if (!((url.hostname === "glitch.com") && ((url.pathname === "/edit/") || (url.pathname === "/edit")))) {
		return;
	}
	chrome.scripting.insertCSS({
		target: { tabId },
		files: [ "glitch.css" ]
	});
	chrome.scripting.executeScript({
		target: { tabId },
		files: [ "glitch.js" ],
		world: "MAIN"
	});
});