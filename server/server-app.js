var express = require("express");
var path = require("path");
var helmet = require("helmet");
var argv = require('optimist').argv;
var Client = require("./mongoClient");
var Services = require('./services/profileService');
var app = express();

// app.use(helmet);
app.use('/static', express.static(path.join(__dirname, '../dist')));
app.get('/', function (req, res) {
  // res.send("Hello World");
  res.sendFile(path.join(__dirname, "../index.html"));
});

var connectionString = Client.getConnectionUrl(argv.user, argv.pass);

Client.openConnection(connectionString)
  .then(function (db) {
    console.log('connected to mongoDB');
    var services = Services(db);

    app.get('/profiles', function (req, res) {
      services.getAllProfiles(20)
        .then(function (docs) {
          res.json(docs);
        });
    });

    app.get('/profileSnap/:limit', function (req, res) {
      services.getProfileSnap(parseInt(req.params.limit, 10))
        .then(function (docs) {
          res.json(docs);
        });
    });

    app.get('/industries', function (req, res) {
      services.getIndustries()
        .then(function (docs) {
          res.json(docs);
        })
        .catch(function (ex){
          res.json('sawwwry ', ex);
        });
    });

    app.get('/locations', function (req, res) {
      services.getLocations()
        .then(function (docs) {
          res.json(docs);
        })
        .catch(function (ex){
          res.json('sawwwry ', ex);
        });
    });

    app.get('/seniorityLevels', function (req, res) {
      services.getSeniorityLevels()
        .then(function (docs) {
          res.json(docs);
        })
        .catch(function (ex){
          res.json('sawwwry ', ex);
        });
    });

    var listener = app.listen(3000, function () {
      console.log(`listening on port: ${listener.address().port}`);
    });
  })
  .catch(function (ex) {
    console.log('connection failed :(', ex);
  });
