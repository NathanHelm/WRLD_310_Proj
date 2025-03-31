const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let data = '';

// Serve static files
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());


// Handle all routes by serving index.html
app.post('/myth', (req, res) => {
    res.sendFile(path.join(__dirname, 'myth.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 