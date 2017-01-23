const KEYWORDS_KEY = "keywords";

// Initialize keywords
if (localStorage.getItem(KEYWORDS_KEY) === null) {
    localStorage.setItem(KEYWORDS_KEY, "[]");
    console.log("Create keywords complete");
}

// Upgrades
var keywords_ver = JSON.parse(localStorage.getItem(KEYWORDS_KEY)).ver;
console.log("Keywords version " + keywords_ver);

// Upgrade keywords from ver undefined to ver 1
if (keywords_ver === undefined) {
    var old_keywords = JSON.parse(localStorage.getItem(KEYWORDS_KEY));
    var new_keywords = {
        ver: 1,
        keyword_configs: []
    };
    old_keywords.forEach(function(o) {
        new_keywords.keyword_configs.push(new KeywordConfig(o, DEFAULT_FILTERING_MODE, ""))
    });
    localStorage.setItem(KEYWORDS_KEY, JSON.stringify(new_keywords));
    console.log("Upgrade keywords from ver undefined to ver 1 complete");
}

/**
 * Get all keyword configurations
 * @returns {Array} KeywordConfig array
 */
function get_keyword_configs() {
    return JSON.parse(localStorage.getItem(KEYWORDS_KEY)).keyword_configs;
}

/**
 * Read keyword configurations, manipulate and save
 * @param func function that does the manipulation
 */
function manipulate_keyword_configs(func) {
    var keywords = JSON.parse(localStorage.getItem(KEYWORDS_KEY));
    var keyword_configs = keywords.keyword_configs;
    func(keyword_configs);
    localStorage.setItem(KEYWORDS_KEY, JSON.stringify(keywords));
}

/**
 * Add a keyword configuration
 * @param {KeywordConfig} new_config
 */
function add_keyword_config(new_config) {
    manipulate_keyword_configs(function(keyword_configs) {
        keyword_configs.push(new_config);
    });
}

/**
 * Remove a keyword configuration
 * @param {string} removed_keyword
 */
function remove_keyword_config(removed_keyword) {
    manipulate_keyword_configs(function(keyword_configs) {
        var index = keyword_configs.map(function (o) {
            return o.keyword;
        }).indexOf(removed_keyword);
        if (index > -1) {
            keyword_configs.splice(index, 1);
        }
    });
}

/**
 * Modify a keyword config
 * @param {string} modified_keyword
 * @param {string} filtering_mode
 * @param {string} param
 */
function modify_keyword_config(modified_keyword, filtering_mode, param) {
    manipulate_keyword_configs(function(keyword_configs) {
        var index = keyword_configs.map(function (o) {
            return o.keyword;
        }).indexOf(modified_keyword);
        if (index > -1) {
            var modified_config = keyword_configs[index];
            modified_config.filtering_mode = filtering_mode;
            modified_config.param = param;
        }
    });
}

/**
 * Check whether a keyword config exists by keyword
 * @param {string} keyword
 */
function check_keyword_config_exists(keyword) {
    var index = -1;
    get_keyword_configs().forEach(function (config, i) {
        if (config.keyword === keyword) {
            index = i;
        }
    });
    return index !== -1;
}

const INTERVAL_KEY = "interval";

// Initialize interval
if (localStorage.getItem(INTERVAL_KEY) === null) {
    localStorage.setItem(INTERVAL_KEY, 300);
    console.log("Create interval complete");
}

function get_interval() {
    return localStorage.getItem(INTERVAL_KEY);
}

function set_interval(new_interval) {
    localStorage.setItem(INTERVAL_KEY, new_interval)
}