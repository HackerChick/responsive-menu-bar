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

    //mobile version - open/close navigation
    $('.cd-nav-trigger').on('click', function (event) {
        console.log("mobile menu (.cd-nav-trigger) clicked");
        event.preventDefault();
        if ($('header').hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');

        $('header').toggleClass('nav-is-visible');
        $('.cd-main-nav').toggleClass('nav-is-visible');
        $('.cd-main-content').toggleClass('nav-is-visible');
    });

    //mobile version - go back to main navigation
    $('.go-back').on('click', function (event) {
        console.log("Return from subnav (.go-back) clicked");
        event.preventDefault();
        $('.cd-main-nav').removeClass('moves-out');
    });

    //open sub-navigation
    $('.cd-subnav-trigger').on('click', function(event){
        console.log("Sub-Navigation (.cd-subnav-trigger) clicked");
        event.preventDefault();
        $('.cd-main-nav').toggleClass('moves-out');
    });


    function moveNavigation() {
        console.log("moveNavigation");
        var navigation = $('.main-navigation');
        var screenSize = checkWindowWidth();
        if (screenSize) {
            //desktop screen - insert navigation inside header element
            navigation.detach();
            navigation.insertBefore('.cd-nav-trigger');
        } else {
            //mobile screen - insert navigation after .cd-main-content element
            navigation.detach();
            navigation.insertAfter('.cd-main-content');
        }
    }

    function checkWindowWidth() {
        console.log("checkWindowWidth");
        var mq = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
        return ( mq == 'mobile' ) ? false : true;
    }
});