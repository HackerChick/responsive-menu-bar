/*****************************************************************************************************************
 * Responsive Menu Bar
 *
 * Based off of code from the amazing CodyHouse (http://codyhouse.co)
 *****************************************************************************************************************/

jQuery(document).ready(function (jQuery) {
    console.log("document ready");
    //move nav element position according to window width
    moveNavigation();

    jQuery(window).on('resize', function () {
        console.log("windows resize");
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });
    

    // open sub-menu
    jQuery('.menu-item-has-children a').on('click', function(event){
        console.log("Sub-Navigation (.menu-item-has-chidren a) clicked");
        event.preventDefault();
        jQuery('.navbar-menu').toggleClass('submenu-open');
    });

    // mobile version - open/close navigation
    jQuery('.mobile-menu-trigger').on('click', function (event) {
        console.log("mobile menu (.mobile-menu-trigger) clicked");
        event.preventDefault();
        if (jQuery('header').hasClass('mobile-menu-is-open')) jQuery('.submenu-open').removeClass('submenu-open');

        jQuery('header').toggleClass('mobile-menu-is-open');
        jQuery('.navbar-menu').toggleClass('mobile-menu-is-open');
        jQuery('.navbar-spacer').toggleClass('mobile-menu-is-open');
    });

    // mobile version - go back to main navigation
    jQuery('.return-to-parent-menu').on('click', function (event) {
        console.log("Return from subnav (.return-to-parent-menu) clicked");
        event.preventDefault();
        jQuery('.navbar-menu').removeClass('submenu-open');
    });

    function moveNavigation() {
        console.log("moveNavigation");
        var navigation = jQuery('.main-navigation');
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
        var windowSize = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
        return ( windowSize == 'mobile' ) ? false : true;
    }
});