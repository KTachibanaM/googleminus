const interval = 300;

chrome.runtime.sendMessage({method: "getPersistent"}, function(response) {
    var keywords = response.keywords;
    console.log("---- Greetings from Google minus!");
    console.log("---- Keywords are: ");
    for (var i = 0 ; i < keywords.length ; ++i) {
        var keyword_config = keywords[i];
        console.log(keyword_config.keyword + " with mode " + keyword_config.filtering_mode + " with param " + keyword_config.param);
    }
    console.log("---- Keywords end");

    chrome.extension.sendMessage({}, function(response) {
        console.log("---- Start filtering with interval " + interval);
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                filter(keywords);
            }
        }, interval);
    });
});

