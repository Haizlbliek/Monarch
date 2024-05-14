# Glitch Autocompletions
A buggy chrome extension for glitch.com autocompletions

## How to use
1. Download this project into a directory (not .zip)
2. Open chrome://extensions
3. Turn on developer mode (Upper right corner)
4. Click "Load Unpacked"
5. Select the folder that contains all the files

## How to update
1. Copy the new code from Github to the directory that you put it in previously.
2. chrome://extensions -> Click the reload icon on the Glitch Autocompletions extension.

## Things it does do
- Adds autocompletions
- Any variables you type are included
- All `.js` files are included

## Things it does NOT do
- Use the scripts that your HTML file includes

## FAQ
### Why does it have so many errors?
This project is still in development, so there are many bugs.

### Why is the glitch.com editor crashing?
The code is somewhat funky with including files, so when you open a large file, it may crash the extension.
The main reason why it crashes is when loading large files, because it tries to parse the whole file.

### What all does it work on?
This extension is made for chrome. It will probably only work on chrome, or maybe chrome-based browsers.

### What is the Input autocompletion?
- Input is [Engine.js](https://engine-js.glitch.me/). I use it with most of my projects, so it is included.

### How did I do it?
- I did some messing around in the dev console while on the glitch editor.
- The `application` object is your friend.
- Lots of hours staring at minified code.


## Changelog
### Version 3.0
- Added a new `settings` object to store settings.
- Updated the assets menu to have a view scale slider.
- Updated the opened asset menu to be slightly cleaner.