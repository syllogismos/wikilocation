var App = {
		
	"app_loaded": false,
    // INIT THE PHONE MAKE SURE EVERYTHING IS LOADING PROPERLY
    "init": function () {
        console.log("[init]");

        $(document).ready(function () {

            console.log("jQuery finished loading");
            
            console.log("PhoneGap & jQuery.Mobile finished loading");

            var deviceReadyDeferred = jQuery.Deferred();
            var jqmReadyDeferred = jQuery.Deferred();

            document.addEventListener("deviceReady", function () {
                console.log("PhoneGap finished loading");
                deviceReadyDeferred.resolve();

            }, false);

            $(window).bind('orientationchange', App.callbacks.orientation);

            $(document).one("pageinit", function () {
                console.log("jQuery.Mobile finished loading");
                jqmReadyDeferred.resolve();
            });
            
            $.when(deviceReadyDeferred, jqmReadyDeferred).then(function () {
                
            	//INIT the pages
            	App.initPages();
                console.log("App finished loading");
                App.app_loaded = true;   
                 
                App.callbacks.onDeviceReady();
            });
        });
    },

    
    // PAGE INIT
    "initPages": function () {

        console.log("[initPages]");
              
        $(document).on("pageinit", "#index_login", function (event) {
           console.log("index loaded");
        });
        
        //KEYBOARD EVENT LISTENER
        document.addEventListener("showkeyboard", function () {}, true);
        document.addEventListener("hidekeyboard", function () {}, false);

        //AJAX LOGS
        $(document).ajaxComplete(function (event, jqxhr, settings, exception) {
            console.log("ajax status http code");
            console.log(jqxhr.status);
        });
    },

    "callbacks": {
        "onDeviceReady": function () {
        	navigator.geolocation.getCurrentPosition(App.onSuccess, onError);
        },
        
        "orientation": function () {
            console.log("orientation changed");
        }
    },
    "onSuccess": function(position) {
    	 var element = document.getElementById('geolocation');
    	 element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
    	       				 'Longitude: ' + position.coords.longitude + '<br />' +
    	                     'Altitude: ' + position.coords.altitude + '<br />' +
    	                     'Accuracy: ' + position.coords.accuracy + '<br />' +
    	                     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
    	                     'Heading: ' + position.coords.heading + '<br />' +
    	                     'Speed: ' + position.coords.speed + '<br />' +
    	                     'Timestamp: ' + position.timestamp + '<br />';
    }
};






