var keywords = [
    "菊苣",
    "NSFW"
];

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            filter(keywords);
        }
    }, 50);
});