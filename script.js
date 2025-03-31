document.getElementById("find-borough-btn").addEventListener("click", function() {
    var address = document.getElementById("property-address").value;

    if (!address) {
        alert("Please enter a property address or postcode.");
        return;
    }

    // Postcodes.io API URL for UK postcodes
    var url = `https://api.postcodes.io/postcodes/${encodeURIComponent(address)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.result) {
                // Fetch borough or district info
                var borough = data.result.admin_district || data.result.region || "Borough not found";

                // List of valid boroughs you want to match (simplified)
                var boroughsList = [
                    "Aberdeen City", "Adur", "Allerdale", "Amber Valley", "Angus", "Argyll and Bute", "Arun", "Ashfield", 
                    "Ashford", "Aylesbury Vale", "Babergh", "Barking and Dagenham", "Barnet", "Barnsley", "Barrow-in-Furness",
                    "Basildon", "Basingstoke and Deane", "Bassetlaw", "Bath and North East Somerset", "Bedford", "Bexley",
                    "Birmingham", "Blackburn with Darwen", "Blackpool", "Blaenau Gwent", "Bolton", "Bournemouth", "Bracknell Forest",
                    "Bradford", "Braintree", "Bromley", "Camden", "Canterbury", "Cardiff", "Cheshire West and Chester", "Croydon",
                    "Derby", "Doncaster", "Dudley", "Enfield", "Hackney", "Haringey", "Hillingdon", "Islington", "Lewisham",
                    "Manchester", "Merton", "Newham", "Northumberland", "Nottingham", "Redbridge", "Richmond upon Thames", 
                    "Southwark", "Sutton", "Tower Hamlets", "Waltham Forest", "Wandsworth", "Westminster"
                ];

                // Normalize the borough to match your list
                borough = borough.replace(/London Borough of /, "").trim();  // Strip "London Borough of"

                // Convert to lowercase for a case-insensitive comparison
                borough = borough.toLowerCase();

                // Check if the borough is in the list, case-insensitively
                var matchedBorough = boroughsList.find(b => b.toLowerCase() === borough);

                if (matchedBorough) {
                    document.getElementById("borough").value = matchedBorough;
                } else {
                    alert("Borough not found in your list.");
                    document.getElementById("borough").value = "Borough not found";
                }
            } else {
                alert("Borough not found for the entered postcode.");
            }
        })
        .catch(error => {
            console.error("Error fetching borough data:", error);
            alert("Failed to fetch borough information. Please try again.");
        });
});
