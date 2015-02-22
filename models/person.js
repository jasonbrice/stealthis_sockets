/**
 * This is the model representation of the person table. It represents a single person.
 */

var Bookshelf = require('bookshelf').DB;

exports.model = Bookshelf.Model.extend({
  tableName: 'stealthis.person',
  idAttribute: 'id'
});

