$(function () {
    $('#menu').load('../menu.html');
    $('#footer').load('../footer.html');

    $('.btn-saibamais').click(function() {
        window.location.href = "funcionalidades.html"
    });

    $('.btn-scroll').click( function(e) {
        e.preventDefault();
        scrollTo($(this).attr('destiny'));
    });
    
    $('.btn-video').click(function() {
        
    });
});

function scrollTo(destiny) {
    $('html, body').animate({
        scrollTop: $('#' + destiny).offset().top
    }, 'slow');
}