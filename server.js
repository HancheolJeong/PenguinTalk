const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'react-app/build')));

// simple route
// app.get("/", (req, res) => {
//   res.senfFile(path.join(__dirname, 'react-app/build/index.html'));
//   console.log(__dirname, 'react-app/build/index.html');
// });

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'react-app/build/index.html'));
  console.log(__dirname, 'react-app/build/index.html');
})

// require("./routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});