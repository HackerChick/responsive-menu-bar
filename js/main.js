/*****************************************************************************************************************
 * Responsive Menu Bar
 *
 * Based off of code from the amazing CodyHouse (http://codyhouse.co)
 *****************************************************************************************************************/

jQuery( document ).ready( function( jQuery ){

  // SWITCH BETWEEN MOBILE MENU AND DESKTOP MENU
  // ===========================================
  moveNavigation();

  jQuery( window ).on( 'resize', function(){
    (!window.requestAnimationFrame) ? setTimeout( moveNavigation, 300 ) : window.requestAnimationFrame( moveNavigation );
  } );

  function moveNavigation(){
    var navigation = jQuery( '.main-navigation' );

    if( isDesktopMenu() ){
      //desktop screen - insert navigation inside header element
      navigation.detach();
      navigation.insertBefore( '.mobile-menu-trigger' );
    } else {
      //mobile screen - insert navigation after .navbar-spacer element
      navigation.detach();
      navigation.insertAfter( '.navbar-spacer' );
    }
  }

  // END: SWITCH BETWEEN MOBILE MENU AND DESKTOP MENU


  // MOBILE MENU
  // ===========
  // toggle mobile menu open/closed
  jQuery( '.mobile-menu-trigger' ).on( 'click', function( event ){
    event.preventDefault();

    closeSubmenus();
    toggleMobileMenu( );
  } );


  // click a menu item that has children...
  jQuery( '.menu-item-has-children' ).on( 'click', function( event ){
    if( isDesktopMenu() ) return;

    openSubmenu( this );
    event.preventDefault();
  } );

  // don't allow child items to trigger parent's onclick handler
  jQuery( '.menu-item-has-children ul' ).click( function( event ){ event.stopPropagation(); } );

  // click out of submenu to return to parent...
  jQuery( '.return-to-parent-menu' ).on( 'click', function( event ){
    if( isDesktopMenu() ) return;

    closeSubmenus();
    event.preventDefault();
  } );


  function closeSubmenus(){
    jQuery( '.navbar-menu' ).removeClass( 'mobile-submenu-open' );
    jQuery( '.menu-item-has-children' ).removeClass( 'is-open' );
  }

  function openSubmenu( submenu ){
    jQuery( '.navbar-menu' ).addClass( 'mobile-submenu-open' );
    jQuery( submenu ).addClass( 'is-open' );
  }

  function toggleMobileMenu( ){
    jQuery( 'header' ).toggleClass( 'mobile-menu-is-open' );
    jQuery( '.navbar-menu' ).toggleClass( 'mobile-menu-is-open' );
    jQuery( '.navbar-spacer' ).toggleClass( 'mobile-menu-is-open' );
  }
  // END: MOBILE MENU

  function isDesktopMenu(){
    menuStyle = window.getComputedStyle( document.querySelector( 'header' ), '::before' ).
                       getPropertyValue( 'content' ).replace( /"/g, '' ).replace( /'/g, "" );
    return ( menuStyle == 'desktop' );
  }
} );