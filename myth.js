let mapData; 
const baseURL = "http://localhost:3000";
window.addEventListener('load', function() {

    const mythURL = baseURL + "/myth";

   fetch('/myth')
  .then(responseData => {
    
  })
  .catch(error => console.error('Error fetching data:', error));
    

});