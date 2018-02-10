$(document).ready(function() {
    $('#scrape').on('click', function() {
        $.get('/articles/scrape', function(data) {
        }).done(function() {
            location.reload(true);
        });
    });
    $('#clear').on('click', function() {
        $.get('/articles/clear', function(data) {
        }).done(function() {
            location.reload(true);
        });
    });
    $(document).on('click', '.save-article', function() {
        let id = $(this).data('id');
        console.log(id);
        $.ajax(`/articles/save/${id}`, {method: "PUT"}, function(data) {
        }).done(function() {
            location.reload(true);
        });
    });
    $(document).on('click', '.unsave-article', function() {
        let id = $(this).data('id');
        console.log(id);
        $.ajax(`/articles/unsave/${id}`, {method: "PUT"}, function(data) {
        }).done(function() {
            location.reload(true);
        });
    });
    $(document).on('click', '.show-notes', function() {
        let id = $(this).data('id');
        $(`#${id}`).modal();
    });
    $(document).on('click', '.note-save', function() {
        let id = $(this).data('article-id');
        let note = $(this).parent()
            .siblings('.modal-body')
            .children('textarea').val().trim();
        $.post(`/articles/${id}`, {body: note})
            .done(function() {
                location.reload(true);
            });
    });
    $(document).on('click', '.note-delete', function() {
        let noteId = $(this).data('note-id');
        let articleId = $(this).parents('.modal-body')
            .siblings('.modal-footer')
            .children('.note-save').data('article-id');
        console.log('Note id: ' + noteId);
        console.log('Article id: ' + articleId);
        $.ajax(`articles/${articleId}/notes/${noteId}`, {method: 'PUT'})
            .done(function() {
                location.reload(true);
            });
    });
});