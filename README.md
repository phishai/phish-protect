# PhishProtect (Beta)
## Summary
Chrome extension to alert and possibly block:
 * IDN/Unicode websites mostly to prevent homograph attacks.
 * Zero-phishing websites powered by AI & Computer Vision
 
An API is also available on [https://app.phish.ai](https://app.phish.ai)


## Installation
You can install for [chrome](https://chrome.google.com/webstore/detail/phishprotect-beta/mikecfgnmakjomepfcghpbhfamjbjhid), [firefox](https://addons.mozilla.org/en-US/firefox/addon/phish-ai-idn-protect/?src=search), [opera](https://addons.opera.com/en/extensions/details/phishai-idn-protect/). (Edge coming out soon)

Zero Day phishing prevention powered by AI & Computer vision is currently only supported in chrome and it's in Beta

## Contribution
Any suggestions/pull-requests/bugfixes are welcome.

## Screenshots
![IDN Website](https://github.com/phishai/idn-protect-chrome/blob/master/img/screenshot/screenshot1.png "IDN website")
![IDN Free Website](https://github.com/phishai/idn-protect-chrome/blob/master/img/screenshot/screenshot3.png "IDN Free website")
![Block Page](https://github.com/phishai/idn-protect-chrome/blob/master/img/screenshot/screenshot2.png "Block page")

## Privacy Policy
In the extension you can disable the zero-day phishing and then we don't collect any information.
In a nutshell when the zero-day phishing prevention is enabled we send screenshots of unknown sites to be analyzed in the cloud. We do not save any screenshots unless they are malicious.
The full privacy policy is [here](https://www.phish.ai/phish-ai-privacy-policy/)

## AI & Computer Vision Engine
The full description of how the engine works is [here](https://www.phish.ai/product/)

TLDR: essentially we have a very big computer vision database of known websites and their legitimate domains.
the extension send screenshots of unknown websites we compare it with our database and if we detect that it is similar to a known website but hosted on a different domain we send back a respones and alert.

The Engine is in beta and doesn't protect all brands yet. we make the database bigger every day, if you believe your brand is not in our database and you want us to crawl it, just drop me a line at yp@phish.ai 

## Whishlist & Roadmap
The current whishlist and Roadmap are in the [project](https://github.com/phishai/idn-protect-chrome/projects/1) tab.
Please feel free to put issues as ideas or contact me directly at yp@phish.ai.
