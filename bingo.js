if (window.location.hash) {
    window.location.href =
        window.location.protocol + '//' +
        window.location.host +
        (window.location.port ? ':' + window.location.port : '') +
        window.location.pathname;
}


$(document).ready(function() {

    function load_bingo(data) {
        var count = 0;
        for (var key in data) {
            var tmp = "";
            var selection = new Array();
            for(j=0; j<5;j++)
            {
                var is_in_selection = true;
                while(is_in_selection == true){
                    var tmp_index = Math.floor(Math.random()*(data[key].length));
                    if ($.inArray(tmp_index, selection) != -1)
                    {
                        is_in_selection = true;
                    }
                    else
                    {
                        is_in_selection = false;
                        selection[j]= tmp_index;
                    }
                }
            }

            for(i = 0; i<5; i++) {
                tmp += '<input type = "checkbox" name="'+ data[key][selection[i]].replace(/\s/g,"-") + '" class="custom" id="'+ data[key][selection[i]].replace(/\s/g,"-") + '"  /><label for="'+ data[key][selection[i]].replace(/\s/g,"-") + '">'+ data[key][selection[i]] + '</label>';
            }
            $("#firstlist").append('<li><a href="#show-'+key+'">'+ key + '</a></li>');
            $("body").append('<div data-role="page" data-url="show-'+key+'" id="show-'+key+'"><div data-role="header"><h1>'+ key +'</h1></div><div data-role="content">'+tmp+'</div></div>');
            $("#show-"+key+" input[type='checkbox']").change( function() {
                count++;
					
                // Bingo
                if(count>=5) {
                    $("audio").get(0).play();
                    alert("Du hast gewonnen");
                    window.location.reload(true);
                    count=0;
                }
            });
        }
        $('ul').listview('refresh');
    }

    // Getting actual Data

    if(window.navigator.onLine) {
        $.ajax({
            url: 'http://buzzwords.tladesignz.com/data.pl',
            dataType: 'jsonp',
            success: function(data) {
                localStorage.bullshit = JSON.stringify(data);
                console.log(localStorage.bullshit);
                load_bingo(JSON.parse(localStorage.bullshit));
            }
        });
    }

    load_bingo(JSON.parse(localStorage.bullshit));
});
