chrome.runtime.sendMessage({method: "keywords"}, function(response) {
    var keywords = response.keywords;
    console.log("---- Greetings from Google minus!");
    console.log("---- Keywords are: ");
    for (var i = 0 ; i < keywords.length ; ++i) {
        console.log(keywords[i]);
    }
    console.log("---- Keywords end");

    chrome.extension.sendMessage({}, function(response) {
        console.log("---- Strat filtering");
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                filter(keywords);
            }
        }, 300);
    });
});

