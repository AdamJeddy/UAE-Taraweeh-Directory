// Map and markers variables
let map;
let markers = [];
let infoWindow;
let imamsData = [];

// Function to initialize the map (called by the Google Maps API script)
function initMap() {
    // Create map centered on Dubai
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 25.2048, lng: 55.2708 },
        zoom: 11,
        styles: [
            {
                "featureType": "poi.business",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#c8d7d4" }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#f8f0e3" }]
            }
        ]
    });
    
    // Create a single info window that will be reused
    infoWindow = new google.maps.InfoWindow();
    
    // Fetch the imams data and initialize the map
    fetchImamsData();
}

// Function to fetch imams data from a JSON file
function fetchImamsData() {
    fetch('imams_data.json')
        .then(response => response.json())
        .then(data => {
            imamsData = data;
            // Add markers once the data is fetched
            addMarkersToMap();
            // Create Imam cards and set up event listeners
            createImamCards();
            // Populate the table with Imam data
            populateImamTable();
            // Populate the filters
            populateFilters();
            // Set up filtering functionality
            setupFilters();
        })
        .catch(error => console.error('Error fetching imams data:', error));
}

// Function to add markers to the map
function addMarkersToMap() {
    imamsData.forEach(imam => {
        const marker = new google.maps.Marker({
            position: imam.coordinates,
            map: map,
            title: imam.mosque
        });
        
        // Store marker reference
        imam.marker = marker;
        markers.push(marker);
        
        // Add click listener to show info window
        marker.addListener("click", () => {
            const content = `
                <strong>${imam.mosque}</strong><br>
                Imam: ${imam.name}<br>
                Recitation Days: ${formatRecitationDays(imam.recitationStart, imam.recitationEnd)}
            `;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
    });
}

// Function to create Imam cards
function createImamCards() {
    const imamsContainer = document.getElementById('imams-list');
    
    imamsData.forEach(imam => {
        const imamCard = document.createElement('div');
        imamCard.className = 'imam-card';
        imamCard.innerHTML = `
            <h3>${imam.name}</h3>
            <div class="mosque-name">${imam.mosque}</div>
            <div class="location">${imam.location}</div>
            <div class="recitation-days">Recitation Days: ${formatRecitationDays(imam.recitationStart, imam.recitationEnd)}</div>
            <audio class="audio-player" controls>
                <source src="${imam.audioSample}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <div>${imam.additionalInfo}</div>
            <a href="#" class="view-on-map" data-imam-id="${imam.id}">View on Map</a>
        `;
        
        imamsContainer.appendChild(imamCard);
    });
}

// Function to populate the Imam table
function populateImamTable() {
    const tableBody = document.querySelector('#imams-table tbody');
    
    imamsData.forEach(imam => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${imam.name}</td>
            <td>${imam.mosque}</td>
            <td><a href="https://www.google.com/maps/search/?api=1&query=${imam.coordinates.lat},${imam.coordinates.lng}" target="_blank">${imam.location}</a></td>
            <td>${formatRecitationDays(imam.recitationStart, imam.recitationEnd)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Function to populate the filters
function populateFilters() {
    const cityFilter = document.getElementById('city-filter');
    const areaFilter = document.getElementById('area-filter');
    const cities = new Set();
    const areas = new Set();
    
    imamsData.forEach(imam => {
        const locationParts = imam.location.split(', ');
        const city = locationParts[locationParts.length - 1];
        const area = locationParts[locationParts.length - 2];
        
        cities.add(city);
        areas.add(area);
    });
    
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
    
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        areaFilter.appendChild(option);
    });
}

// Function to set up filters
function setupFilters() {
    const cityFilter = document.getElementById('city-filter');
    const areaFilter = document.getElementById('area-filter');
    const dateFilter = document.getElementById('date-filter');
    
    cityFilter.addEventListener('change', filterTable);
    areaFilter.addEventListener('change', filterTable);
    dateFilter.addEventListener('input', filterTable);
}

// Function to filter the table
function filterTable() {
    const cityFilter = document.getElementById('city-filter').value;
    const areaFilter = document.getElementById('area-filter').value;
    const dateFilter = parseInt(document.getElementById('date-filter').value);
    const tableBody = document.querySelector('#imams-table tbody');
    
    tableBody.innerHTML = '';
    
    imamsData.forEach(imam => {
        const locationParts = imam.location.split(', ');
        const city = locationParts[locationParts.length - 1];
        const area = locationParts[locationParts.length - 2];
        
        const matchesCity = !cityFilter || city === cityFilter;
        const matchesArea = !areaFilter || area === areaFilter;
        const matchesDate = isNaN(dateFilter) || (dateFilter >= imam.recitationStart && dateFilter <= imam.recitationEnd);
        
        if (matchesCity && matchesArea && matchesDate) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${imam.name}</td>
                <td>${imam.mosque}</td>
                <td><a href="https://www.google.com/maps/search/?api=1&query=${imam.coordinates.lat},${imam.coordinates.lng}" target="_blank">${imam.location}</a></td>
                <td>${formatRecitationDays(imam.recitationStart, imam.recitationEnd)}</td>
            `;
            
            tableBody.appendChild(row);
        }
    });
}

// Function to format recitation days
function formatRecitationDays(start, end) {
    if (start === 1 && end === 30) {
        return 'All Ramadan';
    } else if (start === end) {
        return `Day ${start}`;
    } else {
        return `${start} to ${end} Ramadan`;
    }
}

// Function to set up event listeners
function setupEventListeners() {
    // Add event listeners to "View on Map" links
    document.querySelectorAll('.view-on-map').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imamId = parseInt(this.getAttribute('data-imam-id'));
            const imam = imamsData.find(i => i.id === imamId);
            
            if (imam && imam.marker) {
                // Center the map on the marker
                map.setCenter(imam.coordinates);
                map.setZoom(15);
                
                // Open the info window
                const content = `
                    <strong>${imam.mosque}</strong><br>
                    Imam: ${imam.name}<br>
                    Recitation Days: ${formatRecitationDays(imam.recitationStart, imam.recitationEnd)}
                `;
                infoWindow.setContent(content);
                infoWindow.open(map, imam.marker);
            }
        });
    });
    
    // Handle form submission
    const form = document.getElementById('contribute-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would process the form data
        // and send it to your server or email
        
        alert('Thank you for your contribution! Your information has been submitted and will be reviewed.');
        form.reset();
    });
}