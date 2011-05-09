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
                    tmp += '<input type = "checkbox" name="'+ data[key][i] + '" class="custom" id="'+ data[key][i] + '"  /><label for="'+ data[key][i] + '">'+ data[key][i] + '</label>';
                }
                $("#firstlist").append('<li><a href="#">'+ key + '</a><div data-role="fieldcontain">'+tmp + '</div></li>');
            }
            $('ul').listview('refresh');
        }
    });
});
