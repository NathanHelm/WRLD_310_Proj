// Initialize the map with custom options
const map = L.map('map', {
    center: [35.0, 100.0], // Centered between Greece and China
    zoom: 3,
    minZoom: 2,
    maxZoom: 8,
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
// Each section ({}) is one card for that location. To add more cards, simply add more sections with the same structure (title, date, content, symbolism).
// The location is the coordinates that you'd use on google maps to find the location.
// To add more locations, simply copy and paste the entire section and change the name, location, description, and timeline (cards).
// The cards for each location are {title, date, content, symbolism}. The location section is {name, location, culture, description, timeline{cards}}.
const serpentLocations = [
    {
        name: "Python and Apollo at Delphi",
        location: [38.4824, 22.5010],
        culture: "Greek",
        description: "The sacred site where Apollo slew the mighty serpent Python to establish his oracle.",
        timeline: [
            {
                title: "Python's Sacred Role",
                date: "Ancient Times",
                content: "Python was a gigantic serpent that resided in the sacred cave of Delphi, guarding the ancient sanctuary. Python's role was to protect the Oracle of Gaia, a mystical site where prophecies were revealed.",
                symbolism: "Guardian of ancient wisdom and primal forces of nature."
            },
            {
                title: "Apollo's Challenge",
                date: "Divine Confrontation",
                content: "Apollo, the god of prophecy, music, and light, was determined to take control of Delphi. In order to establish his own Oracle and become the divine protector of the site, Apollo had to defeat Python.",
                symbolism: "Transition from Chaos to Order: The death of Python symbolizes Apollo's establishment of divine order."
            },
            {
                title: "The Sacred Battle",
                date: "Divine Victory",
                content: "Apollo, in a dramatic confrontation, killed Python with his arrows. In some versions of the story, Apollo's arrows were poisoned, and in others, they were said to have been imbued with the power of the sun.",
                symbolism: "Sacred Authority: Apollo's victory allowed him to claim the Oracle of Delphi."
            },
            {
                title: "Oracle's Establishment",
                date: "New Era",
                content: "After slaying the serpent, Apollo purified himself and founded the Oracle of Delphi, which became one of the most significant religious sites in the ancient world. It was here that people from across the Greek world would come to receive prophecies from the god.",
                symbolism: "Wisdom and Prophecy: Apollo's connection to the serpent's ancient association with wisdom and knowledge."
            }
        ]
    },
    {
        name: "Medusa the Gorgon",
        location: [37.9838, 23.7275],
        culture: "Greek",
        description: "The tragic tale of a beautiful woman transformed into a serpent-haired Gorgon.",
        timeline: [
            {
                title: "Medusa's Beauty",
                date: "Before Transformation",
                content: "Medusa was once a beautiful mortal woman, but her beauty attracted the attention of Poseidon, who pursued her relentlessly.",
                symbolism: "The vulnerability of mortal beauty in the divine realm."
            },
            {
                title: "The Curse",
                date: "Moment of Transformation",
                content: "In some versions of the myth, Poseidon raped Medusa in Athena's temple, desecrating the holy space. Athena, enraged by this violation of her temple, punished Medusa by turning her into a Gorgon, a terrifying creature with snakes for hair and the ability to turn anyone who looked at her into stone.",
                symbolism: "Danger and Transformation: Medusa represents the fearsome, dangerous aspect of the feminine, transformed into a monster."
            },
            {
                title: "Life in Exile",
                date: "Years of Isolation",
                content: "Medusa was banished to a desolate island, where she lived in isolation, her gaze a constant threat to anyone who came near.",
                symbolism: "The Unknown and Fear of Female Power: Medusa embodies society's fear of powerful women."
            },
            {
                title: "Perseus and Destiny",
                date: "Hero's Quest",
                content: "The hero Perseus, tasked with obtaining Medusa's head by King Polydectes, used Athena's shield, Hermes' winged sandals, and a special sword to approach Medusa without looking directly at her. He used the reflection in his shield to avoid her petrifying gaze, and with a swift strike, he beheaded her. From her blood, the winged horse Pegasus was born.",
                symbolism: "Death and Rebirth: Through her death, new life (Pegasus) is born."
            }
        ]
    },
    {
        name: "Nuwa and Fuxi",
        location: [34.3416, 108.9398],
        culture: "Chinese",
        description: "The serpent-bodied creator deities who shaped humanity and civilization.",
        timeline: [
            {
                title: "Cosmic Disaster",
                date: "Primordial Times",
                content: "After a great cosmic disaster that left the sky fractured and the earth in disarray, Nuwa and Fuxi came to the rescue. Nuwa repaired the broken sky with the help of five-colored stones, preventing the collapse of the heavens.",
                symbolism: "Creation and Balance: Nuwa and Fuxi's roles symbolize balance and harmony in the universe."
            },
            {
                title: "Creation of Humanity",
                date: "Dawn of Humankind",
                content: "Nuwa crafted the first humans from clay, shaping them one by one. She later perfected her method by dipping a rope into the river, and the drops that fell from it became human beings.",
                symbolism: "Duality and Interdependence: The brother-sister duo represents complementary forces working together."
            },
            {
                title: "Teaching Civilization",
                date: "Early Human Era",
                content: "Fuxi, known for his wisdom and guidance, brought civilization to the people, teaching them to fish, trap, and live harmoniously with nature.",
                symbolism: "Divine Guidance: Fuxi's role in teaching humanity represents the bridge between divine wisdom and human development."
            },
            {
                title: "Divine Legacy",
                date: "Eternal",
                content: "These two deities are often depicted with snake-like bodies as a symbol of their connection to the natural world and divine power.",
                symbolism: "Serpent-like Form and Divine Nature: Their serpentine features connect them to earth, nature, and divine power."
            }
        ]
    },
    {
        name: "White Snake Legend",
        location: [30.2420, 120.1122],
        culture: "Chinese",
        description: "The tragic love story between a woman and a serpent spirit.",
        timeline: [
            {
                title: "The Transformation",
                date: "Ancient Times",
                content: "A powerful serpent spirit, who had lived for centuries, transformed into a beautiful woman named Madame White Snake.",
                symbolism: "Transformation and Dual Identity: The complexity of identity and the blending of supernatural and human realms."
            },
            {
                title: "Forbidden Love",
                date: "Time of Romance",
                content: "During her time in human form, she met and fell in love with a kind-hearted man named Xu Xian, who was unaware of her true nature.",
                symbolism: "Love and Loyalty vs. Tradition and Taboo: The tension between societal norms and individual desires."
            },
            {
                title: "Discovery and Persecution",
                date: "Time of Trial",
                content: "A Buddhist monk named Fa Hai soon discovered Madame White Snake's true identity. He saw her as a dangerous being, and fearing the chaos she could cause, he forced her to reveal her serpent form.",
                symbolism: "Misunderstood Supernatural Beings: Challenging the belief that serpents are inherently evil."
            },
            {
                title: "Eternal Love",
                date: "Centuries of Waiting",
                content: "With great sorrow, Madame White Snake was imprisoned beneath the Leifeng Pagoda, where she remains for centuries. However, she continues to send her husband dreams and signs of her love, and eventually, their love transcends the barriers of life and death.",
                symbolism: "The power of love to transcend physical and spiritual barriers."
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

// Function to create timeline navigation with enhanced display
function createTimelineNavigation(location, currentIndex = 0) {
    const story = location.timeline[currentIndex];
    return `
        <div class="timeline-story" data-location-index="${serpentLocations.indexOf(location)}">
            <h2 style="margin: 0 0 15px 0; color: #8b0000; font-size: 1.4em; text-align: center; border-bottom: 2px solid #8b0000; padding-bottom: 8px;">${location.name}</h2>
            <div class="timeline-header">
                <h3 style="margin: 0 0 5px 0; color: #8b0000;">${story.title}</h3>
                <div class="culture-badge">${location.culture} Mythology</div>
                <div class="timeline-date">${story.date}</div>
            </div>
            <p style="margin: 10px 0;">${story.content}</p>
            <div class="symbolism-section">
                <em>Symbolism:</em> ${story.symbolism}
            </div>
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

        // Get the map container size
        const mapHeight = map.getContainer().clientHeight;
        
        // Calculate an offset point to position the marker lower in the viewport
        const point = map.project(location.location, 6) // Project the location at zoom level 6
            .subtract([0, +mapHeight/4]); // Shift the point up by 1/4 of the map height (which shifts the view down)
        
        // Convert back to LatLng and fly to that point
        const offsetLatLng = map.unproject(point, 6);
        
        map.flyTo(offsetLatLng, 6, {
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