/**
 * This represents a collection of all entries in the person table. We only really
 * use this for our list method.
 */

var Bookshelf = require('bookshelf').DB;

var Person = require("../models/address").model;

exports.collection = Bookshelf.Collection.extend({
    model: Person,
    tableName: "stealthis.address"
});
