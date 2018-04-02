function save_options() {
    var idnEnable = document.getElementById('idn').checked;
    var aiEnable = document.getElementById('ai').checked;
    chrome.storage.local.set({
        idnEnable: idnEnable,
        aiEnable: aiEnable
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
        aiEnable: true
    }, function(items) {
        document.getElementById('idn').checked = items.idnEnable;
        document.getElementById('ai').checked = items.aiEnable;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);