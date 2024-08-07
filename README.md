# Monarch
A buggy chrome extension for adding tweaks and autocompletions to the [Glitch](glitch.com) editor

# Installation

## Chrome
1. Download and extract this repo
2. Open chrome://extensions
3. Turn on developer mode (Upper right corner)
4. Click "Load Unpacked"
5. Select the folder that contains all the files

## Firefox
1. Download and extract this repo
2. Go to about:debugging -> This Firefox
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file from Monarch.
5. Go to about:addons -> Extensions
6. Click the "..." by Monarch -> Manage
7. Go to "Permissions"
8. Turn on the "Access your data for https://glitch.com"

# Update Monarch

## Chrome
1. Download and extract this repo into the directory that you put it in previously.
2. Go to chrome://extensions
3. Click the reload icon on the Monarch extension.

## Firefox
1. Download and extract this repo into the directory that you put it in previously.
2. Go to about:debugging -> This Firefox
3. Temporary Extensions -> Monarch
3. Click "Reload" in the bottom right.

# FAQ
## Why does it have so many errors?
This project is still in development, so there are many bugs.

## Why is the glitch.com editor crashing?
The code is somewhat funky with including files, so when you open a large file, it usually crashes the extension.

## What all does it work on?
This extension is made for chrome. It will probably only work on chrome-based browsers.

## Why the warnings while installing Monarch?
There is a warning similar to the below warnings when reading through `manifest.json`. This is because the manifest is built to support both Chrome and Firefox browsers, and they work slightly different from each other.

Warnings:
- Chrome: 'background.scripts' requires manifest version of 2 or lower.
- Firefox: Reading manifest: Warning processing background.service_worker: An unexpected property was found in the WebExtension manifest.

# Changelog
## 3.0
- Added a new `settings` object to store settings.
- Updated the assets menu to have a view scale slider.
- Updated the opened asset menu to be slightly cleaner.

## 4.0
- Added folders/groups for assets.
- Added a button to show/hide normally hidden files (.glitch-assets).
- Slightly improved the speed and quality of code (Thanks [Tiago](https://github.com/tiagorangel2011/))

## 4.1
- Firefox support!!!!! (Finally!)
- General improvements to UI
- Bug fixes
  - The default settings now properly load when installing Monarch for the first time