/*****************************************************************************************************************
 * Responsive Menu Bar
 *
 * Based off of code from the amazing CodyHouse (http://codyhouse.co)
 *****************************************************************************************************************/

jQuery(document).ready(function ($) {
    console.log("document ready");
    //move nav element position according to window width
    moveNavigation();

    $(window).on('resize', function () {
        console.log("windows resize");
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    // open sub-menu
    $('.navbar-submenu-trigger').on('click', function(event){
        console.log("Sub-Navigation (.navbar-submenu-trigger) clicked");
        event.preventDefault();
        $('.navbar-menu').toggleClass('moves-out');
    });

    // mobile version - open/close navigation
    $('.mobile-menu-trigger').on('click', function (event) {
        console.log("mobile menu (.mobile-menu-trigger) clicked");
        event.preventDefault();
        if ($('header').hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');

        $('header').toggleClass('nav-is-visible');
        $('.navbar-menu').toggleClass('nav-is-visible');
        $('.navbar-spacer').toggleClass('nav-is-visible');
    });

    // mobile version - go back to main navigation
    $('.go-back').on('click', function (event) {
        console.log("Return from subnav (.go-back) clicked");
        event.preventDefault();
        $('.navbar-menu').removeClass('moves-out');
    });

    function moveNavigation() {
        console.log("moveNavigation");
        var navigation = $('.main-navigation');
        var screenSize = checkWindowWidth();
        if (screenSize) {
            //desktop screen - insert navigation inside header element
            navigation.detach();
            navigation.insertBefore('.mobile-menu-trigger');
        } else {
            //mobile screen - insert navigation after .navbar-spacer element
            navigation.detach();
            navigation.insertAfter('.navbar-spacer');
        }
    }

    function checkWindowWidth() {
        console.log("checkWindowWidth");
        var mq = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
        return ( mq == 'mobile' ) ? false : true;
    }
});