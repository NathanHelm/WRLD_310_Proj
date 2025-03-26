// Initialize the map with custom options
const map = L.map('map', {
    center: [45.0, 10.0],
    zoom: 4,
    minZoom: 3,
    maxZoom: 18,
    zoomControl: true
});

// This is the map style. You can change the style by changing the URL.
// This is currently using WMS tiles from Carto.
// If we want to add our own tiles, we can do that by changing the URL to our own tiles.
// We can also use other tile providers like Mapbox or Google Maps.
// We don't need to have the attribution, subdomains, or maxZoom.
// maxZoom is the maximum zoom level into the map.
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO',
    subdomains: 'abcd', //This is required to use this specific tile layer.
    maxZoom: 18
}).addTo(map);

// Add a gentler sepia filter for better visibility
document.querySelector('#map').style.filter = 'sepia(30%) brightness(105%) contrast(95%) saturate(85%)';

// This is where the stories can go
// Each section ({}) is one card for that location. To add more cards, simply add more sections with the same structure (title, date, content).
// The location is the coordinates are what youd use on google maps to find the location.
// Current stories are filler stories to show as examples. 
// To add more locations, simply copy and paste the entire section and change the name, location, description, and timeline (cards).
const serpentLocations = [
    {
        name: "Python at Delphi",
        location: [38.4824, 22.5010],
        description: "The mythical Python serpent slain by Apollo at Delphi",
        timeline: [
            {
                title: "Origins",
                date: "Ancient Times",
                content: "Python, the earth-dragon of Delphi, was born from the mud left behind after the great flood."
            },
            {
                title: "Guardian of the Oracle",
                date: "Pre-Apollonian Era",
                content: "Python served as the guardian of the Oracle of Mother Earth at Delphi, protecting the sacred site."
            },
            {
                title: "Apollo's Arrival",
                date: "Mythical Era",
                content: "Apollo, seeking to establish his oracle, confronted Python at the site of Delphi."
            },
            {
                title: "The Battle",
                date: "Mythical Era",
                content: "Using his golden arrows, Apollo engaged in an epic battle with Python, eventually slaying the serpent."
            }
        ]
    },
    {
        name: "Midgard Serpent",
        location: [59.9139, 10.7522],
        description: "Jörmungandr, the world serpent of Norse mythology",
        timeline: [
            {
                title: "Birth of Jörmungandr",
                date: "Beginning of Time",
                content: "Born as one of three children to Loki and the giantess Angrboða."
            },
            {
                title: "Cast into the Ocean",
                date: "Early Days",
                content: "Odin threw Jörmungandr into the great ocean that encircles Midgard."
            },
            {
                title: "Growth",
                date: "Age of Vikings",
                content: "The serpent grew so large it was able to surround the earth and grasp its own tail."
            },
            {
                title: "Ragnarök Prophecy",
                date: "End Times",
                content: "It is said that during Ragnarök, Thor and Jörmungandr will slay each other in a final battle."
            }
        ]
    },
    {
        name: "Dragon of Colchis",
        location: [42.1662, 42.9754],
        description: "The serpent that guarded the Golden Fleece",
        timeline: [
            {
                title: "Guardian's Origin",
                date: "Age of Heroes",
                content: "The never-sleeping serpent was placed by Ares to guard the Golden Fleece."
            },
            {
                title: "Years of Guardianship",
                date: "Pre-Argonaut Era",
                content: "For years, the dragon successfully protected the Golden Fleece from all who sought it."
            },
            {
                title: "Arrival of the Argonauts",
                date: "Time of Jason",
                content: "Jason and the Argonauts arrived in Colchis seeking the Golden Fleece."
            },
            {
                title: "Medea's Intervention",
                date: "Time of Jason",
                content: "With Medea's magic, the dragon was put to sleep, allowing Jason to steal the Fleece."
            }
        ]
    }
];

// Custom icon for serpent locations with a more medieval style
const serpentIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Function to create timeline navigation for each location
// Can be customized to include more information about the location
// Change the look

function createTimelineNavigation(location, currentIndex = 0) {
    const story = location.timeline[currentIndex];
    return `
        <div class="timeline-story" data-location-index="${serpentLocations.indexOf(location)}">
            <div class="timeline-header">
                <h3 style="margin: 0 0 5px 0; color: #8b0000;">${story.title}</h3>
                <div class="timeline-date">${story.date}</div>
            </div>
            <p style="margin: 10px 0;">${story.content}</p>
            <div class="timeline-navigation">
                <button class="nav-button" data-direction="prev" data-index="${currentIndex - 1}" 
                    ${currentIndex === 0 ? 'disabled' : ''}>◀</button>
                <span>${currentIndex + 1} / ${location.timeline.length}</span>
                <button class="nav-button" data-direction="next" data-index="${currentIndex + 1}"
                    ${currentIndex === location.timeline.length - 1 ? 'disabled' : ''}>▶</button>
            </div>
        </div>
    `;
}

// Everything below here is the timeline navigation and state tracking
let currentLocationIndex = 0;
let currentTimelineIndex = 0;
let activePopup = null;


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-button')) {
        e.preventDefault();
        e.stopPropagation();
        const newIndex = parseInt(e.target.dataset.index);
        navigateTimeline(newIndex);
    }
});

// Function to update timeline content
function navigateTimeline(newIndex) {
    const locationElement = document.querySelector('.timeline-story');
    if (!locationElement) return;
    
    const locationIndex = parseInt(locationElement.dataset.locationIndex);
    const location = serpentLocations[locationIndex];
    
    if (newIndex >= 0 && newIndex < location.timeline.length) {
        currentTimelineIndex = newIndex;
        const popupContent = createTimelineNavigation(location, newIndex);
        const popup = document.querySelector('.leaflet-popup-content');
        if (popup) {
            popup.innerHTML = popupContent;
        }
    }
}

// Add markers for each location with the timeline popup styling
serpentLocations.forEach((location, index) => {
    const marker = L.marker(location.location, {icon: serpentIcon});
    
    const popup = L.popup({
        className: 'custom-popup',
        maxWidth: 300,
        closeButton: true,
        closeOnClick: false,
        autoClose: false
    }).setContent(createTimelineNavigation(location, 0));
    
    marker.bindPopup(popup);

    marker.on('click', () => {
        if (activePopup && activePopup !== popup) {
            activePopup.close();
        }
        activePopup = popup;
        currentLocationIndex = index;
        currentTimelineIndex = 0;

        // Zoom and pan to the marker with animation (this is the zoom level and the speed of the animation)
        // You can change the zoom level and the speed of the animation by changing the numbers
        // The first number is the zoom level and the second number is the speed of the animation
        // The higher the number, the faster the animation
        // The lower the number, the slower the animation
        // The default zoom level is 6 and the default speed is 0.25
        map.flyTo(location.location, 6, {
            duration: 1.5,
            easeLinearity: 0.25
        });
    });

    
    marker.on('popupclose', () => {
        // Reset zoom and view when popup is closed
        map.flyTo([20.0, 0.0], 2, {
            duration: 1.5
        });
    });

    marker.addTo(map);
}); 