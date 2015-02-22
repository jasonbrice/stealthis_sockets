
app = require('express.io')()

app.http().io()

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html')
})

var port = process.env.PORT || 3101;

app.io.route('ready', function(req){
  req.io.emit('status', 'A full-on websocket is at your service (' + new Date().toString() + ')');
})

// New code below! 

// Set up a connection to our database with a new Knex instance
var pg = require('knex')({
  client: 'pg',  debug: true,  connection: "postgres://mfifoqjd:XXDvFRnMPlhOh5Kwz9R_s7W3PVD9M7hy@babar.elephantsql.com:5432/mfifoqjd"  ,
  pool: {    min: 2,    max: 10  }
});

// Bring in Bookshelf!
var Bookshelf = require('bookshelf');
Bookshelf.DB = Bookshelf.initialize( pg );

app.io.route('person', require('./realtime_routes/person'));
app.io.route('login', require('./realtime_routes/login'));
app.io.route('address', require('./realtime_routes/address'));

// End of new code!

console.log("steal this tech is listening on port " + port);
app.listen(port);
