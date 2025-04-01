let mapData; 
// This is the base URL for the server. Not needed for live.
const baseURL = "http://localhost:3000";

// Detailed myths with extended information
const mythDetails = {
    "Python and Apollo at Delphi": {
        mainImage: "images/delphi.jpg",
        additionalContent: {
            fullStory: "In Greek mythology, Python was a gigantic serpent that resided in the sacred cave of Delphi, guarding the ancient sanctuary. Python's role was to protect the Oracle of Gaia, a mystical site where prophecies were revealed. As the myth goes, Apollo, the god of prophecy, music, and light, was determined to take control of Delphi. In order to establish his own Oracle and become the divine protector of the site, Apollo had to defeat Python. Apollo, in a dramatic confrontation, killed Python with his arrows. In some versions of the story, Apollo's arrows were poisoned, and in others, they were said to have been imbued with the power of the sun. After slaying the serpent, Apollo purified himself and founded the Oracle of Delphi, which became one of the most significant religious sites in the ancient world. It was here that people from across the Greek world would come to receive prophecies from the god.",
            historicalContext: "The Oracle of Delphi was the most important shrine in ancient Greece, considered the 'navel' of the world. The Python myth explains its sacred origins and Apollo's dominion over prophecy.",
            culturalImpact: "This story represents the Greek transition from earth-based to sky-god worship, as Apollo's victory over Python symbolized the shift from ancient chthonic (earth) deities to the Olympian pantheon.",
            modernInterpretation: "The battle between Python and Apollo can be seen as the eternal struggle between chaos and order, darkness and light, representing humanity's constant effort to find meaning and structure in a chaotic world.",
        
        }
    },
    "Medusa the Gorgon": {
        mainImage: "images/medusa.jpg",
        additionalContent: {
            fullStory: "Medusa was once a beautiful mortal woman, but her beauty attracted the attention of Poseidon, who pursued her relentlessly. In some versions of the myth, Poseidon raped Medusa in Athena's temple, desecrating the holy space. Athena, enraged by this violation of her temple, punished Medusa by turning her into a Gorgon, a terrifying creature with snakes for hair and the ability to turn anyone who looked at her into stone. Medusa was banished to a desolate island, where she lived in isolation, her gaze a constant threat to anyone who came near. The hero Perseus, tasked with obtaining Medusa's head by King Polydectes, set off on a perilous journey to find and slay the Gorgon. With the help of Athena's shield, Hermes' winged sandals, and a special sword, Perseus was able to approach Medusa without looking directly at her. He used the reflection in his shield to avoid her petrifying gaze, and with a swift strike, he beheaded her. From her blood, the winged horse Pegasus was born.",
            historicalContext: "The myth of Medusa has evolved significantly over time. In earliest depictions, she was born a Gorgon, but later versions humanized her origin, making her story a tragic tale of divine punishment.",
            culturalImpact: "Medusa has become a powerful feminist symbol in modern times, with her story being reinterpreted as one of female power and the consequences of patriarchal oppression.",
            modernInterpretation: "The petrifying gaze of Medusa can be interpreted as a metaphor for the paralyzing effect of trauma, while her eventual beheading by Perseus represents the possibility of overcoming one's fears.",
       
        }
    },
    "Nuwa and Fuxi": {
        mainImage: "images/nuwa-fuxi.jpg",
        additionalContent: {
            fullStory: "Nuwa and Fuxi are among the most revered deities in Chinese mythology, often depicted with serpent-like lower bodies. According to the myth, after a great cosmic disaster that left the sky fractured and the earth in disarray, Nuwa and Fuxi came to the rescue. Nuwa repaired the broken sky with the help of five-colored stones, preventing the collapse of the heavens. Meanwhile, Fuxi taught humanity how to fish, hunt, and develop civilization. Together, they are credited with creating humanity. Nuwa crafted the first humans from clay, shaping them one by one. She later perfected her method by dipping a rope into the river, and the drops that fell from it became human beings. Fuxi, known for his wisdom and guidance, brought civilization to the people, teaching them to fish, trap, and live harmoniously with nature. These two deities are often depicted with snake-like bodies as a symbol of their connection to the natural world and divine power.",
            historicalContext: "In Chinese mythology, Nuwa and Fuxi represent the perfect balance of yin and yang. Their story dates back to the earliest Chinese texts and appears in various forms across different periods.",
            culturalImpact: "Their legacy continues in Chinese culture through wedding customs, where the dragon and phoenix (representing male and female) symbolize marital harmony, much like Nuwa and Fuxi's partnership.",
            modernInterpretation: "Their creation of humanity from clay represents the divine origin of human consciousness and creativity, while their serpentine forms connect humanity to both earth and heaven.",
            detailedSymbolism: [
                "Creation and Balance: Nuwa and Fuxi's roles as creators and their repair of the sky symbolize balance and harmony in the universe.",
                "Duality and Interdependence: The brother-sister duo represents duality, with one repairing the sky and the other teaching civilization, symbolizing how complementary forces work together for the greater good.",
                "Serpent-like Form and Divine Nature: The serpentine features of Nuwa and Fuxi connect them to the earth, nature, and divine power, reinforcing their role as celestial beings who bridge the human and divine realms."
            ]
        }
    },
    "White Snake Legend": {
        mainImage: "images/White-Snake.webp",
        additionalContent: {
            fullStory: "The Legend of the White Snake tells the tragic love story between a woman and a serpent spirit. A powerful serpent spirit, who had lived for centuries, transformed into a beautiful woman named Madame White Snake. During her time in human form, she met and fell in love with a kind-hearted man named Xu Xian, who was unaware of her true nature. They married, but a Buddhist monk named Fa Hai soon discovered Madame White Snake's true identity. He saw her as a dangerous being, and fearing the chaos she could cause, he forced her to reveal her serpent form. With great sorrow, Madame White Snake was imprisoned beneath the Leifeng Pagoda, where she remains for centuries. However, she continues to send her husband dreams and signs of her love, and eventually, their love transcends the barriers of life and death.",
            historicalContext: "The White Snake Legend has been told for over a thousand years, originating in the Tang Dynasty and gaining popularity during the Ming Dynasty.",
            culturalImpact: "This story has been adapted countless times in Chinese opera, literature, film, and television, becoming one of the most beloved folk tales in Chinese culture.",
            modernInterpretation: "The story challenges traditional views of good and evil, suggesting that true love can transcend physical form and societal prejudices.",
       
        }
    },
    "Dragon-Serpent Connection": {
        mainImage: "images/chinese-dragon-serpent.webp",
        additionalContent: {
            fullStory: "In Chinese culture, the dragon is one of the most powerful and revered creatures, often depicted as a snake-like being with divine and celestial power. Unlike Western dragons, which are typically feared, Chinese dragons are considered benevolent and symbolic of imperial authority and natural forces. The dragon is also associated with water, rainfall, and agriculture—crucial elements for prosperity in ancient China. The dragon is often seen as a symbol of the emperor, who was believed to be the earthly incarnation of the dragon, and the Chinese imperial family used the dragon as their emblem. In myth, the dragon controls the rain, which ensures bountiful crops and the survival of the people. The dragon's ability to control the elements makes it a symbol of harmony between the heavens and the earth.",
            historicalContext: "Chinese dragons evolved from early serpent worship, combining features of multiple animals to create a being of supreme power and wisdom.",
            culturalImpact: "The dragon remains a powerful symbol in Chinese culture, representing good fortune, strength, and imperial authority.",
            modernInterpretation: "Unlike Western dragons, Chinese dragons represent beneficial forces of nature and continue to symbolize prosperity and power in modern Asian culture.",
           
        }
    },
    "Wadjet the Serpent Goddess": {
        mainImage: "images/Wadjet.png",
        additionalContent: {
            fullStory: "In ancient Egypt, Wadjet the serpent goddess inhabited the Nile river and was revered as the protector of Lower Egypt. Described as a cobra, many looked to her for sovereignty and divine power, even being depicted on the pharaoh's crown. Originating from the city of Dep in the Nile Delta, her era dates back to pre-dynastic times, around 3100 BCE. Wadjet was linked to the Eye of Ra, which represented the sun god's protective, yet destructive force. Her temple at Buto housed priests who continued her worship past her time, blending her role with Horus, the falcon god, after Egypt's unification. Archaeological finds, like cobra-shaped amulets, show her widespread influence. As a guardian deity, she embodied the state's stability and guidance, contrary to many serpent stories' role of terror and destruction.",
            historicalContext: "Wadjet's worship predates unified Egypt, and her symbol became part of the pharaoh's crown as the uraeus, representing divine protection and royal authority.",
            culturalImpact: "Her image as a cobra became one of the most recognizable symbols of ancient Egyptian royalty and divine protection.",
            modernInterpretation: "Wadjet represents the protective aspect of feminine power, showing how ancient Egyptians viewed certain serpents as guardians rather than threats.",
       
        }
    },
    "Tiamat of Babylon": {
        mainImage: "images/tiamat.png",
        additionalContent: {
            fullStory: "Tiamat is a central figure in Babylonian mythology and was the goddess of saltwater in the Enuma Elish, an epic from around 1200 BCE. She personified the chaotic waters of Babylon, yet embodied fertility as she hooked up with the freshwater god, Apsu, to produce the first deities, namely Lahmu. This love story was short lived, Apsu attempted to murder their children as he saw them as 'noisy' and 'annoying'; once Tiamat became aware of these plans she became a force of vengeance with a burning desire to inflict terror. She then birthed monstrous creatures, like scorpion-men and evil serpents, to wage war against the new gods. Tiamat was eventually defeated by Marduk in battle, who used her remains to form the cosmos: her ribs to form the vault of heaven and earth, her eyes as sources for the Tigris and Euphrates rivers, and her tail to form the Milky Way.",
            historicalContext: "The Enuma Elish, where Tiamat's story is told, was recited during the Babylonian New Year festival, representing the cyclical nature of chaos and order.",
            culturalImpact: "Tiamat's story influenced many later creation myths and continues to inspire modern fantasy and science fiction.",
            modernInterpretation: "Her story represents the eternal cycle of creation requiring destruction, and how order emerges from chaos.",
         
        }
    },
    "Jörmungandr the World Serpent": {
        mainImage: "images/jormungandr.jpg",
        additionalContent: {
            fullStory: "Jörmungandr, also known as the Midgard Serpent, is a central figure in Norse mythology. As one of the three chaotic children from Loki and Angrboda, Jörmungandr was cast into the ocean by Odin, where the serpent rapidly grew so large that it encircled Midgard. This act turned Jörmungandr into a symbol of the world's boundary, separating Midgard from the vast, unknown waters. The serpent's fierce presence in the ocean also made it a force of chaos, associated with storms, unpredictable seas, and the destructive power of nature. Despite being exiled, Jörmungandr remained deeply correlative to the fate of the gods, namely the famous Thor. During a battle in the sea, Thor struck Jörmungandr so powerful, he shook the surface of the Earth. Jörmungandr then retaliated, spewing venom and lashing out with its massive tail; ultimately, Thor delivered the coup de grâce, crushing Jörmungandr's skull.",
            historicalContext: "The World Serpent represents the Norse understanding of the world's boundaries and the cosmic forces that both maintain and threaten creation.",
            culturalImpact: "Jörmungandr appears in medieval Scandinavian art and literature, symbolizing both the surrounding ocean and the forces of chaos.",
            modernInterpretation: "The serpent encircling the world can be seen as representing the cyclical nature of existence and the delicate balance of cosmic forces.",
     
        }
    },
    "Feathered Serpent of Oaxaca": {
        mainImage: "images/fethered-serpent.webp",
        additionalContent: {
            fullStory: "The Feathered Serpent was a prominent deity in Mesoamerican religious traditions and took a significant role in the cultures of Oaxaca, notably the Zapotec civilizations. Represented visually as a serpent with feathers, this figure symbolized the integration of physical and spiritual realms, while also acting as a deity of creation and fertility. Archaeological findings from key sites, including Monte Albán and Mitla, demonstrate its frequent influence in local art and artifacts. Within Zapotec belief systems, the deity is linked to the essence of humankind and the composite of all intellectual fields; its role in shaping cultural practices highlight its' foundational importance. Ceremonies and rituals aimed to honor the deity, ensuring agricultural prosperity and community well-being. Although Spanish colonization altered native beliefs, the Feathered Serpent continues to inspire regional folklore and artistic expression today, again symbolizing its roots in ancient civilization.",
            historicalContext: "The Feathered Serpent deity has roots in early Mesoamerican civilization, appearing in various forms across different cultures and time periods.",
            culturalImpact: "Archaeological evidence shows the widespread influence of this deity in art, architecture, and religious practices throughout ancient Mesoamerica.",
            modernInterpretation: "The combination of bird and serpent represents the unification of sky and earth, spiritual and physical realms, making it a symbol of wholeness and transcendence.",
         
        }
    }
};

