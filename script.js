// Sample data for Imams and mosques (you would replace this with your actual data)
const imamsData = [
    {
        id: 1,
        name: "Sheikh Ahmed Al-Maqdisi",
        mosque: "Masjid Al Khabeesi",
        location: "Murraqabat, Deira, Dubai",
        coordinates: [25.2661163, 55.3277214],
        audioSample: "https://pub-fa6e49baf5604d6099352063a7441391.r2.dev/masjid_al_khabeesi.mp3",
        additionalInfo: "Tarawih starts 25 minutes after Isha Adhan."
    },
    {
        id: 2,
        name: "Sheikh Fatih Seferagic",
        mosque: "Masjid Al Joud",
        location: "MBR city District 1, Dubai",
        coordinates: [25.1637818, 55.2739523],
        audioSample: "https://pub-fa6e49baf5604d6099352063a7441391.r2.dev/fatih_seferagic.mp3", 
        additionalInfo: "Fatih Seferagic is a Bosnian-American Qari and social media influencer known for his exceptional recitation of the Quran."
    },
    // {
    //     id: 3,
    //     name: "Sheikh Abdullah Al-Hashimi",
    //     mosque: "Al Noor Mosque",
    //     location: "Al Barsha, Dubai",
    //     coordinates: [25.1127, 55.2003],
    //     audioSample: "https://example.com/sample3.mp3", // This is a placeholder URL
    //     additionalInfo: "Tarawih begins at 8:45 PM. Known for clear tajweed and melodious voice."
    // }
];

// Initialize the map centered on Dubai
let map;

// Function to initialize the map
function initMap() {
    map = L.map('map').setView([25.2048, 55.2708], 11);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

// Function to add markers to the map
function addMarkersToMap() {
    imamsData.forEach(imam => {
        const marker = L.marker(imam.coordinates)
            .addTo(map)
            .bindPopup(`
                <strong>${imam.mosque}</strong><br>
                Imam: ${imam.name}<br>
                ${imam.additionalInfo}
            `);
        
        // Store marker reference with imam ID for easy access later
        imam.marker = marker;
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

// Function to set up event listeners
function setupEventListeners() {
    // Add event listeners to "View on Map" links
    document.querySelectorAll('.view-on-map').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imamId = parseInt(this.getAttribute('data-imam-id'));
            const imam = imamsData.find(i => i.id === imamId);
            
            if (imam && imam.marker) {
                map.setView(imam.coordinates, 15);
                imam.marker.openPopup();
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

// Initialize all functions when the page loads
window.addEventListener('load', function() {
    initMap();
    addMarkersToMap();
    createImamCards();
    setupEventListeners();
});