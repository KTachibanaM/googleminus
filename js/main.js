chrome.runtime.sendMessage({method: "getKeywords"}, function(response) {
    var keywords = response.keywords;
    console.log("---- Greetings from Google minus!");
    console.log("---- Keywords are: ");
    for (var i = 0 ; i < keywords.length ; ++i) {
        console.log(keywords[i]);
    }
    console.log("---- Keywords end");

    chrome.extension.sendMessage({}, function(response) {
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                console.log("---- Start filtering");
                filter(keywords);
            }
        }, 50);
    });
});

