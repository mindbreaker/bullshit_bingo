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
			var count = 0;
            for (var key in data) {
                var tmp = "";

                for(i = 0; i<data[key].length; i++) {
                    tmp += '<input type = "checkbox" name="'+ data[key][i].replace(/\s/g,"-") + '" class="custom" id="'+ data[key][i].replace(/\s/g,"-") + '"  /><label for="'+ data[key][i].replace(/\s/g,"-") + '">'+ data[key][i] + '</label>';
                }
                $("#firstlist").append('<li><a href="#show-'+key+'">'+ key + '</a></li>');
				$("body").append('<div data-role="page" data-url="show-'+key+'" id="show-'+key+'"><div data-role="header"><h1>'+ key +'</h1></div><div data-role="content">'+tmp+'</div></div>');
				//$("#firstlist").append('<li><a href="#">'+ key + '</a><div data-role="fieldcontain">'+tmp + '</div></li>');
				$("#show-"+key+" input[type='checkbox']").change( function(el) {
					count++;
					
					// Bingo
					if(count>=5) {
						$("audio").get(0).play();
						alert("Du hast gewonnen");
						count=0;
					}
				});
            }
            $('ul').listview('refresh');
        }
    });
});
