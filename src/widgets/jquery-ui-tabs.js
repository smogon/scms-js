// jQuery UI's own tabs, on the element that asks for them.
//
//     <div id="tabs" data-ui-tabs>
//       <ul><li><a href="#one">One</a></li><li><a href="#two">Two</a></li></ul>
//       <div id="one">...</div>
//       <div id="two">...</div>
//     </div>
//
// The widget is jQuery UI's; all this says is which element gets it, which is
// the one thing the page it replaces said.

$(document).ready(function () {
    $('[data-ui-tabs]').tabs();
});
