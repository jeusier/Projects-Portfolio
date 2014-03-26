 $(document).ready(function() {   

    $('.menus h3').on('click', function(event) {
        $(this).next('ul').toggleClass('open');
        event.preventDefault();
        return false;
    });
});