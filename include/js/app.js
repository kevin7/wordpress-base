(function($) {
  /*
  ** Mobile Helper
  */
	MBP.scaleFix();
	MBP.preventZoom();  
  
  var md = new MobileDetect(window.navigator.userAgent);
  
  
  /* 
  ** Header Logo Fade Effect & Sticky nav
  */
  var header = $('header .logo, header .sub');
  var range = 300;
  var menuInSticky = true;
  
  $(document).scroll(function () {
    
      var scrollTop = $(window).scrollTop();
    
      if ($(window).width() > 480) {
        
        var offset = header.offset().top;
        var height = header.outerHeight();
        offset = offset + height / 2;
        var calc = 1 - (scrollTop - offset + range) / range;

        header.css({ 'opacity': calc });

        if ( calc > '1' ) {
          header.css({ 'opacity': 1 });
        } else if ( calc < '0' ) {
          header.css({ 'opacity': 0 });
        }
      } else {
        header.css({ 'opacity': 1 });
      }
    
      if (menuInSticky) {
        
      } else {
        if (scrollTop < 20) {
          $('nav#top').removeClass('sticky');
        } else if (scrollTop > ($('header').height() - 180)) {
          $('nav#top').addClass('sticky');
        }        
      }
  });  
  
  /* 
  ** Mobile nav
  */  
  $('#mobile-nav').click(function () {
    
    var btn = $(this);
    var menu = $('#mobile-nav-overlay, #mobile-nav-sidebar');
    
    if (btn.hasClass('active')) {
      btn.removeClass('active');
      menu.removeClass('active');
      $('body').removeClass('mobile-no-scroll');
    } else {
      btn.addClass('active');
      menu.addClass('active');
      $('body').addClass('mobile-no-scroll');
    }
    return false;
  });
  
  $('#mobile-close').click(function () {
    $('#mobile-nav-overlay, #mobile-nav-sidebar, #mobile-nav').removeClass('active');
    $('body').removeClass('mobile-no-scroll');
    return false;
  });
  
  
  /*
  **
  */
  $(document).on('done.shuffle', function(event, shuffle) {
     $(function(){setTimeout(function(){
           shuffle.update() /* additional calculation*/
     }, 500)})
  });
  

  /* 
  ** Search
  */  
  $('.btn-search-show').click(function () {
    $('#search-overlay').addClass('search-active');
    return false;
  });
  
  $('.btn-search-close').click(function () {
    $('#search-overlay').removeClass('search-active');
    return false;
  });
  
  
  /* 
  ** Parallax Effect 
  */  
  
  if (!md.mobile() && !md.tablet()) {  
  
    $(window).on('scroll', function () {

      $('.parallax').each(function () {

        var speed = $(this).data('speed');
        var windowYOffset = window.pageYOffset,
            elBackgrounPos = "50% " + (windowYOffset * speed) + "px";

        $(this).css('backgroundPosition', elBackgrounPos);
      });

    });


    $(window).stellar({
      horizontalScrolling: false,
      responsive: true
    });
  }
  
  if ($('.aos').length) {
    AOS.init({
      duration: 800,
      offset: 200,
      once: true,
      disable: 'mobile'
    });
  }
  
  
  /* 
  ** Responsive video
  */
  $("body").fitVids();

  
  /* 
  ** Home: Product carousel
  */  
  if ($('#home-products').length) {
    $('#home-products .slider').slick({
      slide: '.slide',
      dots: false,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="icon-left-open-big"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="icon-right-open-big"></i></button>',
      infinite: true,
      adaptiveHeight: true,
      responsive: [
      {
        breakpoint:767,
        settings: {
          slidesToShow:2,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint:480,
        settings: {
          slidesToShow:1,
          arrows: false,
          dots: true
        }
      }        
      ]

    });
    
  }
  
  
  /* 
  ** Products: Product filtering
  */    
  if ($('#product-filter').length) {
    
    // Work Filter
    $('#product-filter-list').mixItUp({
      selectors: {
        target: '.product-wrapper',
        filter: '#product-filter .filter'
      }
    });

  }
  
  
  /* 
  ** Products: Equal height Product listing
  */      
  if ($('.product-equal-height').length) {    
    //setEqualHeight();
  }
  
  var resizeTimer;
  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      //setEqualHeight();
      
    }, 800);
  });
  
  function setEqualHeight() {
      var children = $('.product-equal-height .product');
      var max = 0;
      
      children.height('auto');
    
      children.each(function () {
        if ($(this).height() > max) {
          max = $(this).height();
        }
      });

      children.height(max);    
  }
  
  
  /*
  ** Recipes - ingredients grid
  */
  var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item'
  });  
  
  
  /*
  ** Refresh grid layout
  */
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    $grid.masonry();
  });  
  
})(jQuery);



