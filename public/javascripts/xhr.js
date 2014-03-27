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

    /*
    *  Listener to authenticate login
    */

    $('#login').on('submit', function(event) {
        event.preventDefault();
        $.ajax('/login', {
            type: 'POST',
            data: $('#login').serialize(),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                if (typeof data.redirect == 'string') {
                    window.location = data.redirect;
                }
            },
            error: function(result) {
                console.log(result);
                $('#error').addClass("error");
                $('#error').html(result.responseText);
            }
        });
    });

    /*
    *  Listener to logout
    */

    $('#logout').click(function(event) {
        event.preventDefault();
        $.ajax('/logout', {
            method: 'GET',
            data: $('#logout').serialize(),
            success: function(data) {
                if (typeof data.redirect == 'string') {
                    window.location = data.redirect;
                }
            }
        });
    });


});