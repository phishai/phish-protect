var config = {
    apiKey: "AIzaSyD1FfiwIWzbbn0rhqQg6ZF2KzVBOiqU7oQ",
    authDomain: "phish-ai-production.firebaseapp.com",
    databaseURL: "https://phish-ai-production.firebaseio.com",
    projectId: "phish-ai-production",
    storageBucket: "gs://phish-ai-production.appspot.com/",
    messagingSenderId: "976092427021"
};
firebase.initializeApp(config);
var db = firebase.firestore();
var domainsRef = db.collection('whitelist_domains');

var tabIdMap = {};
var tabIgnored = {};
var tabMalicious = {};

chrome.storage.local.get({
    idnEnable: true,
    aiEnable: true,
    userGuid: null,
    productKey: '',
}, function(items) {
    const idnEnable = items.idnEnable;
    const aiEnable = items.aiEnable;
    var userGuid = items.userGuid;
    var productKey = items.productKey;
    if (items.userGuid == null) {
        var userGuid = guid();
        chrome.storage.local.set({
            userGuid: userGuid
        }, function(items) {
            addListener(idnEnable, aiEnable, userGuid, productKey);
        });
    } else {
        addListener(idnEnable, aiEnable, userGuid, productKey);
    }
});

function addListener(idnEnable, aiEnable, user_email, productKey) {
    chrome.tabs.onUpdated.addListener(function mylistener(tabId, changedProps, tab) {
        if (changedProps.status != "complete") {
            return;
        }

        var prev_url = "";
        if (tabId in tabIdMap) {
            prev_url = tabIdMap[tabId];
        }
        tabIdMap[tabId] = tab.url;
        var domain = extractHostname(tab.url);

        if (isPageBlockedUrl(prev_url)) {
            if (tabId in tabIgnored) {
                tabIgnored[tabId].push(domain);
            } else {
                tabIgnored[tabId] = [domain];
            }
            return;
        }

        if ((tabId in tabIgnored) && (tabIgnored[tabId].indexOf(domain) > -1)) {
            return;
        }

        if (idnEnable && isDomainIDN(domain)) {
            chrome.tabs.update(tabId, {url: "page_blocked.html"});
            return;
        }

        if (aiEnable) {
            if (isSystemUrl(tab.url) || isPrivateIp(domain)) {
                return;
            }
            db.collection('whitelist_domains').where('domain', '==', domain)
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty) {
                        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
                            if (screenshotUrl === undefined) {
                                console.log('error: unable to take screenshot');
                                return;
                            }

                            var xhr = new XMLHttpRequest();
                            var FD = new FormData();

                            FD.append('url', tab.url);
                            FD.append('domain', domain);
                            FD.append('title', tab.title);
                            FD.append('screenshotURL', screenshotUrl);
                            FD.append('user_agent', navigator.userAgent);
                            FD.append('user_email', user_email);

                            xhr.open("POST", "https://api.phish.ai/url/check");
                            if (productKey != '') {
                                xhr.setRequestHeader("Authorization", "Bearer " + productKey);
                            }
                            xhr.onreadystatechange = function() { //Call a function when the state changes.
                                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                                    res = JSON.parse(xhr.responseText);
                                    if (res['reputation'] === 'bad') {
                                        tabMalicious[tabId] = {zero_day: true, targeted_brand: res['target_brand']};
                                        chrome.tabs.update(tabId, {url: "page_blocked.html"});
                                    }
                                } else {
                                    console.log(xhr.responseText)
                                }
                            };

                            xhr.send(FD);

                        });
                    } else {
                        return;
                    }
                })
                .catch(function(error) {
                    console.log('error while getting whitelisted domains: ' + error);
                });
        }

    });
};









