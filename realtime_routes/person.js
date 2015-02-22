
var People = require('../collections/person').collection;
var Person = require('../models/person').model;


module.exports = {

    list: function list(req) {
        new People().fetch({}).then(function (collection) {
                req.io.emit('response', {status: 200, results: collection})
            }
        )},

    select: function select(req) {
        Person.forge({id: req.data.id}).fetch({}).then(function (person) {
                req.io.emit('response', {status: 200, results: person})
            }
        )},

    create: function(req) {
        Person.forge(req.data).save().then(function(person){
            req.io.emit('response', {status: 200, results: person})
        });
    },

    update: function(req) {
        if(req.data.id){
            Person.forge(req.data).save().then(function(person){
                req.io.emit('response', {status: 200, results: person})
            });
        }else
        {
            req.io.emit('response', {status: 500, results: {error: "Could not update user", reason: "id was not specified"}});
        }
    }
};