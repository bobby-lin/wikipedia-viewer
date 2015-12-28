/**
 * Created on: 27/12/15
 *     Author: Bobby Lin
 */

$(".search-box").keydown(function(e) {
    if (e.keyCode == 13) {
        search(this.value);
    }
});

function search(keywords) {
    var base_url = "http://en.wikipedia.org/w/api.php?";
    var action = "action=opensearch";
    var format = "&format=json";
    var search = "&search=" + keywords;
    var callback = "&callback=?";
    var url = base_url + action + format + search + callback;
    $.getJSON(url, function(data) {
        var titles = data[1];
        var links = data[3];
        var html = "";
        for(var i = 0; i <titles.length; i++) {
            html = "<li><a href='"+ links[i] +"' target='_blank'>" + titles[i] + "</a></li>";
            $(".results").append(html);
        }
    })
}

function auto_suggest(e) {
    // To Do
}
