/**
 * Created on: 27/12/15
 *     Author: Bobby Lin
 */

var base_url = "http://en.wikipedia.org/w/api.php?";
var format = "&format=json";
var callback = "&callback=?";

$(".search-box").keydown(function(e) {
    if (e.keyCode == 13) {
        $(".ui-menu-item").hide();
        $('.results li').remove();
        search(this.value);
        this.value = "";
    }
});

$(".search-box").keyup(function() {
    var keywords = this.value;
    var action = "action=opensearch";
    var search = "&search=" + keywords;
    var url = base_url + action + format + search + callback;
    $.getJSON(url, function(data) {
        var titles = data[1];
        $("#keywords").autocomplete({
            source: titles
        });
    })
});

function showRandom() {
    $('.results li').remove();
    var action = "action=query";
    var wiki_url_with_id = "https://en.wikipedia.org/wiki/?curid=";
    var generator = "&generator=random";
    var grnNameSpace = "&grnnamespace=0";
    var url = base_url + action + format + generator + grnNameSpace + callback;
    $.getJSON(url, function(data) {
        var key = Object.keys(data.query.pages)[0];
        var link = wiki_url_with_id + key;
        var title = data.query.pages[key].title;
        var html = "<li><a href='"+ link +"' target='_blank'>" + title + "</a></li>";
        $(".results").append(html);
    });
}

function search(keywords) {
    var action = "action=opensearch";
    var search = "&search=" + keywords;
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
