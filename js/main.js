var keywords = get_keywords();

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            filter(keywords);
        }
    }, 50);
});