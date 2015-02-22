
app = require('express.io')()

app.http().io()

// Send the client HTML/JS 
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html')
})

var port = process.env.PORT || 3101;

// Listen for a client to emit the ready event, 
// then respnse with a status event
app.io.route('ready', function(req){
  req.io.emit('status', 'A full-on websocket is at your service (' + new Date().toString() + ')');
})

// Set up a connection to our database with a new Knex instance
// NOTE: the debug flag lets you log a query and its bindings
var pg = require('knex')({
  client: 'pg',  debug: true, connection: "postgres://CHANGE_THIS_PART@babar.elephantsql.com:5432/mfifoqjd"  ,
  pool: { min: 2, max: 10 }
});

// Bring in Bookshelf! 
var Bookshelf = require('bookshelf');
Bookshelf.DB = Bookshelf.initialize( pg );

// Reference realtime routes in separate files
app.io.route('person',  require('./realtime_routes/person'));
app.io.route('login',   require('./realtime_routes/login'));
app.io.route('address', require('./realtime_routes/address'));

// Listen
console.log("steal this tech is listening on port " + port);
app.listen(port);
