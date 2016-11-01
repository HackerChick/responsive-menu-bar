/*****************************************************************************************************************
 * Responsive Menu Bar
 *
 * Based off of code from the amazing CodyHouse (http://codyhouse.co)
 *****************************************************************************************************************/

var priorState = "";
var windowState = "";

jQuery( document ).ready( function( jQuery ){
  //move nav element position according to window width
  moveNavigation();

  jQuery( window ).on( 'resize', function(){
    (!window.requestAnimationFrame) ? setTimeout( moveNavigation, 300 ) : window.requestAnimationFrame( moveNavigation );
  } );

//  // hover over sub-menu in desktop to open it
//  jQuery( '.menu-item-has-children' ).on( 'mouseover', function( event ){
//    if( !isDesktop() ) return;
//    jQuery( '.navbar-menu' ).addClass( 'mobile-submenu-open' );
//
//    // clear out any other submenus that might be open
//    jQuery( '.menu-item-has-children' ).removeClass( 'is-open' );
//
//    // and mark this one as open
//    jQuery( this ).addClass( 'is-open' );
//  } );

  jQuery( '.menu-item-has-children' ).on( 'click', function( event ){
    if( isDesktop() ) return;

    jQuery( '.navbar-menu' ).addClass( 'mobile-submenu-open' );
    jQuery( this ).addClass( 'is-open' );

    event.preventDefault();
  } );

  // don't allow submenu items to trigger parent
  jQuery( '.menu-item-has-children ul' ).click( function( event ){
    event.stopPropagation();
  } );

  jQuery( '.return-to-parent-menu' ).on( 'click', function( event ){
    if( isDesktop() ) return;

    jQuery( '.navbar-menu' ).removeClass( 'mobile-submenu-open' );
    jQuery( '.menu-item-has-children' ).removeClass( 'is-open' );

    event.preventDefault();
  } );

  // mobile version - open/close navigation
  jQuery( '.mobile-menu-trigger' ).on( 'click', function( event ){
    event.preventDefault();

    // reset submenus
    jQuery( '.navbar-menu' ).removeClass( 'mobile-submenu-open' );
    jQuery( '.menu-item-has-children' ).removeClass( 'is-open' );

    jQuery( 'header' ).toggleClass( 'mobile-menu-is-open' );
    jQuery( '.navbar-menu' ).toggleClass( 'mobile-menu-is-open' );
    jQuery( '.navbar-spacer' ).toggleClass( 'mobile-menu-is-open' );
  } );

  // mobile version - go back to main navigation
  jQuery( '.return-to-parent-menu' ).on( 'click', function( event ){
    resetMenu( );
    event.preventDefault();
  } );

  function resetMenu( ){
    jQuery( '.navbar-menu' ).removeClass( 'mobile-submenu-open' );
    jQuery( '.menu-item-has-children' ).removeClass( 'is-open' );
  }

  function moveNavigation(){
    var navigation = jQuery( '.main-navigation' );
    if( isDesktop() ){
      //desktop screen - insert navigation inside header element
      navigation.detach();
      navigation.insertBefore( '.mobile-menu-trigger' );
    } else {
      //mobile screen - insert navigation after .navbar-spacer element
      navigation.detach();
      navigation.insertAfter( '.navbar-spacer' );
    }
  }

  function isDesktop(){
//    var priorState = windowState;

    windowState = window.getComputedStyle( document.querySelector( 'header' ), '::before' ).getPropertyValue( 'content' ).replace( /"/g, '' ).replace( /'/g, "" );

    // this is terrible to hide this logic in here, should move outside of this function
//    if( priorState != windowState ) resetMenu();

    return ( windowState == 'mobile' ) ? false : true;
  }
} );