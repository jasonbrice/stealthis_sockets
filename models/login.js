/**
 * This is the model representation of the Login table. It represents a single login.
 */

var Bookshelf = require('bookshelf').DB;

exports.model = Bookshelf.Model.extend({
   tableName: 'stealthis.login',
   idAttribute: 'id'
});

