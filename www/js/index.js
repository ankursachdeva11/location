$.mobile.document
    // "filter-menu-menu" is the ID generated for the listview when it is created
    // by the custom selectmenu plugin. Upon creation of the listview widget we
    // want to prepend an input field to the list to be used for a filter.
    .on( "listviewcreate", "#filter-menu-menu", function( e ) {
        var input,
            listbox = $( "#filter-menu-listbox" ),
            form = listbox.jqmData( "filter-form" ),
            listview = $( e.target );
        // We store the generated form in a variable attached to the popup so we
        // avoid creating a second form/input field when the listview is
        // destroyed/rebuilt during a refresh.
        if ( !form ) {
            input = $( "<input data-type='search'></input>" );
            form = $( "<form></form>" ).append( input );
            input.textinput();
            $( "#filter-menu-listbox" )
                .prepend( form )
                .jqmData( "filter-form", form );
        }
        // Instantiate a filterable widget on the newly created listview and
        // indicate that the generated input is to be used for the filtering.
        listview.filterable({ input: input });
    })
    // The custom select list may show up as either a popup or a dialog,
    // depending how much vertical room there is on the screen. If it shows up
    // as a dialog, then the form containing the filter input field must be
    // transferred to the dialog so that the user can continue to use it for
    // filtering list items.
    //
    // After the dialog is closed, the form containing the filter input is
    // transferred back into the popup.
    .on( "pagebeforeshow pagehide", "#filter-menu-dialog", function( e ) {
        var form = $( "#filter-menu-listbox" ).jqmData( "filter-form" ),
            placeInDialog = ( e.type === "pagebeforeshow" ),
            destination = placeInDialog ? $( e.target ).find( ".ui-content" ) : $( "#filter-menu-listbox" );
        form
            .find( "input" )
            // Turn off the "inset" option when the filter input is inside a dialog
            // and turn it back on when it is placed back inside the popup, because
            // it looks better that way.
            .textinput( "option", "inset", !placeInDialog )
            .end()
            .prependTo( destination );
    });


var x = document.getElementById("data");

function getLocation() {
   
    if (navigator.geolocation) {
       // navigator.geolocation.getCurrentPosition(showPosition);
        watchID = navigator.geolocation.watchPosition(showPosition, positionError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
   /* x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;  
*/
    var latlng = position.coords.latitude+","+position.coords.longitude;

    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key=AIzaSyCDvE8cokB84mohWmPJz83A6ugZ82785Ys&sensor=false";
    console.log(url);
    $.getJSON(url, function (data) {
        //for(var i=0;i<data.results.length;i++) {
            var adress = data.results[0].formatted_address;
            if(jQuery.trim(adress) != ""){
                x.innerHTML = adress; 
                $.mobile.loading( "hide");   
            }
            
       // }
    });
    
}
 function positionError(e) {
        switch (e.code) {
        case 0:
            // UNKNOWN_ERROR
            alert("The application has encountered an unknown error while trying to determine your current location. Details: " + e.message);
            break;
        case 1:
            // PERMISSION_DENIED
            alert("You chose not to allow this application access to your location.");
            break;
        case 2:
            // POSITION_UNAVAILABLE
            alert("The application was unable to determine your location.");
            break;
        case 3:
            // TIMEOUT
            alert("The request to determine your location has timed out.");
            break;
        }
    }

    jQuery(document).ready(function(){
         $.mobile.loading( "show", {
          text: "Please wait while we are geting your location",
          textVisible: true,
          theme: "a",
          html: ""
        });
         getLocation();
         jQuery('#submit_options').click(function(){
            $.mobile.changePage( "#place_list", { transition: "slidefade"} );
            return false;   
         });
         
    });
