function save_options() {
    var idnEnable = document.getElementById('idn').checked;
    var aiEnable = document.getElementById('ai').checked;
    var productKey = document.getElementById('pkey').value;
    chrome.storage.local.set({
        idnEnable: idnEnable,
        aiEnable: aiEnable,
        productKey: productKey
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.local.get({
        idnEnable: true,
        aiEnable: true,
        productKey: ''
    }, function(items) {
        document.getElementById('idn').checked = items.idnEnable;
        document.getElementById('ai').checked = items.aiEnable;
        document.getElementById('pkey').value = items.productKey;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);