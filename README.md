# Medieval Serpent Mythology Map

An interactive web map showcasing serpent mythology from various cultures. The map features a historical base map with interactive markers that reveal the stories and timelines of different serpent-related myths.

## Features

- Historical world map base layer
- Interactive markers for mythological locations
- Timeline-based story navigation for each location
- Smooth animations and transitions
- Medieval-styled interface

## Setup

1. Clone the repository:
```bash
git clone https://github.com/NathanHelm/WRLD_310_Proj.git
```

2. Open `index.html` in a web browser to view the map.

## Adding New Locations

To add new serpent mythology locations, edit the `serpentLocations` array in `script.js`. Each location should follow this format:

```javascript
{
    name: "Location Name",
    location: [latitude, longitude],
    description: "Brief description",
    timeline: [
        {
            title: "Event Title",
            date: "Time Period",
            content: "Event description"
        }
        // Add more timeline events...
    ]
}
```

## Technologies Used

- Leaflet.js for mapping
- IIIF for historical map tiles



