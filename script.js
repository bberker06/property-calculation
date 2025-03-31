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
