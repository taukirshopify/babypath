;(function($) {
    "use strict";
    // niceSelect============

    //* Navbar Fixed  
    function navbarFixed(){
        if ( $('.fast-header-area').length ){
            $(window).on('scroll', function() {
                var scroll = $(window).scrollTop();   
                if (scroll >=150) {
                    $(".fast-header-area").addClass("navbar-fixed").fadeIn();
                } else {
                    $(".fast-header-area").removeClass("navbar-fixed");
                }
            });
        };
    };  
    // Mobile menu/
    $("button#menu-opener").on('click', function () {
        $(".sidebar-menus").addClass("active");
    });
    $(".remove-one").on('click', function () {
        $(".sidebar-menus").removeClass("active");
    });
    $(" button.simple-icon.searchBoxToggler").on('click', function () {
        $(".popup-search-box").addClass("show");
    });

    if($('.mobile-menu li.dropdown ul').length){

        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {

        

            //  if ( $('.mobile-menu li.dropdown ul').css("display") === "block")
            //     {
            //         $('.mobile-menu  ul li ul').slideUp();
            //     }

            $(this).prev('ul').slideToggle(500);
            $(this).toggleClass("minous");
        });
    }  
    // Scroll to top
    function scrollToTop() {
        if ($('.back-to-top').length) {  
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 100) {
                    $('.back-to-top').fadeIn();
                } else {
                    $('.back-to-top').fadeOut();
                }
            }); 
            //Click event to scroll to top
            $('.back-to-top').on('click', function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
                return false;
            });
        }
    };




    // index hero slider


    // background-image
    function bgImg() {
        $("[data-background]").each(function() {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });
    }

    // search btn 
     // Menu Search from 
     $(".js-search-dropdown-toggle").on("click", function () {
        $(".mnmd-search-full").toggleClass("On");
    });
    $("button.searchClose").on("click", function () {
        $("div#popupfooter").removeClass("show");
    });
     
     
    $('.dropdown > .caption').on('click', function() {
        $(this).parent().toggleClass('open');
    });

    $('.dropdown > .list > .item').on('click', function() {
        $('.dropdown > .list > .item').removeClass('selected');
        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').html($(this).html());

        if ($(this).data("item") == "RUB") {
            console.log('RUB');
        } else if ($(this).data("item") == "UAH") {
            console.log('UAH');
        } else {
            console.log('USD');
        }
    });

    $(document).on('keyup', function(evt) {
        if ((evt.keyCode || evt.which) === 27) {
            $('.dropdown').removeClass('open');
        }
    });

    $(document).on('click', function(evt) {
        if ($(evt.target).closest(".dropdown > .caption").length === 0) {
            $('.dropdown').removeClass('open');
        }
    });


    // // sidebar_menu All Page/

    $("section, .remove-one").on('click', function () {
        $(".sidebar-menus, .remove-one").removeClass("active");
    });
    
    // if($('.mobile-menu li.dropdown ul').length){
    //     $('.mobile-menu li.dropdown').append('<div class="dropdown-btn">+</div>');
    //     $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
    //         $(this).prev('ul').slideToggle(500);
    //         $(this).toggleClass('d-btn-active');
    //     });
    // };
    // footer collapse======
    $('.cl-item:not(.cl-item-no-sub) > .cl-label-wrap .cl-label-title').click(function() {
        $(this).parent().parent().toggleClass('cl-item-open');
    });
    $('.cl-item:not(.cl-item-no-sub) > .cl-label-wrap .cl-label-icon').click(function() {
        $(this).parent().parent().toggleClass('cl-item-open');
    })
    
    $('.cl-item').each(function(){
        if ( $(this).find('> ul').length === 0 ) {
            $(this).addClass('cl-item-no-sub');
        }
    })

    // home page justin slider tab js======
    $(document).ready(function(){
        $(".nav-tabs button").click(function(){
          $(this).tab('show');
        });
    });

    /*Function Calls*/  
    scrollToTop();
    navbarFixed ();   
    bgImg();  
})(jQuery);

    // sidebar_menu All Page/
    $(".sidebar-card").on('click', function () {
        $(".main-card-area").addClass("active");
    });
    $("#cartDrawyerOpener,a#cartDrawyerOpener,p#cartDrawyerOpener").on('click', function () {
        $('.main-card-area').addClass('active');
    });
    $(".main-card-remove").on('click', function () {
        $(".main-card-area").removeClass("active");
    });


    // $("button.quantity__button").on('click', function () {
    //     setTimeout(function() {
    //         $( "#update" ).trigger( "click" );
    //      }, 500);
    // });


      $('.add_to_cart_form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          dataType: 'json',
          data: {
            quantity: 1,
            id: $(this).find('.addcart__buttonwrap').data("id")
          },
          success: function(data) {
            $('.main-card-area').addClass('active');
           
            setTimeout(() => {
                get_cart_details();
              }, 90);
          },
          error: function(data) {
            console.log("No data is found");
         }
        });
      });
    
    
      function get_cart_details() {
        fetch("/?section_id=cart-drawyer").then((response) => response.text() ).then((cartData) => {
          var cart_html = $(cartData);

     
          var cart_items = $(".product_items_subwrapper", cart_html);

          var cart_count = $(".cart-drawer__count", cart_html);

            //console.log(cart_count);
            //$("#cartDrawyerOpener .cart-count").append(cart_count);
      
          var cart_subtotal = $(".cart-drawer__total-amount", cart_html);
 
           var cartData2 = JSON.parse(cart_items); 
 console.log(cartData2);
         
          if ($(".product_items_empt_subwrapper")[0]){

             $(".product_items_empt_subwrapper").empty();
             $(".product_items_empt_subwrapper").append(cart_items);
           
            $(".main-card-btn").removeClass('d-none');
            $(".empty_cart_msg").addClass('d-none');

        } else {
            $(".product_items_subwrapper").replaceWith(cart_items);
        }

          
          $('.cart-drawer__count').replaceWith(cart_count);
          $('.cart-drawer__total-amount').replaceWith(cart_subtotal);
        });
      };


      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };



      //Cart Remove Button Function
      $(document).on("click", ".cart-drawer__remove-url", function (e) {
        e.preventDefault();
        var variant_id = $(this).attr('data-id');
        // console.log(variant_id);
        var data = { updates: {} };
        data.updates[variant_id] = '0';
            jQuery.ajax({
                type: "POST",
                url: "/cart/update.js",
                data: data,
                dataType: "json",
                success: function (e) {
                    
                    // console.log(e), console.log(e.items_subtotal_price), (product_total_price = e.items_subtotal_price);
                    e.items;
                    var t = e.total_price;
                    t /= 100;
                    var i = e.item_count;
                    if( i < 1 ){
                      $('.cart-drawer__footer').addClass('hidden');
                      
                      $('.cart-drawer__header-info').attr('hidden',true);
                      $('.cart-drawer__header').append('<div class="empty_cart_msg">Your Cart is Empty!</div>');
                    };
                    0 == i ? $(".cart-drawer__no-item").addClass("cart-drawer__no-item_visible") : $(".cart-drawer__no-item").removeClass("cart-drawer__no-item_visible"),
                        $(".cart-drawer__count").html(i),
                        $(".nav__cart-count").html(i),
                        emptystateshow(),
                        $(".cart-drawer__total-amount").html(get_currency+ numberWithCommas(t.toFixed(2))),
                        i <= 0 && $(".my__custom_cart_drawer").addClass("no_item");
                },
            }),
            $(this).parent().parent().parent().parent().remove();
      });



      //Update Quantity
      function change_qty(e) {
  
        var o = $(e).attr("data-id"),
            t = $(e).val(),
            i = {
                updates: {},
            };
        (i.updates[o] = t),
            jQuery.ajax({
                type: "POST",
                url: "/cart/update.js",
                data: $('.drawer_form').serialize(),
                dataType: "json",
                success: function (e) {
                    console.log(e.items_subtotal_price), (product_total_price = e.items_subtotal_price);
                    var t = e.items;
                    console.log(e);
                    var i = e.total_price;
                    i /= 100;
                    var n = e.item_count;
                    if( n < 1 ){
                      $('.cart-drawer__footer').addClass('hidden');
                      $('.cart-drawer__header-info').attr('hidden',true);
                      $('.cart-drawer__header').append('<div class="empty_cart_msg">Your Cart is Empty!</div>');
                    };
                    0 == n ? $(".cart-drawer__no-item").addClass("cart-drawer__no-item_visible") : $(".cart-drawer__no-item").removeClass("cart-drawer__no-item_visible"),
                        $(".cart-drawer__count").html(n),
                       
                        $(".nav__cart-count").html(n),
                        $(".cart-drawer__total-amount").html(get_currency+ numberWithCommas(i.toFixed(2))),
                        jQuery.each(t, function (e, t) {
                            var i = t.final_line_price;
                            (i /= 100), t.key == o && $(".cart-drawer__price[data-id='" + t.key + "']").html(get_currency+ numberWithCommas(i.toFixed(2)));
                        });
                },
            });

           
      };
      
      //Increase Button
      $(document).on("click", ".minus-btn", function (e) {
        e.preventDefault();
        var t = $(this).closest("div").find("input"),
            i = parseInt(t.val());
        1 < i ? --i : ((i = 1), $(this).attr('disabled',true)), t.val(i), change_qty(t);
      });

      //Decrease Button
      $(document).on("click", ".plus-btn", function (e) {
        e.preventDefault();
        var t = $(this).closest("div").find("input"),
            i = parseInt(t.val());
        i < 100 ? (i += 1) : (i = 100), t.val(i),$('.minus-btn').attr('disabled',false), change_qty(t);
      });
      


     function emptystateshow(){
      
         let elemnetcount =  $('.cart-drawer__count').text();
        if(elemnetcount <= 0 && $(".product_items_empt_subwrapper")[0]){
            
            $(".empty_cart_msg").removeClass('d-none');
        } else if(elemnetcount <= 0 && $(".product_items_subwrapper")[0] ) {
            $(".main-card-btn").addClass('d-none');
            $(".empty_cart_msg").removeClass('d-none');
        } else if(elemnetcount > 1 && $(".product_items_subwrapper")[0] ) {
         
            $(".empty_cart_msg").addClass('d-none');
        }
     }