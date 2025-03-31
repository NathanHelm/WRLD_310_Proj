// Update the baseURL to work in both development and production
const baseURL = window.location.origin;

// Initialize variables for popup and timeline management
let activePopup = null;
let currentTimelineIndex = 0;
let currentLocationIndex = null;

// Initialize the map with custom options
const map = L.map('map', {
    center: [20.0, 0.0], // Center of the world
    zoom: 2,
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
                symbolism: "The Unknown and Fear of Female Power: Medusa embodies society's fear of powerful women, and the severing of her head symbolizes the fear and need to control that power."
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
    },
    {
        name: "Dragon-Serpent Connection",
        location: [34.7533, 113.6653], // Ancient Chinese capital region
        culture: "Chinese",
        description: "In Chinese culture, the dragon is one of the most powerful and revered creatures, often depicted as a snake-like being with divine and celestial power.",
        timeline: [
            {
                title: "Divine Nature",
                date: "Ancient Times",
                content: "Unlike Western dragons, which are typically feared, Chinese dragons are considered benevolent and symbolic of imperial authority and natural forces. The dragon is also associated with water, rainfall, and agriculture—crucial elements for prosperity in ancient China.",
                symbolism: "Power and Protection: The dragon represents divine power, protection, and the emperor's rule over the natural world."
            },
            {
                title: "Imperial Symbol",
                date: "Imperial Era",
                content: "The dragon is often seen as a symbol of the emperor, who was believed to be the earthly incarnation of the dragon, and the Chinese imperial family used the dragon as their emblem.",
                symbolism: "Rain and Agricultural Fertility: The dragon's control over water symbolizes the agricultural abundance that is vital for survival and prosperity."
            },
            {
                title: "Natural Balance",
                date: "Throughout History",
                content: "In myth, the dragon controls the rain, which ensures bountiful crops and the survival of the people. The dragon's ability to control the elements makes it a symbol of harmony between the heavens and the earth.",
                symbolism: "Harmony Between Heaven and Earth: The dragon is seen as a mediator between the heavens (divine realm) and earth (human realm), ensuring balance and order."
            }
        ]
    },
    {
        name: "Wadjet the Serpent Goddess",
        location: [31.1967, 30.4833], // Buto/Dep location
        culture: "Egyptian",
        description: "Wadjet, the serpent goddess, inhabited the Nile river and was revered as the protector of Lower Egypt.",
        timeline: [
            {
                title: "Origins",
                date: "3100 BCE",
                content: "Originating from the city of Dep in the Nile Delta, her era dates back to pre-dynastic times. Wadjet was linked to the Eye of Ra, which represented the sun god's protective, yet destructive force.",
                symbolism: "The Eye of Ra: Wadjet was often depicted as the solar eye, symbolizing the sun god's power. This depiction highlighted her dual nature—protective to the faithful, destructive to threats."
            },
            {
                title: "Temple and Worship",
                date: "Ancient Egypt",
                content: "Her temple at Buto housed priests who continued her worship past her time, blending her role with Horus, the falcon god, after Egypt's unification. Archaeological finds, like cobra-shaped amulets, show her widespread influence.",
                symbolism: "Protection and Destruction: Wadjet symbolized a shield against destruction, with the potential for destruction of those infringing on her protection."
            },
            {
                title: "Guardian Deity",
                date: "Throughout Dynasty",
                content: "As a guardian deity, she embodied the state's stability and guidance, contrary to many serpent stories' role of terror and destruction.",
                symbolism: "The Cobra: Her serpent shape symbolized regeneration and eternal life, as snakes shed their skin to renew themselves. This tied Wadjet to the cycles of life and enduring the strength of temporary pharaohs' reign."
            }
        ]
    },
    {
        name: "Tiamat of Babylon",
        location: [32.5355, 44.4275], // Ancient Babylon
        culture: "Babylonian",
        description: "Tiamat is a central figure in Babylonian mythology and was the goddess of saltwater in the Enuma Elish, an epic from around 1200 BCE.",
        timeline: [
            {
                title: "Creation and Love",
                date: "Mythic Era",
                content: "She personified the chaotic waters of Babylon, yet embodied fertility as she hooked up with the freshwater god, Apsu, to produce the first deities, namely Lahmu.",
                symbolism: "Creation through Destruction: Her body, split by Marduk to form the earth and sky, symbolized the transformative power of destruction."
            },
            {
                title: "Betrayal and Vengeance",
                date: "Divine War",
                content: "This love story was short lived, Apsu attempted to murder their children as he saw them as 'noisy' and 'annoying'; once Tiamat became aware of these plans she became a force of vengeance with a burning desire to inflict terror.",
                symbolism: "Vengeance and Broken Trust: Apsu plotting to kill their children made Tiamat distraught, the betrayal catalyzed her to pursue a life inflicting chaos, revenge and vengeance upon the gods."
            },
            {
                title: "Cosmic Battle",
                date: "Creation of World",
                content: "Tiamat was eventually defeated by Marduk in battle, who used her remains to form the cosmos: her ribs to form the vault of heaven and earth, her eyes as sources for the Tigris and Euphrates rivers, and her tail to form the Milky Way.",
                symbolism: "Mother of Monsters: As the mother of gods and later monstrous creatures, Tiamat symbolized the duality of nurturing and chaos."
            }
        ]
    },
    {
        name: "Jörmungandr the World Serpent",
        location: [59.9139, 10.7522], // Norse region
        culture: "Norse",
        description: "Jörmungandr, also known as the Midgard Serpent, is a central figure in Norse mythology.",
        timeline: [
            {
                title: "Birth and Exile",
                date: "Before Ragnarök",
                content: "As one of the three chaotic children from Loki and Angrboda, Jörmungandr was cast into the ocean by Odin, where the serpent rapidly grew so large that it encircled Midgard.",
                symbolism: "Order vs. Chaos: Thor's ongoing battles with Jörmungandr reflect the eternal struggle between order and chaos."
            },
            {
                title: "Guardian of Boundaries",
                date: "World's Age",
                content: "This act turned Jörmungandr into a symbol of the world's boundary, separating Midgard from the vast, unknown waters. The serpent's fierce presence in the ocean also made it a force of chaos, associated with storms, unpredictable seas, and the destructive power of nature.",
                symbolism: "The Ocean's Power: Like the ocean, Jörmungandr is both life-giving and destructive, calm yet chaotic, symbolizing the duality of their unpredictable power."
            },
            {
                title: "Final Battle",
                date: "Ragnarök",
                content: "During a battle in the sea, Thor struck Jörmungandr so powerful, he shook the surface of the Earth. Jörmungandr then retaliated, spewing venom and lashing out with its massive tail; ultimately, Thor delivered the coup de grâce, crushing Jörmungandr's skull.",
                symbolism: "Doom's Inevitability: Jörmungandr's role in Ragnarök symbolizes unavoidable fate. No matter how strong Thor was, he couldn't escape his destined death after slaying the serpent."
            }
        ]
    },
    {
        name: "Feathered Serpent of Oaxaca",
        location: [17.0732, -96.7266], // Oaxaca region
        culture: "Mesoamerican",
        description: "The Feathered Serpent was a prominent deity in Mesoamerican religious traditions and took a significant role in the cultures of Oaxaca, notably the Zapotec civilizations.",
        timeline: [
            {
                title: "Divine Role",
                date: "Ancient Times",
                content: "Represented visually as a serpent with feathers, this figure symbolized the integration of physical and spiritual realms, while also acting as a deity of creation and fertility.",
                symbolism: "Knowledge and Creation: As a deity of wisdom, the Feathered Serpent embodies the pursuit of knowledge and creativity, often linked to teaching, writing, and the arts."
            },
            {
                title: "Cultural Impact",
                date: "Pre-Colonial Era",
                content: "Archaeological findings from key sites, including Monte Albán and Mitla, demonstrate its frequent influence in local art and artifacts. Within Zapotec belief systems, the deity is linked to the essence of humankind and the composite of all intellectual fields.",
                symbolism: "Renewal and Fertility: Known for its association with rain and agriculture, the Feathered Serpent signifies life, renewal, and the cycle of existence."
            },
            {
                title: "Legacy",
                date: "Colonial to Present",
                content: "Although Spanish colonization altered native beliefs, the Feathered Serpent continues to inspire regional folklore and artistic expression today, again symbolizing its roots in ancient civilization.",
                symbolism: "Integration of Physical and Spiritual Realms: It used its' earth bound serpent body in harmony with its' sky-reaching feathers to form a reality containing physical and spiritual aspects."
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
            <h2 class="myth-title" onclick="handleMythTitleClick(event, ${serpentLocations.indexOf(location)})">${location.name}</h2>
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

// Global function to handle myth title clicks
async function handleMythTitleClick(event, locationIndex) {
    event.preventDefault();
    
    if(locationIndex < 0 || locationIndex >= serpentLocations.length) {

        return;
    }
    const storyData = serpentLocations[locationIndex];
    // Store the data in localStorage since everything is a static file 
    localStorage.setItem('currentMythData', JSON.stringify(storyData));
    
    // Navigate to the myth page
    window.location.href = '/myth.html';
}

// Update the document click handler to only handle navigation buttons
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
            // Re-attach click handler to the new myth-title
            const mythTitle = popup.querySelector('.myth-title');
            if (mythTitle) {
                mythTitle.style.cursor = 'pointer';
            }
        }
    }
}

// Add markers for each location with the timeline popup styling
serpentLocations.forEach((location, index) => {
    const marker = L.marker(location.location, {
        icon: serpentIcon
    });
    
    // Added hover events for the title display
    marker.on('mouseover', () => {
        const hoverTitle = document.getElementById('hover-title');
        hoverTitle.textContent = location.name;
        hoverTitle.classList.add('visible');
    });

    marker.on('mouseout', () => {
        const hoverTitle = document.getElementById('hover-title');
        hoverTitle.classList.remove('visible');
    });
    
    const popup = L.popup({
        className: 'custom-popup',
        maxWidth: 400,
        closeButton: true,
        closeOnClick: false,
        autoClose: false
    }).setContent(createTimelineNavigation(location, 0));
    
    marker.bindPopup(popup);

    marker.on('click', () => {
        // Close any previously open popup
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
            .subtract([0, +mapHeight/4]); // Shift the point up by 1/4 of the map height
        
        // Convert back to LatLng and fly to that point
        const offsetLatLng = map.unproject(point, 6);
        
        // Fly to the location with animation
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
        activePopup = null;
    });

    marker.addTo(map);
}); 
let storyData = ""; //gets serpent data based on current location index. 

