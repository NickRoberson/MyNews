init();

function init() {
    searchArticles("bitcoin");
    searchNews("bitcoin");
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
            },
            error : function(request,error)
            {
                console.log("Request: "+JSON.stringify(request));
            }
        });
}