var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var XLSX = require('xlsx');
var Location = require('./server/models/locations');
var City = require('./server/models/cities');

var config = require('./server/config');
var database = require('./server/database');
database.connect();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//XCEL PARSER STUFF

var workbook = XLSX.readFile('CRWB.xlsx');
var first_sheet_name = workbook.SheetNames[0];
var locationKey = 'B7';

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
var desired_cell = worksheet[locationKey].v;



// var globs = [];
// var cities = [];

// for (var i = 6; i < 3694; i++) {
//   if (worksheet['E'+ i].v.toString().trim().charAt(0) != '0' && worksheet['E'+ i].v.toString().trim() != 'All Other'.toString().trim()) {
//     var city = {};
//     city.cityName = worksheet['E'+ i].v;
//     city.cityKey = worksheet['D'+ i].v;
//     cities.push(city)
//   };
// };

// cities.forEach(function(item){
//   var city = new City();
//   city.name = item.cityName.trim();
//   city.key = item.cityKey.trim();
//   city.save();
// });

// for (var i = 7; i < 3694; i++) {
//   if(worksheet['B'+ i].v.charAt(worksheet['B'+ i].v.length -1) != '0'){
//       var glob = {};
//       glob.locationKey = worksheet['B'+ i].v;
//       glob.cty = worksheet['B'+ i].v.slice().slice(0,3);
//       glob.twp = worksheet['B'+ i].v.slice().slice(3,7);
//       glob.rge = worksheet['B'+ i].v.slice().slice(7);
//       glob.wheat = [ { 'Basic': worksheet['H' + i].v },  { 'DXS5': worksheet['I'+ i].v },  { 'DDA': worksheet['J' + i].v },   { 'DXS1': worksheet['K' + i].v },   { 'DD20': worksheet['L' + i].v },  { 'XS20IP': worksheet['M' + i].v },  { '80MIN': worksheet['N' + i].v } ];
//       glob.barley = [ { 'Basic': worksheet['P' + i].v },  { 'DXS5': worksheet['Q'+ i].v },  { 'DDA': worksheet['R' + i].v },   { 'DXS1': worksheet['S' + i].v },   { 'DD20': worksheet['T' + i].v },  { 'XS20IP': worksheet['U' + i].v },  { '80MIN': worksheet['V' + i].v } ];
//       globs.push(glob)
//     }
// };


// globs.forEach(function(item){
//   var location = new Location();
//   location.locationKey = item.locationKey.trim();
//   location.cty = item.cty;
//   location.twp = item.twp;
//   location.rge = item.rge;
//   location.wheat = item.wheat;
//   location.barley = item.barley;
//   location.save();
// });




app.get('/api/locations', function(req, res){
  Location.find(function(err, locations){
    if(err){
      res.send(err)
    } else {
      res.json(locations)
    }
  })
});

app.get('/api/locationkey/:key', function(req, res){
  Location.find({locationKey: req.params.key},function(err, locations){
    if(err){
      res.send(err)
    } else {
      res.json(locations)
    }
  })
});

app.get('/api/cities', function(req, res){
  City.find(function(err, city){
    if(err){
      res.send(err)
    } else {
      res.json(city)
    }
  })
});


if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading

  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var watcher = chokidar.watch('./server');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });
}
app.use(express.static('public'));
app.use('/img', express.static('img'));



app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the webserver
var port = config.PORT;
var hostname = config.HOSTNAME;
app.listen(port, hostname, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://' + hostname + ':' + port);
});
