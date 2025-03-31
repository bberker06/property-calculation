document.getElementById("find-borough-btn").addEventListener("click", function() {
    var address = document.getElementById("property-address").value;

    if (!address) {
        alert("Please enter a property address or postcode.");
        return;
    }

    var apiKey = "YOUR_API_KEY";  // Replace with your OpenCage API key
    var url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                var borough = null;

                // Loop through the results to find the borough
                data.results[0].components.county ? borough = data.results[0].components.county : borough = "Not Found";

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

document.getElementById("submit-btn").addEventListener("click", function() {
    var address = document.getElementById("property-address").value;
    var borough = document.getElementById("borough").value;
    var purchasePrice = document.getElementById("purchase-price").value;

    if (!address || !borough || !purchasePrice) {
        alert("Please fill in all fields!");
        return;
    }

    // This is where the calculation logic will go.
    // For now, we'll just use placeholder data.
    var calculatedRent = (purchasePrice * 0.05).toFixed(2); // Example calculation

    // Show the summary
    document.getElementById("summary-address").innerText = address;
    document.getElementById("summary-borough").innerText = borough;
    document.getElementById("summary-price").innerText = purchasePrice;
    document.getElementById("summary-rent").innerText = calculatedRent;

    document.getElementById("summary").style.display = "block";
});
