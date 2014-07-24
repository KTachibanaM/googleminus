const interval = 300;

chrome.runtime.sendMessage({method: "getPersistent"}, function(response) {
    var keywords = response.keywords;
    var filtering_mode = response.filtering_mode;
    console.log("---- Greetings from Google minus!");
    console.log("---- Keywords are: ");
    for (var i = 0 ; i < keywords.length ; ++i) {
        console.log(keywords[i]);
    }
    console.log("---- Keywords end");

    chrome.extension.sendMessage({}, function(response) {
        console.log("---- Strat filtering with interval " + interval + " and mode " + filtering_mode);
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                filter(keywords, filtering_mode);
            }
        }, interval);
    });
});

