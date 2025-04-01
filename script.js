// Update the baseURL to work in both development and production
const baseURL = window.location.origin;

// Check if we're coming from myth.html
const fromMythPage = document.referrer.includes('myth.html');

// Check if this is a fresh session, for the snake character message popup
const isNewSession = !sessionStorage.getItem('hasVisitedInSession');
if (!fromMythPage && isNewSession) {
    sessionStorage.setItem('hasVisitedInSession', 'true');
}

// Add class to body based on whether this is a fresh session and not from myth.html
// This is so the snake character message popup only shows on the first visit to the page, and not when coming from the myth.html page.
document.body.classList.toggle('first-visit', !fromMythPage && isNewSession);

// Initialize variables for popup and timeline management
let activePopup = null;
let currentTimelineIndex = 0;
let currentLocationIndex = null;
let firstPinClicked = false;
let messageUpdated = false;

// Initialize the map with custom options
const map = L.map('map', {
    center: [20.0, 0.0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 8,
    zoomControl: true,
    worldCopyJump: true,
    fadeAnimation: false
});

// This changes the map color and the pin color and the pin popup color
const mapElement = document.querySelector('#map');
mapElement.style.filter = 'sepia(30%) brightness(105%) contrast(95%) saturate(85%)';

// This is the map style
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO',
    subdomains: 'abcd',
    maxZoom: 18,
    noFade: true
}).addTo(map);

