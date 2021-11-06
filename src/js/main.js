$(document).ready(function() {
  var $carousel = $(".menu");
  var elements = $carousel.find('.swiper-slide');
  var slides = elements.length;

  if (elements.length > 16) {
    slides = 16;
  }

  var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      freeMode: true,
      slidesPerView: slides,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
        draggable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        360: {
          slidesPerView: 4,
        },
        440: {
          slidesPerView: 5,
        },
        550: {
          slidesPerView: 6,
        },
        767: {
          slidesPerView: 7,
        },
        991: {
          slidesPerView: 10,
        },
        1199: {
          slidesPerView: 13,
        }
      }
    })

  var menuSlides = document.querySelector('.swiper-container').swiper;

  menuSlides.navigation.update();

  $('.swiper-button-next').on('click', function() {
    menuSlides.slideNext(300);

    return false;
  });
  $('.swiper-button-prev').on('click', function() {
    menuSlides.slidePrev(300);

    return false;
  });

  var notSlick = new Swiper ('.slick', {
      direction: 'horizontal',
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      autoplay: {
        delay: 3500,
      },
    })

  $('body').on('click', '.topalert__close', function() {
    $(this).parents('.topalert').removeClass('active');

    return false;
  });
})

var menu = document.getElementsByClassName("menus")[0];
var menu__container = document.getElementsByClassName("menus__container")[0];
var mm = document.getElementById("mobilemenu");
var bars = document.getElementById("bars");
var overlay = document.getElementsByClassName('mobilemenu__overlay')[0];
var clicked = true;

menu.addEventListener("click", activate);
function activate(e){
  e.preventDefault();

  if (clicked){
    bars.classList.add("animation");
    overlay.classList.add('active');
    menu__container.classList.add('active');
    mm.classList.add('active');
    clicked = false;
  } else {
    bars.classList.remove("animation");
    overlay.classList.remove('active');
    menu__container.classList.remove('active');
    mm.classList.remove('active');
    clicked = true;
  }
}
