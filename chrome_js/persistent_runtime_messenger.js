// Hook up listener for getting keywords
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getPersistent") {
        var response = {
            keywords: get_keyword_configs(),
            interval: get_interval()
        };
        sendResponse(response);
    } else {
        sendResponse({});
    }
});