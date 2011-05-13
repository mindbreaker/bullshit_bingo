if (window.location.hash) {
    window.location.href =
        window.location.protocol +
        window.location.port + '//' +
        window.location.host +
        window.location.pathname;
}

$(document).ready(function() {
    $.ajax({
        url: 'http://buzzwords.tladesignz.com/data.pl',
        dataType: 'jsonp',
        success: function(data, status, xhr ) {
            //console.log(data);
            for (var key in data) {
                var tmp = "";

                for(i = 0; i<data[key].length; i++) {
                    tmp += '<input type = "checkbox" name="'+ data[key][i].replace(/\s/g,"-") + '" class="custom" id="'+ data[key][i].replace(/\s/g,"-") + '"  /><label for="'+ data[key][i].replace(/\s/g,"-") + '">'+ data[key][i] + '</label>';
                }
                $("#firstlist").append('<li><a href="#show-'+key+'">'+ key + '</a></li>');
				$("body").append('<div data-role="page" data-url="show-'+key+'"><div data-role="header"><h1>'+ key +'</h1></div><div data-role="content">'+tmp+'</div></div>');
				//$("#firstlist").append('<li><a href="#">'+ key + '</a><div data-role="fieldcontain">'+tmp + '</div></li>');
            }
            $('ul').listview('refresh');
        }
    });
});
