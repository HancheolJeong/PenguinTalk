require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const userController = require("./controllers/userController.js");
const router = require('./routes/routes')
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use((req, res, next) => { // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send('Not Found');
});

// simple route
// app.get("/", (req, res) => {
//   res.senfFile(path.join(__dirname, 'react-app/build/index.html'));
//   console.log(__dirname, 'react-app/build/index.html');
// });

// app.use(express.static(path.join(__dirname, 'react-app/build')));

// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, 'react-app/build/index.html'));
//   console.log(__dirname, 'react-app/build/index.html');
// })



// require('./routes/routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});