var presentation;

var started = false;

var autocomplete;

var completions = [];

var code = "";
var fullCode = "";

let currentCompletion = null;
let completionIndex = 0;

const variableRegex = /(\s|;)var (\w+)/g;
const constantRegex = /(\s|;)const (\w+)/g;
const localVarRegex = /(\s|;)let (\w+)/g;
const functionRegex = /(\s|;)function (\w+)\(/g;
const classRegex = /(\s|;)class (\w+)(\s|{)/g;

const allowedVariableCharacters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_0123456789.";

const variables = [];


const defaultCompletions = [
	"abstract",
	"arguments",
	"await",
	"boolean",
	"break",
	"byte",
	"case",
	"catch",
	"char",
	"class",
	"const",
	"constructor",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"double",
	"else",
	"enum",
	"eval",
	"export",
	"extends",
	"false",
	"final",
	"finally",
	"float",
	"for",
	"function",
	"goto",
	"if",
	"implements",
	"import",
	"in",
	"instanceof",
	"int",
	"interface",
	"let",
	"long",
	"native",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"short",
	"static",
	"super",
	"switch",
	"synchronized",
	"this",
	"throw",
	"throws",
	"transient",
	"true",
	"try",
	"typeof",
	"while",
	"with",
	"yield",
	"Array",
	"Date",
	"eval",
	"function",
	"hasOwnProperty",
	"Infinity",
	"isFinite",
	"isNaN",
	"isPrototypeOf",
	"length",
	"Math",
	"NaN",
	"name",
	"Number",
	"Object",
	"prototype",
	"String",
	"toString",
	"undefined",
	"valueOf",
	"alert",
	"all",
	"anchor",
	"anchors",
	"area",
	"assign",
	"blur",
	"button",
	"checkbox",
	"clearInterval",
	"clearTimeout",
	"clientInformation",
	"close",
	"closed",
	"confirm",
	"crypto",
	"decodeURI",
	"decodeURIComponent",
	"defaultStatus",
	"document",
	"element",
	"elements",
	"embed",
	"embeds",
	"encodeURI",
	"encodeURIComponent",
	"escape",
	"event",
	"fileUpload",
	"focus",
	"form",
	"forms",
	"frame",
	"innerHeight",
	"innerWidth",
	"layer",
	"layers",
	"link",
	"location",
	"mimeTypes",
	"navigate",
	"navigator",
	"frames",
	"frameRate",
	"hidden",
	"history",
	"image",
	"offscreenBuffering",
	"open",
	"opener",
	"outerHeight",
	"outerWidth",
	"pageXOffset",
	"pageYOffset",
	"parent",
	"parseFloat",
	"parseInt",
	"prompt",
	"screenX",
	"screenY",
	"scroll",
	"self",
	"setInterval",
	"setTimeout",
	"status",
	"top",
	"unescape",
	"window",
	"Input",
	"requestAnimationFrame"
];

for (let x in window) {
	defaultCompletions.push(x);
}

const extendedCompletions = {
	document: [
		"activeElement",
		"adoptedStyleSheets",
		"alinkColor",
		"all",
		"anchors",
		"applets",
		"bgColor",
		"body",
		"characterSet",
		"childElementCount",
		"children",
		"compatMode",
		"contentType",
		"cookie",
		"currentScript",
		"defaultView",
		"designMode",
		"dir",
		"doctype",
		"documentElement",
		"documentURI",
		"domain",
		"embeds",
		"featurePolicy",
		"fgColor",
		"firstElementChild",
		"fonts",
		"forms",
		"fragmentDirective",
		"fullscreen",
		"fullscreenElement",
		"fullscreenEnabled",
		"head",
		"hidden",
		"images",
		"implementation",
		"lastElementChild",
		"lastModified",
		"lastStyleSheetSet",
		"linkColor",
		"links",
		"location",
		"pictureInPictureElement",
		"pictureInPictureEnabled",
		"plugins",
		"pointerLockElement",
		"preferredStyleSheetSet",
		"readyState",
		"referrer",
		"rootElement",
		"scripts",
		"scrollingElement",
		"selectedStyleSheetSet",
		"styleSheets",
		"styleSheetSets",
		"timeline",
		"title",
		"URL",
		"visibilityState",
		"vlinkColor",
		"xmlEncoding",
		"xmlVersion",
		"querySelector",
		"getElementById",
		"getElementsByName",
		"getElementsByClassName",
		"createElement",
	],
	window: [
		"closed",
		"console",
		"credentialless",
		"customElements",
		"defaultStatus",
		"devicePixelRatio",
		"document",
		"event",
		"external",
		"frameElement",
		"frames",
		"fullScreen",
		"history",
		"innerHeight",
		"innerWidth",
		"launchQueue",
		"length",
		"localStorage",
		"location",
		"locationbar",
		"menubar",
		"mozInnerScreenX",
		"mozInnerScreenY",
		"name",
		"navigation",
		"navigator",
		"ondragdrop",
		"opener",
		"orientation",
		"outerHeight",
		"outerWidth",
		"pageXOffset",
		"pageYOffset",
		"parent",
		"personalbar",
		"scheduler",
		"screen",
		"screenLeft",
		"screenTop",
		"screenX",
		"screenY",
		"scrollbars",
		"scrollMaxX",
		"scrollMaxY",
		"scrollX",
		"scrollY",
		"self",
		"sessionStorage",
		"sidebar",
		"speechSynthesis",
		"status",
		"statusbar",
		"toolbar",
		"top",
		"visualViewport",
		"window",
	],
	Math: {
		random: "function",
		floor: "function",
		ceil: "function",
		round: "function",
		cos: "function",
		sin: "function",
		sqrt: "function",
		PI: "constant",
		E: "constant"
	},
	console: {
		assert: "function",
		clear: "function",
		context: "function",
		count: "function",
		countReset: "function",
		debug: "function",
		dir: "function",
		dirxml: "function",
		error: "function",
		group: "function",
		groupCollapsed: "function",
		groupEnd: "function",
		info: "function",
		log: "function",
		profile: "function",
		profileEnd: "function",
		table: "function",
		time: "function",
		timeEnd: "function",
		timeLog: "function",
		timeStamp: "function",
		trace: "function",
		warn: "function"
	},
	Input: {
		is_action_pressed: "",
		is_action_just_pressed: "",
		is_action_just_released: "",
		add_action: "",
		is_mouse_button_pressed: "",
	}
}

const descriptions = {
	"Math.random": "Returns a random number from 0 <= x < 1",
	"Math.round": "Rounds the given number to the nearest integer",
	"Math.ceil": "Rounds the given number up to the nearest integer",
	"Math.floor": "Rounds the given number down to the nearest integer",
	"Math.cos": "Returns the cosine of a number in radians",
	"Math.sin": "Returns the sine of a number in radians",
	"Math.sqrt": "Returns the square root of the number",
	"Math": "The Math namespace object contains static properties and methods for mathematical constants and functions",
	"Math.E": "Euler's number"
}

for (let index in defaultCompletions) {
	defaultCompletions[index] = [defaultCompletions[index], "reserved"]
}

for (let word of ["onblur","onclick","onerror","onfocus","onkeydown","onkeypress","onkeyup","onmouseover","onload","onmouseup","onmousedown","onsubmit","console"]) {
	defaultCompletions.push([word, "event"])
}

function getCursor() {
	return document.querySelector(".CodeMirror-cursor");
}

function getCode() {
	return document.querySelector(".CodeMirror-code");
}

function getActiveFile() {
	return document.querySelector(".filetree-child.file.active");
}

function getCursorPosition() {
	var cursor = application.getCursor();
	return {x: cursor.ch, y: cursor.line};
}

function getFileExtension() {
	var file = getActiveFile();
	if (!file) return;
	var splits = file.title.split(".");
	return splits[splits.length - 1];
}

function ready() {
	autocomplete = document.createElement("div");
	autocomplete.classList.add("CodeMirror-AutoComplete")
	presentation.appendChild(autocomplete);

	started = true;

	var lines = document.querySelector(".CodeMirror-lines");
	var extraSpace = document.createElement("div");
	extraSpace.classList.add("ac-space");
	lines.appendChild(extraSpace);
	
	application.notifyAutosave = function () {}
	console.clear();
}

function waitForReady() {
application.notifyAutosave = function () {}
	presentation = document.querySelector(".CodeMirror-lines > div");

	if (presentation) {
		var get = document.querySelector("#app-preview");
		if (get) {
			get.classList.add("hidden");
		}
		get = document.querySelector(".iframe-wrapper");
		if (get) {
			get.parentElement.removeChild(get);
		}

		ready();

		return;
	}

	requestAnimationFrame(waitForReady);
}

function addCompletions(array, type) {
	if (!array) {
		return;
	}

	for (let completion of array) {
		completion = completion.slice(1);

		if (type == 0) {
			const completionName = completion.replace(/(let )|(var )|(const) /, "");
			completions.push([completionName, "variable"]);

			variables.push(completionName);
		} else if (type == 1) {
			completions.push([completion.replace(/(function) /, "").slice(0, -1), "function"]);
		} else if (type == 2) {
			completions.push([completion.replace(/(class) /, "").slice(0, -1), "class"]);
		}
	}
}

function getAllCode() {
	fullCode = "";
	code = "";

	var files = application.files();

	var selectedFile = application.selectedFile();
	if (!selectedFile) return;
	var extension = selectedFile.extension();
	if (extension != "js") return;

	for (let file of files) {
		if (file == selectedFile) continue;

		if (file.extension() != extension) continue;

		const content = file.content();
		let firstLine = content.slice(0, content.indexOf("\n"));

		if (firstLine.includes("/* NoAutoComplete */")) continue;

		fullCode += "\n\n/* name = " + file.name() + " */\n\n";

		fullCode += file.content() + "\n\n";
	}


	fullCode += "\n\n/* name = " + selectedFile.name() + " */\n\n";

	const content = selectedFile.content();
	let firstLine = content.slice(0, content.indexOf("\n"));

	if (firstLine.startsWith("/* globals ")) {
		const globals = firstLine.slice(11, -2).split(" ");
		for (let global of globals) {
			fullCode += "const " + global + " = undefined;";
		}
		fullCode += "\n\n";
	}

	code = selectedFile.content();
	fullCode += code;
}

function updateCompletions() {
	if (!autocomplete) return;

	var editingText = getEditingText();

	completions = [...defaultCompletions];

	// var codeCollect = [];
	// getText(getCode(), codeCollect);
	// code = codeCollect.join("");
	getAllCode();
	// console.log(application)

	if (fullCode) {
		fullCode = " " + fullCode;
		addCompletions(fullCode.match(variableRegex), 0);
		addCompletions(fullCode.match(constantRegex), 0);
		addCompletions(fullCode.match(localVarRegex), 0);
		addCompletions(fullCode.match(functionRegex), 1);
		addCompletions(fullCode.match(classRegex), 2);
	}

	if (editingText.includes(".")) {
		var startText = editingText.split(".")[0];
		const extendedCompletion = extendedCompletions[startText];

		if (extendedCompletion) {
			if (Array.isArray(extendedCompletion)) {
				for (let completion of extendedCompletion) {
					completions.push([completion, "", true]);
				}
			} else {
				for (let completion of Object.keys(extendedCompletion)) {
					const title = descriptions[startText + "." + completion] ?? "";

					completions.push([completion, extendedCompletion[completion], true, title]);
				}
			}
		}
	}

	sortCompletions();

	// completions = [[getCursorPosition().y, ""]];

	if (completions.length == 0) {
		currentCompletion = null;
		return true;
	}
}

function sortCompletions() {
	var oldCompletions = completions;
	var editingText = getEditingText();
	var editingTextEnd = editingText.split(".");
	editingTextEnd = editingTextEnd[editingTextEnd.length - 1];
	completions = [];
	var addedCompletions = {};

	if (editingText == "" || oldCompletions.length == 0) {
		return; // No completions for nothing
	}

	for (let completion of oldCompletions) {
		if (completion[2]) {
			if (completion[0].startsWith(editingTextEnd)) {
				completions.push(completion);
			}
			continue;
		}

		if (completion[0] == editingText) {
			continue;
		}

		if (completion[0].startsWith(editingText)) {
			if (typeof addedCompletions[completion[0]] == "object") {
				// console.log(completion[0]);
				// console.log(addCompletions[completion[0]]);
				if (addedCompletions[completion[0]].includes(completion[1])) {
					continue;
				} else {
					addedCompletions[completion[0]].push(completion[1]);
				}
			} else {
				addedCompletions[completion[0]] = [completion[1]];
			}

			completions.push(completion);
		}
	}
}

function getEditingText() {
	var cursorPosition = getCursorPosition();
	var splitCode = code.split("\n");
	var text = "";
	for (let goes = 0; goes < 100; goes++) {
		var char = splitCode?.[cursorPosition.y]?.[cursorPosition.x - goes - 1] ?? "";

		if (!allowedVariableCharacters.includes(char)) {
			return text;
		}

		text = (char ?? "") + text;

		if (cursorPosition.x - goes <= 1) {
			return text;
		}
	}
	return "";
}

function addCompletion(completion,completionId) {
	var editingTextLength = getEditingText().split(".");
	editingTextLength = editingTextLength[editingTextLength.length - 1].length + 1;

	var node = document.createElement("span");
	node.classList.add("ac-completion");
	autocomplete.appendChild(node);

	var text = document.createElement("span");
	text.classList.add("ac-text");
	text.innerHTML = "<b>" + completion[0].slice(0, editingTextLength - 1) + "</b>" + completion[0].slice(editingTextLength - 1);
	node.appendChild(text);

	var type = document.createElement("span");
	type.classList.add("ac-type");
	type.innerText = completion[1];
	node.appendChild(type);

	node.title = completion[3] ?? "";

	if (completionId == completionIndex) {
		node.style.background = "#202020";
	}
}

function update() {
	requestAnimationFrame(update);

	if (!started) {
		return;
	}

	var cursor = getCursor();

	if (!cursor) {
		autocomplete.style.visibility = "hidden";
		completionIndex = 0;

		return;
	}

	autocomplete.style.visibility = completions.length == 0 ? "hidden" : "visible";

	autocomplete.style.left = cursor.style.left;
	autocomplete.style.top = ((+cursor.style.top.slice(0, -2)) + 16) + "px";
	
	if (completionIndex >= completions.length) completionIndex = completions.length - 1;
	if (completionIndex < 0) completionIndex = 0;
	
	currentCompletion = completions[completionIndex] ?? completions[0];

	while (autocomplete.hasChildNodes()) {
		autocomplete.removeChild(autocomplete.firstChild);
	}
	for (let completionId in completions) {
		addCompletion(completions[completionId], completionId);
	}
}

function updateCompletionsHandler() {
	updateCompletions();

	return Pass;
}

// function insertScript() {
// 	console.log(application.selectedFile().content());
// }

// setInterval(updateCompletions, 100);
application.editor()._handlers.change.push(updateCompletionsHandler);

update();
waitForReady();

function setCookie(cname, cvalue, exdays) {
  let expires;
  if (exdays == "never") {
    const d = new Date();
    d.setTime(d.getTime() + 34560000000); // 400 days later
    expires = "expires="+ d.toUTCString();
  } else {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires="+ d.toUTCString();
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname, defaultValue = "") {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return defaultValue;
}

function clearCookie(cname) {
  document.cookie = cname + "=;expires=0;path=/";
}

var theme = getCookie("theme");
if (theme) {
	document.body.classList.remove(...document.body.classList);
	document.body.classList.add(theme);
}

setInterval(function () {
	setCookie(theme, document.body.classList.item(0));
}, 10000);

// Tab Autocompletion
let Pass = {
  toString: function() {
	  return "CodeMirror.Pass"
  }
};

function Pos(line, ch, sticky) {
	return {line: line, ch: ch, sticky: sticky};
}

function getCharacter(line, char) {
	return application.editor().getLine(line)?.[char] || "";
}

application.editor().addKeyMap({
	Tab: function (E) {
		if (application.editor().getSelection()) return Pass; // Return to default tabbing

		const cursor = getCursorPosition();
		let replacer = "  ";
		let offsetChar = 0;

		if (currentCompletion) {
			replacer = currentCompletion[0];

			const line = application.editor().getLine(cursor.y);

			for (offsetChar = -replacer.length; offsetChar < 0; offsetChar++) {
				if (replacer.substr(0, -offsetChar) == line.substr(cursor.x + offsetChar, -offsetChar)) {
					break;
				}
			}
		}
		E.replaceRange(replacer, Pos(cursor.y, cursor.x + offsetChar), Pos(cursor.y, cursor.x), "+delete");
	},
	"Ctrl-Space": function (E) {
		console.log("Ctrl-Space");
	},
	"Up": function (E) {
		if (completions.length <= 0) return Pass;

		completionIndex -= 1;
		if (completionIndex < 0) completionIndex += completions.length;
	},
	"Down": function (E) {
		if (completions.length <= 0) return Pass;

		completionIndex += 1;
		if (completionIndex >= completions.length) completionIndex -= completions.length;
	}
});

const identifierBreaking = " ;,.<>/?:'\"\\|]}[{-+=)(*&^%#@!`~";
const identifierRegex = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

// Alt + Left Click
document.body.onmousedown = function (e) {
	if (e.button == 0 && e.altKey) {
		const cursor = getCursorPosition();

		let selectedText = "";

		for (let i = -1; i > -1000; i--) {
			const char = getCharacter(cursor.y, cursor.x + i);

			if (identifierBreaking.includes(char)) {
				break;
			}

			selectedText = char + selectedText;
		}

		for (let i = 0; i < 1000; i++) {
			const char = getCharacter(cursor.y, cursor.x + i);

			if (identifierBreaking.includes(char)) {
				break;
			}

			selectedText += char;
		}

		if (selectedText.length > 0) {
			console.log(identifierRegex.test(selectedText));
		}
	}
}

import("https://glitch.com/edit/assets/codemirror.bff8dd02.js").then(a=>{
	Pass = a.c.exports.Pass;
});