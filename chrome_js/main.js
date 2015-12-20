const interval = 300;

chrome.runtime.sendMessage({method: "getPersistent"}, function(response) {
    var keywords = response.keywords;
    console.log("[googleminus] Greetings from Google minus!");
    console.log("[googleminus] RegEx's are: ");
    keywords.forEach(function(o) {
        console.log(o.keyword + ", mode " + o.filtering_mode + ", param " + o.param);
    });
    console.log("[googleminus] RegEx's end");

    chrome.extension.sendMessage({}, function(response) {
        console.log("[googleminus] Start filtering with interval " + interval);
        setInterval(function() {
            if (document.readyState === "complete") {
                filter(keywords);
            }
        }, interval);
    });
});

