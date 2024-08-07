const browserAPI = (function () {
	if (typeof msBrowser != "undefined") return msBrowser;
	if (typeof browser != "undefined") return browser;
	if (typeof chrome != "undefined") return chrome;

	console.error("Can't find browser API");
})();

browserAPI.webNavigation.onDOMContentLoaded.addListener(function ({ tabId, url }) {
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