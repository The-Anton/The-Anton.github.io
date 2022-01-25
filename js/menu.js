$(function () {
  $(".clickEvent").click(function (e) {
    e.preventDefault();
    $(".sub-menu-overlay").toggleClass("open");
    $(".sub-menu").toggleClass("open");
    $("body").toggleClass("cover");
    
  });

  $('#skill-sec-link').click(function(){
    $(document).scrollTop(1000)
    });

});

