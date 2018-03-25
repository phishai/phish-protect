// this is the code which will be injected into a given page...

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

var query = { active: true, currentWindow: true };
chrome.tabs.query(query, function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    var hostname = extractHostname(currentTab.url);
    var domain = document.getElementById('domain');
    if (hostname.startsWith('xn--')) {
        domain.className = 'badge badge-danger';
    } else {
        domain.className = 'badge badge-success';
    }
    domain.innerHTML = hostname;

    var idn_status = document.getElementById('idn_status');
    if (hostname.startsWith('xn--')) {
        idn_status.className = 'badge badge-danger';
        idn_status.innerHTML = 'IDN Detected'
    } else {
        idn_status.className = 'badge badge-success';
        idn_status.innerHTML = 'IDN Free'
    }
});