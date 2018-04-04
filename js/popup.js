

// this is the code which will be injected into a given page...
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


function open_options_page() {
    chrome.tabs.create({'url': "/options.html" } )
};

function open_demo_page() {
    chrome.tabs.create({'url': "https://www.phish.ai/request-a-demo" } )
};

function restore_popup() {
    chrome.storage.local.get({
        idnEnable: true,
        aiEnable: true
    }, function(items) {
        if (!items.aiEnable) {
            document.getElementById('zero_day_disabled').style.display = ""
        }
        if (!items.idnEnable) {
            document.getElementById('idn_disabled').style.display = ""
        }
        var bg = chrome.extension.getBackgroundPage();
        var query = {active: true, currentWindow: true};
        chrome.tabs.query(query, function callback(tabs) {
            if (items.idnEnable) {
                var currentTab = tabs[0]; // there will be only one in this array
                var hostname = bg.extractHostname(currentTab.url);
                var domain = document.getElementById('domain');
                var idn_status = document.getElementById('idn_status');
                if (bg.isDomainIDN(hostname)) {
                    domain.className = 'badge badge-danger';
                    idn_status.className = 'badge badge-danger';
                    idn_status.innerHTML = 'IDN Detected';
                }
                domain.innerHTML = hostname;
            }

            if (items.aiEnable) {
                if (currentTab.id in bg.tabMalicious) {
                    var zero_day = document.getElementById('zero_day');
                    var targeted_brand = document.getElementById('targeted_brand');
                    zero_day.className = 'badge badge-danger';
                    zero_day.innerHTML = "zero-day phishing detected";
                    targeted_brand.innerHTML = bg.tabMalicious[currentTab.id].targeted_brand;
                    targeted_brand.className = 'badge badge-danger';
                }
            }
        });


    });
};

document.addEventListener('DOMContentLoaded', restore_popup);
document.getElementById('options_page').addEventListener('click',
    open_options_page);
document.getElementById('options_page_1').addEventListener('click',
    open_options_page);
document.getElementById('enterprise').addEventListener('click',
    open_demo_page);