// Prevent map from re-rendering by invalidating size after initial load
setTimeout(() => {
    map.invalidateSize();
}, 100);

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
        //new ones
    },
    {
        name: "Yamata no Orochi and Susanoo",
        location: [35.367, 132.755],
        culture: "Japanese",
        description: "The epic tale of the storm god Susanoo's battle with the eight-headed serpent Yamata no Orochi.",
        timeline: [
            {
                title: "The Serpent's Terror",
                date: "Ancient Times",
                content: "Yamata no Orochi was a colossal, eight-headed, eight-tailed serpent that terrorized the province of Izumo. Every year, it demanded a sacrifice: a young maiden. When Susanoo, the storm god, was banished from the heavens, he encountered an elderly couple, Kunitsukami, weeping. They revealed that their eighth and last daughter, Kushinada-hime, was to be Orochi's next victim.",
                symbolism: "Overcoming Chaos: Orochi represents natural disasters, floods, and the chaotic forces of nature that threaten human existence."
            },
            {
                title: "Susanoo's Strategy",
                date: "Divine Intervention",
                content: "Susanoo devised a plan. He instructed the couple to brew eight vats of strong sake and set them out for the serpent. When Orochi arrived, it drank the sake and fell into a deep slumber.",
                symbolism: "Divine Protection: Susanoo's role as a protector highlights the importance of divine intervention in safeguarding humanity from destructive forces."
            },
            {
                title: "The Sacred Sword",
                date: "Victory",
                content: "Susanoo then drew his sword, Totsuka-no-Tsurugi, and sliced the serpent into pieces. As he cut through one of the tails, he discovered the legendary sword Kusanagi-no-Tsurugi within. Susanoo then presented the sword to his sister, Amaterasu, as a peace offering.",
                symbolism: "Imperial Regalia: The discovery of Kusanagi-no-Tsurugi within Orochi's body connects the myth to the imperial lineage and the sacred power of the Japanese emperors."
            }
        ]
    },
    {
        name: "Ryūjin and the Sea's Bounty",
        location: [34.943627379693275, 138.4085850816026],
        culture: "Japanese",
        description: "The tale of Ryūjin, the guardian sea serpent who protected and provided for coastal villages.",
        timeline: [
            {
                title: "Guardian of the Sea",
                date: "Ancient Times",
                content: "In coastal villages, tales were told of Ryūjin, a massive sea serpent that resided in the depths of the ocean. While sometimes fearsome, Ryūjin was also seen as a guardian of the sea's bounty. Fishermen would offer prayers and small gifts to Ryūjin, seeking its favor for a plentiful catch.",
                symbolism: "Dual Nature of Nature: Ryūjin represents the dual nature of the sea, both dangerous and life-giving. It embodies the respect and reverence that humans must have for the natural world."
            },
            {
                title: "The Great Famine",
                date: "Time of Crisis",
                content: "One year, a severe famine struck the village. The fishermen, desperate, decided to make a grand offering to Ryūjin, hoping to appease its wrath and secure a source of food. They prepared a beautiful, decorated boat filled with the best of their harvest and set it adrift, carrying their prayers.",
                symbolism: "Balance and Harmony: The fishermen's offerings and Ryūjin's response illustrate the importance of maintaining balance and harmony with nature."
            },
            {
                title: "Divine Providence",
                date: "Salvation",
                content: "Ryūjin, accepting the offering, guided schools of fish towards the shore, saving the village from starvation. It was then understood that Ryūjin was not only a powerful being, but also a provider.",
                symbolism: "Divine Provision: Ryūjin's role as a provider highlights the belief that supernatural beings can influence the prosperity and survival of human communities."
            }
        ]
    },
    {
        name: "The Serpent of the Sacred Spring",
        location: [35.97701044451741, 137.03833272824994],
        culture: "Japanese",
        description: "The story of a benevolent serpent guardian of a healing spring in the mountains.",
        timeline: [
            {
                title: "The Sacred Guardian",
                date: "Ancient Times",
                content: "Deep within a mountainous region, there was a sacred spring, its waters believed to possess healing properties. A large, benevolent serpent was said to be the guardian of this spring, ensuring its purity and protecting it from those with ill intent.",
                symbolism: "Healing and Renewal: The serpent's guardianship of the spring symbolizes the healing and restorative powers of nature."
            },
            {
                title: "The Ill Traveler",
                date: "Time of Need",
                content: "A young, gravely ill traveler, guided by rumors of the spring's power, ventured into the mountains. Weak and desperate, he reached the spring and found the serpent coiled beside it. The serpent, sensing his pure heart, allowed him to drink from the spring.",
                symbolism: "Purity and Protection: The serpent's protection of the spring represents the importance of preserving the sacred and pure aspects of the natural world."
            },
            {
                title: "Sacred Knowledge",
                date: "Divine Gift",
                content: "The traveler was miraculously healed, and in gratitude, he vowed to protect the sanctity of the spring. The serpent, pleased with his sincerity, revealed ancient secrets of healing and herbal remedies.",
                symbolism: "Wisdom and Guidance: The serpent's role as a guardian and teacher highlights its association with wisdom and spiritual guidance."
            }
        ]
    },
    {
        name: "Amaru of the Andes",
        location: [-7.295871033873188, -77.63304292889165],
        culture: "Andean",
        description: "The powerful serpent deity that controlled the water cycle and maintained cosmic balance in Andean mythology.",
        timeline: [
            {
                title: "Cosmic Force",
                date: "Ancient Times",
                content: "Amaru's presence in Andean cosmology is deeply intertwined with the concept of 'Pacha,' which encompasses both space and time. It's not merely a physical serpent but a manifestation of the earth's vital forces. Amaru's dwelling places are often described as subterranean lakes or rivers, linking it to the underworld ('Uku Pacha').",
                symbolism: "Cyclical Time: Amaru's connection to the water cycle reinforces the Andean concept of cyclical time, where destruction and renewal are intertwined."
            },
            {
                title: "Divine Power",
                date: "Throughout History",
                content: "In Inca art and iconography, Amaru is frequently depicted with a combination of serpentine and feline features, emphasizing its power and ferocity. It's often shown with wings, symbolizing its ability to traverse different realms. The Inca believed that Amaru's movements influenced the water cycle, which was crucial for their agricultural society.",
                symbolism: "Connection to the Underworld: Uku Pacha was the source of life-giving waters, but also the place of death and origins."
            },
            {
                title: "Water's Origin",
                date: "Creation Time",
                content: "Stories tell of Amaru's role in the origin of rivers and lakes. It was believed that Amaru's tears or bodily fluids formed the water sources that sustained life in the Andes. When Amaru was angered or disturbed, it could cause devastating floods or earthquakes. To appease Amaru, they performed rituals involving offerings of coca leaves, chicha (corn beer), and precious objects.",
                symbolism: "Social and Agricultural Dependence: The Incan empire was built on a complex agricultural system. The Amaru myth reinforced the idea that humans were dependent on the forces of nature."
            }
        ]
    },
    {
        name: "The Horned Serpent",
        location: [46.96609557797087, -103.29710386833581],
        culture: "Indigenous North American",
        description: "A powerful serpent being revered across various Indigenous nations, known for its spiritual power and connection to water.",
        timeline: [
            {
                title: "Sacred Being",
                date: "Ancient Times",
                content: "The Horned Serpent's appearance and characteristics vary significantly across different Indigenous nations. For example, among the Cherokee, Uktena is often described as a large, scaly serpent with a crystal on its forehead, which is a source of powerful magic. It's considered a dangerous creature, associated with storms and lightning.",
                symbolism: "Duality of Nature: The Horned Serpent's dual nature, both benevolent and malevolent, reflects the Indigenous understanding of the natural world as a complex and dynamic force."
            },
            {
                title: "Guardian Spirit",
                date: "Throughout Time",
                content: "In other traditions, the Horned Serpent is seen as a benevolent being, a guardian of sacred springs and rivers. It's believed to possess healing powers and the ability to control the weather. Some stories tell of it guiding lost travelers or providing rain during droughts.",
                symbolism: "Connection to Water and Life: Water is essential for life, and the Horned Serpent's association with it highlights its role as a life-giving force."
            },
            {
                title: "Sacred Power",
                date: "Eternal",
                content: "The Horned Serpent is often depicted in rock art and ceremonial objects, reflecting its importance in Indigenous spiritual beliefs. Its horns are often seen as symbols of its connection to the spirit world, and its scales are sometimes associated with the patterns of water or the earth. Stories also talk about the scales of the horned serpent being used in medicine, and the crystal in its forehead being a powerful tool for shamans.",
                symbolism: "Spiritual Knowledge and Power: The Horned Serpent's horns and crystal symbolize its connection to spiritual knowledge and power, which are often reserved for shamans and other spiritual leaders."
            }
        ]
    },
    {
        name: "Danh the Rainbow Serpent",
        location: [7.603323267182453, 5.5114832653349755],
        culture: "West African",
        description: "The cosmic serpent that encircles the world and maintains universal balance in Dahomey mythology.",
        timeline: [
            {
                title: "Cosmic Guardian",
                date: "Creation Time",
                content: "Danh's role as the serpent that encircles the world is central to the Dahomey creation myth. It's believed that Danh's movements maintain the balance of the cosmos, preventing the earth from disintegrating.",
                symbolism: "Cosmic Stability: Danh's role in maintaining cosmic stability reflects the Dahomey belief in a structured and ordered universe."
            },
            {
                title: "Rainbow Manifestation",
                date: "Throughout Time",
                content: "Danh is also associated with the rainbow, which is seen as a manifestation of its presence. The rainbow is considered a symbol of prosperity and good fortune, reinforcing Danh's connection to wealth.",
                symbolism: "Interconnectedness: The concept of Danh encircling the world emphasizes the interconnectedness of all things, both physical and spiritual."
            },
            {
                title: "Divine Balance",
                date: "Eternal",
                content: "In Dahomey rituals, Danh is often represented by snakes or serpentine figures. Offerings of food and drink are made to honor Danh and ensure its continued benevolence. Danh is also a being of androgynous nature, representing the balance of male and female forces within the universe.",
                symbolism: "Prosperity and Fertility: Danh's association with the rainbow and wealth highlights the connection between the natural world and human prosperity and fertility."
            }
        ]
    }
];

