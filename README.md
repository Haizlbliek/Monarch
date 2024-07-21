# Monarch
A buggy chrome extension for adding tweaks and autocompletions to the [Glitch](glitch.com) editor

## How to use
1. Download this project into a directory (not .zip)
2. Open chrome://extensions
3. Turn on developer mode (Upper right corner)
4. Click "Load Unpacked"
5. Select the folder that contains all the files

## How to update
1. Copy the new code from this Github repository into the directory that you put it in previously.
2. Go to chrome://extensions
3. Click the reload icon on the Monarch extension.

## Things it does do
- Adds autocompletions for `.js` files
- Adds the ability to group assets into folders

## FAQ
### Why does it have so many errors?
This project is still in development, so there are many bugs.

### Why is the glitch.com editor crashing?
The code is somewhat funky with including files, so when you open a large file, it usually crashes the extension.

### What all does it work on?
This extension is made for chrome. It will probably only work on chrome-based browsers.

### What is the Input autocompletion?
- Input is from [Engine.js](https://engine-js.glitch.me/), a helpful tool for easy JavaScript keyboard and controller input.

### How did I do it?
- I did LOTS of messing around in the dev console on the glitch editor.
- The `application` object is your friend.
- Lots of hours staring at minified code.


## Changelog
### Version 3.0
- Added a new `settings` object to store settings.
- Updated the assets menu to have a view scale slider.
- Updated the opened asset menu to be slightly cleaner.

### Version 4.0
- Added folders/groups for assets.
- Added a button to show/hide normally hidden files (.glitch-assets).
- Slightly improved the speed and quality of code (Thanks [Tiago](https://github.com/tiagorangel2011/))