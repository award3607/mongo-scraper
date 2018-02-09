$(document).ready(function() {
    $('#scrape').on('click', function() {
        $.get('/api/scrape', function(data) {
            location.reload(true);
        });
    });
});