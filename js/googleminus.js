/*
 * Filter keywords on Google+ web page and hide corresponding posts
 * Modes:
 * (1) all_out
 *     i. default to completely wipe out the post
 *     ii. parameter "mercy" to show post link
 * (2) blacken_keywords
 *     i. default to black out the keyword
 * (3) replace_keywords
 *     i. default to replace the keyword with parameter
 * (4) auto_ignore
 *     i. default to simulate "ignore this post" click
 */

/**
 * Vulnerable class names
 */
const STREAM_DIV_CLASS_NAME = "pga";
const POST_DIV_CLASS_NAME = "Yp yt Xa";
const ON_HOVER_POST_DIV_CLASS_NAME = "Yp yt Xa va";
const POST_LINK_IN_TIME_SPAN_CLASS_NAME = "o-U-s FI Rg";
const POST_OPTIONS_SPAN_CLASS_NAME = "d-s xw if";
const POST_OPTION_IGNORE_THIS_POST_DIV_CLASS_NAME = "d-A G3";

/**
 * A keyword configuration
 * @param {String} keyword
 * @param {String} filtering_mode
 * @param {String} param
 * @constructor
 */
function KeywordConfig(keyword, filtering_mode, param) {
    this.keyword = keyword;
    this.filtering_mode = filtering_mode;
    this.param = param
}

const FILTERING_MODES = ["all_out", "blacken_keywords", "replace_keywords"];
const DEFAULT_FILTERING_MODE = FILTERING_MODES[0];

/**
 * Append one array to another
 * @param  {Array} arr1 Array to be appended
 * @param  {Array} arr2 Array appended
 */
function my_append(arr1, arr2) {
	for (var i = 0 ; i < arr2.length ; ++i) {
		arr1.push(arr2[i]);
	}
}

/**
 * Whether one string contains another substring
 * @param  {String} str1 The string
 * @param  {String} str2 Substring
 * @return {boolean}
 */
function my_contains(str1, str2) {
	return str1.indexOf(str2) > -1;
}

/**
 * Whether a post div contains keyword
 * @param   {Array} keywords
 * @param   {HTMLDivElement} post_div
 * @returns {String} keyword being caught
 */
function scrutinize_post_div(keywords, post_div) {
	for (var i = 0 ; i < keywords.length ; ++i) {
		var keyword = keywords[i];
		if (my_contains(post_div.outerText, keyword)) {
			return keyword;
		}
	}
	return null;
}

/**
 * Wipe the post div out of stream completely
 * @param {HTMLDivElement} post_div
 * @param {String} keyword
 * @param {String} param
 */
function all_out(post_div, keyword, param) {
    if (param === "mercy") {
        var post_link = post_div.getElementsByClassName(POST_LINK_IN_TIME_SPAN_CLASS_NAME)[0].href;
        post_div.innerHTML = "<div><a href='" + post_link + "'>Filtered</a></div>"
    }
    else
    {
        post_div.innerHTML = "";
    }
}

/**
 * Replace keyword with black square in post div
 * @param {HTMLDivElement} post_div
 * @param {Array} keyword
 * @param {String} param
 */
function blacken_keywords(post_div, keyword, param) {
    var regex = new RegExp(keyword, "g");
    var replacement = new Array(keyword.length + 1).join("█");

    // Replace the keyword
    var raw_html = post_div.innerHTML;
    post_div.innerHTML = raw_html.replace(regex, replacement);
}

/**
 * Replace keyword with param
 * @param {HTMLDivElement} post_div
 * @param {Array} keyword
 * @param {String} param
 */
function replace_keywords(post_div, keyword, param) {
    var regex = new RegExp(keyword, "g");

    // Replace the keyword
    var raw_html = post_div.innerHTML;
    post_div.innerHTML = raw_html.replace(regex, param);
}

/**
 * Simulate "ignore this post" click
 * @param {HTMLDivElement} post_div
 * @param {Array} keyword
 * @param {String} param
 */
function auto_ignore(post_div, keyword, param) {
    var options_span = post_div.getElementsByClassName(POST_OPTIONS_SPAN_CLASS_NAME)[0];
    options_span.click();
    setTimeout(function() {
        console.log("triggered");
        var ignore_this_post_div = post_div.getElementsByClassName(POST_OPTION_IGNORE_THIS_POST_DIV_CLASS_NAME)[0];
        ignore_this_post_div.click();
    }, 3000);
}

/**
 * Main function
 * @param {Array} keyword_configs
 */
function filter(keyword_configs) {
    // Find stream div
    var stream_div = document.getElementsByClassName(STREAM_DIV_CLASS_NAME)[0];

    // Find post divs
    var post_divs = stream_div.getElementsByClassName(POST_DIV_CLASS_NAME);
    var on_hover_post_divs = stream_div.getElementsByClassName(ON_HOVER_POST_DIV_CLASS_NAME);

    // Add all post divs
    var all_post_divs = [];
    my_append(all_post_divs, post_divs);
    my_append(all_post_divs, on_hover_post_divs);

    // Filter
    var keyword_set = keyword_configs.map(function(config) {
        return config.keyword;
    });
    all_post_divs.forEach(function (post_div) {
        var keyword_caught = scrutinize_post_div(keyword_set, post_div);
        if (keyword_caught !== null) {
            var config_caught = keyword_configs.filter(function(config) {
                return config.keyword === keyword_caught;
            })[0];
            var filtering_mode_caught = config_caught.filtering_mode;
            var param_caught = config_caught.param;
            console.log("[googleminus] Caught " + keyword_caught + ", executing mode " + filtering_mode_caught + " with param " + param_caught);
            window[filtering_mode_caught](post_div, keyword_caught, param_caught);
        }
    })
}