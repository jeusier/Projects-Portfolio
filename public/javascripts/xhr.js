$(document).ready(function() {

    /*
    *  Listener to create new project
    */

    $('#create').on('submit', function(event) {
        event.preventDefault();
        $.ajax('/projects', {
            type: 'POST',
            data: $('#create').serialize(),
            success: function(data) {
                if (typeof data.redirect == 'string') {
                    window.location = data.redirect;
                }
            }
        });
    });
});