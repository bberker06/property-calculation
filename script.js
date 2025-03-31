document.getElementById("find-borough-btn").addEventListener("click", function() {
    var address = document.getElementById("property-address").value;

    if (!address) {
        alert("Please enter a property address or postcode.");
        return;
    }

    var apiKey = "AIzaSyBwTHzTkLasn0Udp3Ljr6VM483Hj8U5uEM";  // Your Google API key
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK" && data.results.length > 0) {
                var borough = "Borough not found";
                var localAuthority = "Local Authority not found";

                // Loop through the results to find relevant data
                for (var i = 0; i < data.results.length; i++) {
                    var addressComponents = data.results[i].address_components;
                    
                    // Check for 'borough' or 'locality' in the address components
                    addressComponents.forEach(component => {
                        if (component.types.includes("administrative_area_level_2")) {
                            borough = component.long_name;  // This should be the borough name
                        }
                        if (component.types.includes("administrative_area_level_1")) {
                            localAuthority = component.long_name;  // This could be the local authority or region
                        }
                    });
                    
                    // If we found the data, break the loop
                    if (borough !== "Borough not found" && localAuthority !== "Local Authority not found") {
                        break;
                    }
                }

                // Set the borough and local authority values in the fields
                document.getElementById("borough").value = borough;
                alert(`Local Authority Area: ${localAuthority}, Borough: ${borough}`);
            } else {
                alert("No results found for the entered postcode.");
            }
        })
        .catch(error => {
            console.error("Error fetching borough data:", error);
            alert("Failed to fetch borough information. Please try again.");
        });
});
