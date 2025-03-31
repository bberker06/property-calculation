document.getElementById("find-borough-btn").addEventListener("click", function() {
    var address = document.getElementById("property-address").value;

    if (!address) {
        alert("Please enter a property address or postcode.");
        return;
    }

    // Replace with Nominatim API URL
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var borough = null;

                // Loop through the results to find the borough
                if (data[0].address && data[0].address.city_district) {
                    borough = data[0].address.city_district;  // Example for borough
                } else if (data[0].address && data[0].address.county) {
                    borough = data[0].address.county;
                } else {
                    borough = "Borough not found";
                }

                document.getElementById("borough").value = borough;
            } else {
                alert("Borough not found for the entered address.");
            }
        })
        .catch(error => {
            console.error("Error fetching borough data:", error);
            alert("Failed to fetch borough information. Please try again.");
        });
});
