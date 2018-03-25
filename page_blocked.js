window.onload = function() {
    document.getElementById("btn_safety").addEventListener("click", btn_safety);
    document.getElementById("btn_continue").addEventListener("click", btn_continue);
}

function getJsonFromUrl() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

function btn_safety() {
    window.history.go(-2);
}

function btn_continue() {
    window.history.go(-1);
    // var result = getJsonFromUrl();
    // var link = document.createElement('a');
    // link.href = result.url;
    // document.body.appendChild(link);
    // link.click();
    return false;
}