// Create custom icons for each culture/myth with different colors
const serpentIcons = {
    // Greek Mythology - Red
    "Python and Apollo at Delphi": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "Medusa the Gorgon": L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
    }),
    
    // Chinese Mythology - Purple
    "Nuwa and Fuxi": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "White Snake Legend": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "Dragon-Serpent Connection": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // Egyptian Mythology - Yellow
    "Wadjet the Serpent Goddess": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // Babylonian Mythology - Orange
    "Tiamat of Babylon": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // Norse Mythology - Blue
    "Jörmungandr the World Serpent": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // Mesoamerican Mythology - Green
    "Feathered Serpent of Oaxaca": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // Japanese Mythology - Orange Dark
    "Yamata no Orochi and Susanoo": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "Ryūjin and the Sea's Bounty": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    "The Serpent of the Sacred Spring": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // Andean Mythology - Gold
    "Amaru of the Andes": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // Indigenous North American - Black
    "The Horned Serpent": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    
    // West African - Grey
    "Danh the Rainbow Serpent": L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
};

// Function to create timeline navigation
// If you change the map color. No matter what the color is set to in this section. It will stay as the map color:. 
// const mapElement = document.querySelector('#map');
// mapElement.style.filter = 'sepia(30%) brightness(105%) contrast(95%) saturate(85%)';
// And I have no clue why. Probably something with leaflet.js.
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

