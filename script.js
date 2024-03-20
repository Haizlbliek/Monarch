// 'glitchPico8.css'
// 'glitchText.css'
// 'glitchBasic.css'
const style = 'glitch/glitchBasic.css';

chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
	if (url.substring(0, 18) == 'https://glitch.com') {
		chrome.scripting.insertCSS({
			target: {tabId},
			files: [style]
		});
		chrome.scripting.executeScript({
			target: {tabId},
			files: [ 'glitch/glitch.js' ],
			world: "MAIN"
		});
	}
});