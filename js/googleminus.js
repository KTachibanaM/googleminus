/*
 * Filter keywords on Google+ webpage and hide corresponding posts
 * Notice that current filtering mechanism is VERY ROUGH
 * Use with caution
 */

/**
 * Dump an object's properties
 * @param  {Object} obj [Any objects]
 */
function dump(obj) {
    for (var i in obj) {
        console.log(i + ": " + obj[i] + "\n");
    }
}

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
 * @returns {boolean}
 */
function scrutinize_post_div(keywords, post_div) {
	for (var i = 0 ; i < keywords.length ; ++i) {
		var keyword = keywords[i];
		if (my_contains(post_div.outerText, keyword)) {
			return true;
		}
	}
	return false;
}

/**
 * Eliminate the post div
 * @param {HTMLDivElement} post_div
 */
function eliminate_post_div(post_div) {
    post_div.innerHTML = "<div>Filtered</div>";
}

/**
 * Vulnerable class names
 */
var STREAM_DIV_CLASS_NAME = "pga";
var POST_DIV_CLASS_NAME = "Yp yt Xa";
var ON_HOVER_POST_DIV_CLASS_NAME = "Yp yt Xa va";

/**
 * Main function
 * @param {Array} keywords
 */
function filter(keywords) {
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
    for (var i = 0 ; i < all_post_divs.length ; ++i) {
        var post_div = all_post_divs[i];
        if (scrutinize_post_div(keywords, post_div)) {
            console.log("Caught one!");
            eliminate_post_div(post_div);
        }
    }
}