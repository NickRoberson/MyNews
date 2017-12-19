// data 
var articles = {};
var journals = {};

// call on page load
init();

// init function
function init() {
    searchArticles("bitcoin");
    searchNews("bitcoin");

    // toggle view 
    $('#click_trigger').click(function() {
        var classes = $('#fadein_view').attr("class");
        console.log(classes);
        if(classes == "dropdown-search") {
            $('#fadein_view').addClass("dropdown-search-hover").removeClass("dropdown-search");        
        } else {
            $('#fadein_view').addClass("dropdown-search").removeClass("dropdown-search-hover");        
        }
    });

    // perform search
    $('#search_btn').click(function() {
        var query = document.getElementById('search_text').value;
        console.log(query);
        if(query != "") {
            searchArticles(query);
        }
    });
}

function searchNews(query_string) {
    
    var call_url = "https://newsapi.org/v2/everything?q=" + query_string + "&apiKey=c0fa8e12254a46a1955e24800e9b9ff6";
    $.ajax({
            url : call_url,
            type : 'GET',
            data : {
            },
            success : function(data) {              
                console.log(data);
            },
            error : function(request,error)
            {
                console.log("Request: "+JSON.stringify(request));
            }
        });}

function searchArticles(query_string) {

    var call_url = "https://doaj.org/api/v1/search/articles/" + query_string + "?pageSize=100";
    $.ajax({
            url : call_url,
            type : 'GET',
            data : {
                'numberOfWords' : 10
            },
            success : function(data) {              
                console.log(data);
                var url = data.results[0].bibjson.link[0].url;
                console.log(url);
                if(url.includes(".pdf")) {
                    $('#media_body').html('<embed src="' + url + '" width="100%" height="100%" type="application/pdf">');
                } else {
                    $('#media_body').html('<iframe src="' + url + '" width="100%" height="100%">');
                }
                console.log(data);
                $("#list-results").html("");
                for (var i = 0; i < data.results.length; i++) {
                    $("#list-results").append("<li>" + data.results[i].bibjson.title + "</li>");
                }
            },
            error : function(request,error)
            {
                console.log("Request: "+JSON.stringify(request));
            }
        });

        
}

function addArticlesToList(items) {

}

function addNewsToList(items) {

}