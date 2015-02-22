/**
 * This is the model representation of the address table. It represents a single address.
 */

var Bookshelf = require('bookshelf').DB;

exports.model = Bookshelf.Model.extend({
  tableName: 'stealthis.address',
  idAttribute: 'id'
});

