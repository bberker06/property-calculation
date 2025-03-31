document.getElementById("find-borough-btn").addEventListener("click", function() {
    var address = document.getElementById("property-address").value;

    if (!address) {
        alert("Please enter a property address or postcode.");
        return;
    }

    // Nominatim API endpoint
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var borough = null;

                // List of valid boroughs to match against
                var boroughsList = [
                    "Aberdeen City", "Aberdeenshire", "Adur", "Allerdale", "Amber Valley", "Angus", "Argyll and Bute",
                    "Arun", "Ashfield", "Ashford", "Aylesbury Vale", "Babergh", "Barking and Dagenham", "Barnet", 
                    "Barnsley", "Barrow-in-Furness", "Basildon", "Basingstoke and Deane", "Bassetlaw", 
                    "Bath and North East Somerset", "Bedford", "Bexley", "Birmingham", "Blaby", "Blackburn with Darwen Borough Council",
                    "Blackpool", "Blaenau Gwent", "Bolsover", "Bolton", "Borough of Poole", "Boston", "Bournemouth", "Bracknell Forest",
                    "Bradford", "Braintree", "Breckland", "Brent", "Brentwood", "Bridgend", "Brighton and Hove", "Bristol (City and County of)",
                    "Broadland", "Bromley", "Bromsgrove", "Broxbourne", "Broxtowe", "Burnley", "Bury", "Caerphilly", "Calderdale", "Cambridge",
                    "Camden", "Cannock Chase", "Canterbury", "Cardiff", "Carlisle", "Carmarthenshire", "Castle Point", 
                    "Central Bedfordshire", "Ceredigion", "Charnwood", "Chelmsford", "Cheltenham", "Cherwell", "Cheshire East", 
                    "Cheshire West & Chester", "Chesterfield", "Chichester", "Chiltern", "Chorley", "Christchurch", "City of Edinburgh", 
                    "City of London", "City of Westminster", "Clackmannan", "Colchester", "Conwy", "Copeland", "Cornwall Council", 
                    "Cotswold", "Coventry", "Craven", "Crawley", "Croydon", "Dacorum", "Darlington", "Dartford", "Denbighshire", 
                    "Derby City", "Derbyshire Dales", "Doncaster", "Dorset", "Dover", "Dudley", "Dumfries and Galloway", "Dundee City", 
                    "Durham", "Ealing", "East Ayrshire", "East Cambridgeshire", "East Devon", "East Dunbartonshire", "East Hampshire", 
                    "East Hertfordshire", "East Lindsey", "East Lothian", "East Renfrewshire", "East Riding of Yorkshire", 
                    "East Suffolk", "Eastbourne", "Eastleigh", "Eden", "Enfield", "Epping Forest", "Epsom and Ewell", "Exeter", 
                    "Falkirk", "Fareham", "Fenland", "Fife", "Flintshire", "Folkestone & Hythe", "Forest of Dean", "Fylde", 
                    "Gateshead", "Gedling", "Glasgow City", "Gloucester", "Gosport", "Gravesham", "Greenwich", "Guildford", "Gwynedd", 
                    "Hackney", "Halton", "Hambleton", "Hammersmith and Fulham", "Haringey", "Harlow", "Harrogate", "Harrow", "Hart", 
                    "Hartlepool", "Hastings", "Havant", "Havering", "Herefordshire", "Hertsmere", "High Peak", "Highland", "Hillingdon",
                    "Hinckley and Bosworth", "Horsham", "Hounslow", "Huntingdonshire", "Hyndburn", "Ipswich", "Islington", "Kensington and Chelsea",
                    "Kingston upon Thames", "Leeds", "Leicester", "Lewes", "Lewisham", "Liverpool", "Luton", "Maidstone", "Manchester",
                    "Mansfield", "Medway", "Middlesbrough", "Midlothian", "Milton Keynes", "Mole Valley", "Norwich", "Nottingham", "Oxford", 
                    "Pembrokeshire", "Perth and Kinross", "Peterborough", "Plymouth", "Portsmouth", "Preston", "Reading", "Richmond upon Thames", 
                    "Rochdale", "Rotherham", "Salford", "Sandwell", "Scarborough", "Sheffield", "Slough", "Solihull", "South Ayrshire", 
                    "South Cambridgeshire", "South Gloucestershire", "South Tyneside", "Southampton", "Sunderland", "Surrey Heath", "Sutton",
                    "Swindon", "Tameside", "Trafford", "Tower Hamlets", "Walsall", "Waltham Forest", "Wandsworth", "Warwick", "Wokingham"
                ];

                // Loop through the results to find a match
                for (var i = 0; i < boroughsList.length; i++) {
                    var boroughFromAPI = data[0].address.city_district || data[0].address.county;
                    if (boroughFromAPI && boroughFromAPI.toLowerCase().includes(boroughsList[i].toLowerCase())) {
                        borough = boroughsList[i];
                        break;
                    }
                }

                if (borough) {
                    document.getElementById("borough").value = borough;
                } else {
                    alert("Borough not found for the entered address.");
                }
            } else {
                alert("No results found for the entered address.");
            }
        })
        .catch(error => {
            console.error("Error fetching borough data:", error);
            alert("Failed to fetch borough information. Please try again.");
        });
});
