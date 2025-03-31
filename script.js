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
                    "Aberdeen City", "Aberdeenshire", "Adur", "Allerdale", "Amber Valley", "Angus", "Argyll and Bute", "Arun", 
                    "Ashfield", "Ashford", "Aylesbury Vale", "Babergh", "Barking and Dagenham", "Barnet", "Barnsley", "Barrow-in-Furness",
                    "Basildon", "Basingstoke and Deane", "Bassetlaw", "Bath and North East Somerset", "Bedford", "Bexley", "Birmingham",
                    "Blaby", "Blackburn with Darwen Borough Council", "Blackpool", "Blaenau Gwent", "Bolsover", "Bolton", "Borough of Poole",
                    "Boston", "Bournemouth", "Bracknell Forest", "Bradford", "Braintree", "Breckland", "Brent", "Brentwood", "Bridgend",
                    "Brighton and Hove", "Bristol (City and County of)", "Broadland", "Bromley", "Bromsgrove", "Broxbourne", "Broxtowe",
                    "Burnley", "Bury", "Caerphilly", "Calderdale", "Cambridge", "Camden", "Cannock Chase", "Canterbury", "Cardiff", 
                    "Carlisle", "Carmarthenshire", "Castle Point", "Central Bedfordshire", "Ceredigion", "Charnwood", "Chelmsford", 
                    "Cheltenham", "Cherwell", "Cheshire East Council", "Cheshire West & Chester", "Chesterfield", "Chichester", "Chiltern",
                    "Chorley", "Christchurch", "City of Edinburgh", "City of London", "City of Westminster", "Clackmannan", "Colchester", 
                    "Conwy", "Copeland", "Cornwall Council", "Cotswold", "Coventry", "Craven", "Crawley", "Croydon", "Dacorum", "Darlington",
                    "Dartford", "Denbighshire", "Derby City", "Derbyshire Dales", "Doncaster", "Dorset", "Dover", "Dudley", "Dumfries and Galloway",
                    "Dundee City", "Durham", "Ealing", "East Ayrshire", "East Cambridgeshire", "East Devon", "East Dunbartonshire", 
                    "East Hampshire", "East Hertfordshire", "East Lindsey", "East Lothian", "East Renfrewshire", "East Riding of Yorkshire", 
                    "East Staffordshire", "East Suffolk", "Eastbourne", "Eastleigh", "Eden", "Eilean Siar", "Elmbridge", "Enfield", 
                    "Epping Forest", "Epsom and Ewell", "Exeter", "Falkirk", "Fareham", "Fenland", "Fife", "Flintshire", "Folkestone & Hythe", 
                    "Forest of Dean", "Fylde", "Gateshead", "Gedling", "Glasgow City", "Gloucester", "Gosport", "Gravesham", "Greenwich", 
                    "Guildford", "Gwynedd", "Hackney", "Halton", "Hambleton", "Hammersmith and Fulham", "Haringey", "Harlow", "Harrogate", 
                    "Harrow", "Hart", "Hartlepool", "Hastings", "Havant", "Havering", "Herefordshire", "Hertsmere", "High Peak", "Highland", 
                    "Hillingdon", "Hinckley and Bosworth", "Horsham", "Hounslow", "Huntingdonshire", "Hyndburn", "Ipswich", "Islington", 
                    "Kensington and Chelsea", "Kingston upon Hull", "Kingston upon Thames", "Leeds", "Leicester", "Lewes", "Lewisham", 
                    "Manchester", "Merton", "Newham", "Newport", "North Ayrshire", "North Devon", "Northumberland", "Nottingham", "Redbridge", 
                    "Richmond upon Thames", "Southwark", "Sutton", "Tower Hamlets", "Waltham Forest", "Wandsworth", "Westminster"
                ];

                // Normalize the borough to match your list
                borough = borough.replace(/London Borough of /, "").replace(/Council$/, "").trim();  // Remove "London Borough of" and "Council"

                // Convert to lowercase for case-insensitive comparison
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
