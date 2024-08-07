function send() {
	let func;

	switch (theme.name) {
		case "cosmos":
			func = themeCosmos;
			break;
		case "sugar":
			func = themeSugar;
			break;
		case "pico":
			func = themePico;
			break;
		case "text":
			func = themeChromokai;
			break;
		case "grayscale":
			func = themeGrayscale;
			break;
	}

	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.scripting.executeScript({
			target: {tabId: tabs[0].id},
			func
		})
	});
}

function themeCosmos() {
	const element = document.body;
	element.classList.remove(...element.classList);
	document.body.classList.add("theme-cosmos");
	document.cookie = "theme=theme-cosmos;path=/";
}

function themeSugar() {
	const element = document.body;
	element.classList.remove(...element.classList);
	document.body.classList.add("theme-sugar");
	document.cookie = "theme=theme-sugar;path=/";
}

function themePico() {
	const element = document.body;
	element.classList.remove(...element.classList);
	document.body.classList.add("theme-pico");
	document.cookie = "theme=theme-pico;path=/";
}

function themeChromokai() {
	const element = document.body;
	element.classList.remove(...element.classList);
	document.body.classList.add("theme-text");
	document.cookie = "theme=theme-text;path=/";
}

function themeGrayscale() {
	const element = document.body;
	element.classList.remove(...element.classList);
	document.body.classList.add("theme-gray");
	document.cookie = "theme=theme-gray;path=/";
}

theme.onchange = send;