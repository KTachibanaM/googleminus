const KEYWORDS_KEY = "keywords";

// Initialize keywords
if (localStorage.getItem(KEYWORDS_KEY) === null) {
    localStorage.setItem(KEYWORDS_KEY, "[]");
}

// Hook up listener for getting keywords
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "keywords")
    {
        sendResponse({keywords: get_keywords()});
    }
    else
    {
        sendResponse({});
    }
});

/**
 * Get keywords
 * @returns {Array} keywords array
 */
function get_keywords() {
    return JSON.parse(localStorage.getItem(KEYWORDS_KEY));
}

/**
 * Add a new keyword in keywords
 * @param {String} new_keyword
 */
function add_keyword(new_keyword) {
    var keywords = localStorage.getItem(KEYWORDS_KEY);
    keywords = JSON.parse(keywords);

    keywords.push(new_keyword);

    keywords = JSON.stringify(keywords);
    localStorage.setItem(KEYWORDS_KEY, keywords);
}

/**
 * Remove a keyword from keywords
 * @param {String} removed_keyword
 */
function remove_keyword(removed_keyword) {
    var keywords = localStorage.getItem(KEYWORDS_KEY);
    keywords = JSON.parse(keywords);

    var index = keywords.indexOf(removed_keyword);
    if (index > -1) {
        keywords.splice(index, 1);
    }

    keywords = JSON.stringify(keywords);
    localStorage.setItem(KEYWORDS_KEY, keywords);
}