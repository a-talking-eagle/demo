var searchInput = 'input';
var marker;
var request;
window.onload = function() {
    // josh
    var location = {
        lat: 40,
        lng: -79
    }
    var options = {
        center: location,
        zoom: 15
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;
            // Write the map
            map = new google.maps.Map(document.getElementById("map"), options);
        }, (err) => {
            console.log('location request denied');
        })
    } else {
        console.log('geolocation not supported');
        map = new google.maps.Map(document.getElementById("map"), options);
    }
    // Autocomplete
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['establishment'],
        componentRestrictions: {
            country: "USA"
        },
        fields: ['geometry', 'name', 'reviews']
    });
    // Autocomplete listener
    autocomplete.addListener('place_changed', onPlaceChanged);
  
    function onPlaceChanged() {
        // Get the place
        var place = autocomplete.getPlace();
       
        if (place.geometry) {
            // Pan to map
            map.panTo({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
            // Look up restaurants within 5000 meters or 3 miles
            var request = {
                location: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
                radius: '5000',
                types: ['restaurant']
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
         
            function callback(results, status) {
               
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        // Create a marker for each result
                        createMarker(results[i]);
                    }
                }
            }
            // Create info window 
            var infoWindow = new google.maps.InfoWindow({
                maxWidth: 350,
            })

            function createMarker(place) {
            
                // Place info
                service.getDetails({
                    placeId: place.place_id
                }, function(place, status) {
                
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // Create marker 
                        var marker = new google.maps.Marker({
                            position: place.geometry.location,
                            map: map
                        });

                        // Add click listener
                        google.maps.event.addListener(marker, 'click', (function(marker) {
                            return function() {
                                // Show the name and iterate over the reviews
                                infoWindow.setContent(`<h2>${place.name}</h2>` + place.reviews.map((review) => {
                                    return (`<div><p>${review.author_name}</p><p><strong>Review Score:</strong> ${review.rating}</p><p><i>${review.relative_time_description}</i></p><p>"${review.text}"</p></div><hr />`);
                                }).join(''));
                                infoWindow.open(map, marker);
                                // Recenter map when clicked
                                map.panTo(marker.getPosition());
                            };
                        })(marker));
                    }
                });
            }
        }
    }
}