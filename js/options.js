// Find elements
var keywords_table = document.getElementById("keywords_table");
var new_keyword_text_field = document.getElementById("new_keyword_text_field");
var new_keyword_submit = document.getElementById("new_keyword_submit");

// Setup submit button listener
new_keyword_submit.onclick = function() {
    var i = keywords_table.rows.length;
    var new_keyword = new_keyword_text_field.value;
    add_keyword(new_keyword);
    insert_a_row(i, new_keyword);
};

/**
 * Init keywords table
 */
function init_keywords_table() {
    var keywords = get_keywords();
    for (var i = 0 ; i < keywords.length ; ++i) {
        insert_a_row(i, keywords[i])
    }
}

/**
 * Insert a row into keywords table
 * @param i {int} ith row in the table
 * @param keyword {String}
 */
function insert_a_row(i, keyword) {
    var new_row = keywords_table.insertRow(i);
    var keyword_cell = new_row.insertCell(0);
    keyword_cell.innerHTML = keyword;
}

init_keywords_table();