// Global function to handle myth title clicks. 
// This is the function that is called when you click on a myth title.
// Goes to the respectivemyth.html page.
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
// Navigates the timeline cards.
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
            // This is so the myth title can be clicked again on any timeline card.
            const mythTitle = popup.querySelector('.myth-title');
            if (mythTitle) {
                mythTitle.style.cursor = 'pointer';
            }
        }
    }
}

// Function to update guide message. There's only two guide messages.
function updateGuideMessage(message) {
    const guideBubble = document.querySelector('.character-bubble p');
    if (guideBubble) {
        guideBubble.textContent = message;
    }
}

// Function to hide guide
// This is the function that is called when you click on the close button.
function hideGuide() {
    const guide = document.querySelector('.guide-character');
    if (guide) {
        guide.classList.add('fade-out');
        setTimeout(() => {
            guide.style.display = 'none';
        }, 400);
    }
}

// Add click handler for the close button
document.querySelector('.close-guide').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    hideGuide(); // The above function is called.
});

// Hides second guide message if the myth title is clicked.
document.addEventListener('click', (e) => {
    if (firstPinClicked && messageUpdated && !e.target.classList.contains('nav-button') && 
        !e.target.classList.contains('leaflet-marker-icon') && 
        !e.target.classList.contains('close-guide')) {
        hideGuide();
    }
});

// Adds markers for each location with the timeline popup styling.
serpentLocations.forEach((location, index) => {
    const marker = L.marker(location.location, {
        icon: serpentIcons[location.name]
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

    // Add click handler for marker. This shows the second message if any pin is clicked.
    marker.on('click', () => {
        if (!firstPinClicked && isNewSession) {
            firstPinClicked = true;
            messageUpdated = true;
            updateGuideMessage("Once you've clicked on a pin, click on the myth's title to see more information!");
        }
    });

    // This is the popup that shows the timeline cards.
    const popup = L.popup({
        className: 'custom-popup',
        maxWidth: 500,
        closeButton: true,
        closeOnClick: false,
        autoClose: false
    }).setContent(createTimelineNavigation(location, 0));
    
    marker.bindPopup(popup);

    marker.on('click', () => {
        // Close any previously open popup when navigating to a new location.
        if (activePopup && activePopup !== popup) {
            activePopup.close();
        }
        activePopup = popup;
        currentLocationIndex = index;
        currentTimelineIndex = 0;

        // All below is for zooming in on the clicked pin.
        // Get the map container size.
        const mapHeight = map.getContainer().clientHeight;
        
        // Calculate an offset point to position the marker lower in the viewport
        const point = map.project(location.location, 6)
            .subtract([0, +mapHeight/4]);
        
        // Convert back to LatLng and fly to that point
        const offsetLatLng = map.unproject(point, 6);
        
        // Fly to the location with animation
        map.flyTo(offsetLatLng, 6, {
            duration: 1.5, // This is the duration of the zoom in animation.
            easeLinearity: 0.25 // This is the ease/speed of the zoom in animation.
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

