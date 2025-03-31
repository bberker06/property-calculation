document.getElementById("property-address").addEventListener("input", function() {
    var address = document.getElementById("property-address").value;

    if (address.length < 3) {
        // Only make requests for addresses that are at least 3 characters long
        return;
    }

    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var borough = data[0].address.city_district || data[0].address.county || "Borough not found";

                // Strip out "London Borough of" if it appears in the response
                borough = borough.replace(/London Borough of /, "").trim();

                // Set the borough value
                document.getElementById("borough").value = borough;
            } else {
                document.getElementById("borough").value = "Borough not found";
            }
        })
        .catch(error => {
            console.error("Error fetching borough data:", error);
            document.getElementById("borough").value = "Failed to fetch borough";
        });
});

document.getElementById("submit-btn").addEventListener("click", function() {
    var address = document.getElementById("property-address").value;
    var borough = document.getElementById("borough").value;
    var purchasePrice = document.getElementById("purchase-price").value;

    if (!address || !borough || !purchasePrice) {
        alert("Please fill in all fields!");
        return;
    }

    // Simple rent calculation as an example
    var calculatedRent = (purchasePrice * 0.05).toFixed(2);

    // Show the summary
    document.getElementById("summary-address").innerText = address;
    document.getElementById("summary-borough").innerText = borough;
    document.getElementById("summary-price").innerText = purchasePrice;
    document.getElementById("summary-rent").innerText = calculatedRent;

    document.getElementById("summary").style.display = "block";
});
