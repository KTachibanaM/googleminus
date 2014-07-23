var KEYWORDS_KEY = "keywords";

/**
 * Get keywords
 * @returns {Array} keywords array
 */
function get_keywords() {
    init_keywords();
    return JSON.parse(localStorage.getItem(KEYWORDS_KEY));
}

/**
 * Add a new keyword in keywords
 *
 * @param {String} new_keyword
 */
function add_keyword(new_keyword) {
    init_keywords();
    var keywords = localStorage.getItem(KEYWORDS_KEY);
    keywords = JSON.parse(keywords);
    keywords.push(new_keyword);
    keywords = JSON.stringify(keywords);
    localStorage.setItem(KEYWORDS_KEY, keywords);
}

/**
 * Init localStorage if not exists
 */
function init_keywords() {
    if (localStorage.getItem(KEYWORDS_KEY) === null) {
        localStorage.setItem(KEYWORDS_KEY, "[]");
    }
}