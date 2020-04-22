# Quick JAV
This is a pretty simple web extension designed to embed a list of sukebei
torrents onto r18.com, and perhaps some more sites in the future.

This only works on Firefox. If you wish to use this on chromium-based browsers,
then you must move the search function out into a background script to bypass
CORS.

# Installation
Either just download the latest release and open the .xpi up in Firefox, or
continue to the building section.

# Building
### Requirements
* Node.js
* npm

### Steps
1. Create a Firefox account, and go [here](https://addons.mozilla.org/en-US/developers/addon/api/key/)
to create your issuer and secret for signing the extension.
2. Create a .env file containing AMO\_ISSUER and AMO\_SECRET key value pairs.
3. Run `npm install`
4. Run `npm run sign`

# Screenshots
![R18 Example](screenshots/r18.jpg)

# License
Licensed under GPL-3.0-only