// Image mapping for each myth
// Maps it to the name in the mythDetails object.
const mythImages = {
    "Python and Apollo at Delphi": "myth_profile_photos/Apollo-and-Python.jpeg",
    "Medusa the Gorgon": "myth_profile_photos/medusa.jpg",
    "Nuwa and Fuxi": "myth_profile_photos/nuwa.webp",
    "Jörmungandr the World Serpent": "myth_profile_photos/Jor.jpg",
    "Feathered Serpent of Oaxaca": "myth_profile_photos/fethered-serpent.webp",
    "Wadjet the Serpent Goddess": "myth_profile_photos/Wadjet.png",
    "Tiamat of Babylon": "myth_profile_photos/tiamat.png",
    "Dragon-Serpent Connection": "myth_profile_photos/chinese-dragon-serpent.webp",
    "White Snake Legend": "myth_profile_photos/White-Snake.webp"
};

// Function to load myth data from localStorage and combine with detailed information
// This takes info from the script.js file and combines it with the mythDetails object.
function loadMythData() {
    try {
        const data = JSON.parse(localStorage.getItem('currentMythData'));
        
        if (!data) {
            throw new Error('No myth data available'); // This should ask the user to return to the map and try again. Instead of an error message.
        }

        // Get additional details for this myth
        const details = mythDetails[data.name];
        
        // Update the page content
        document.getElementById('mythTitle').textContent = data.name;
        document.getElementById('mythCulture').textContent = data.culture + ' Mythology';
        
        // Create the full story content
        let storyContent = `
            <div class="myth-introduction">
                ${mythImages[data.name] ? `
                    <div class="myth-image">
                        <img src="${mythImages[data.name]}" alt="${data.name}" />
                    </div>
                ` : ''}
                <p class="myth-description">${details.additionalContent.fullStory}</p>
                <div class="historical-context">
                    <h3>Historical Context</h3>
                    <p>${details.additionalContent.historicalContext}</p>
                </div>
            </div>

            <div class="myth-timeline">
                <h3>Timeline of Events</h3>
                ${data.timeline.map(event => `
                    <div class="timeline-event">
                        <h4>${event.title}</h4>
                        <p class="event-date"><em>${event.date}</em></p>
                        <p class="event-content">${event.content}</p>
                        <div class="event-symbolism">
                            <strong>Symbolism:</strong> ${event.symbolism}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="myth-analysis">
                <h3>Cultural Impact</h3>
                <p>${details.additionalContent.culturalImpact}</p>

                <h3>Modern Interpretation</h3>
                <p>${details.additionalContent.modernInterpretation}</p>
            </div>
        `;
        
        document.getElementById('mythContent').innerHTML = storyContent;

    } catch (error) {
        console.error('Error loading myth data:', error);
        document.getElementById('mythContent').innerHTML = '<p>Error loading myth data. Please return to the map and try again.</p>';
    }
}

// Load the myth data when the page loads
window.addEventListener('load', loadMythData);