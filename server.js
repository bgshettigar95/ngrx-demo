const express = require('express');
var cors = require("cors");
const employeeData= [
    { id: 1, name: "Nisha Sahu", email: "nisha@gmail.com", experience: 'Fresher 1 years', contactNo: 8458399912, skills: "angular,JS,CSS,HTML" },
    { id: 2, name: "Heena Khan", email: "heena@gmail.com", experience: 'Experienced 4 years', contactNo: 8458356812, skills: "Java" },
    { id: 3, name: "John Doe", email: "john@gmail.com", experience: 'Fresher 1 years', contactNo: 8458356812, skills: "angular,React, HTML" },
  ];

// create new express app and save it as "app"
const app = express();
app.use(cors());
// server configuration
const PORT = 8080;

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/employees', (req, res) => {
    // res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(employeeData));
   
  });

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});