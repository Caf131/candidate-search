var express = require("express");
var path = require("path");
var helmet = require("helmet");
var argv = require('optimist').argv;
var Client = require("./mongoClient");
var Services = require('./services/mongo-services');
var app = express();

// app.use(helmet);
app.use('/static', express.static(path.join(__dirname, '../dist')));
app.get('/', function (req, res) {
  // res.send("Hello World");
  res.sendFile(path.join(__dirname, "../index.html"));
});

var connectionString = Client.getConnectionUrl(argv.user, argv.pass);
console.log('connectionString => ', connectionString); 

Client.openConnection(connectionString)
  .then(function (db) {
    console.log('connected to mongoDB');
    var services = Services(db);

    app.get('/profiles', function (req, res) {
      services.getAllProfiles(1)
        .then(function (docs) {
          res.send(docs);
        })
    });

    app.listen(3000, function () {
      console.log("listening");
    });
  })
  .catch(function (ex) {
    console.log('connection failed :(');
  });