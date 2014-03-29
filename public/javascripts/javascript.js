 $(document).ready(function() {

    /*
    *  Listener to toggle class on menu headers
    */

    $('.menus h3').on('click', function(event) {
        $(this).next('ul').toggleClass('open');
        $(this).children('span').toggleClass('open');
        event.preventDefault();
        return false;
    });

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
    *  Listener to create new skill
    */

    $('#create-skill').on('submit', function(event) {
        event.preventDefault();
        $.ajax('/about/add-skill', {
            type: 'POST',
            data: $('#create-skill').serialize(),
            success: function(data) {
                if (typeof data.redirect == 'string') {
                    console.log("hello");
                    window.location = data.redirect;
                }
            }
        });
    });


    /*
    *  Listener to create new experience
    */

    $('#create-experience').on('submit', function(event) {
        event.preventDefault();
        $.ajax('/about/add-experience', {
            type: 'POST',
            data: $('#create-experience').serialize(),
            success: function(data) {
                if (typeof data.redirect == 'string') {
                    window.location = data.redirect;
                }
            }
        });
    });

    /*
    *  Listener to create new education
    */

    $('#create-education').on('submit', function(event) {
        event.preventDefault();
        $.ajax('/about/add-education', {
            type: 'POST',
            data: $('#create-education').serialize(),
            success: function(data) {
                if (typeof data.redirect == 'string') {
                    window.location = data.redirect;
                }
            }
        });
    });

    /*
    *  Listener to create new project
    */

    $('#create-blog').on('submit', function(event) {
        event.preventDefault();
        $.ajax('/blogs', {
            type: 'POST',
            data: $('#create-blog').serialize(),
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
            success: function(data) {
                if (typeof data.redirect == 'string') {
                    window.location = data.redirect;
                }
            },
            error: function(result) {
                $('#error').addClass("error");
                $('#error').html(result.responseText);
            }
        });
    });


});