
var Addresses = require('../collections/address').collection;
var Address = require('../models/address').model;


module.exports = {

    list: function list(req) {
        new Addresses().fetch({}).then(function (collection) {
                req.io.emit('response', {status: 200, response: address})
            }
        )},

    select: function select(req) {
        Address.forge({id: req.data.id}).fetch({}).then(function (address) {
                req.io.emit('response', {status: 200, response: address})
            }
        )},

    create: function(req) {
        Address.forge(req.data).save().then(function(address){
            req.io.emit('response', {status: 200, response: address})
        });
    },

    update: function(req) {
        if(req.data.id){
            Address.forge(req.data).save().then(function(address){
                req.io.emit('response', {status: 200, response: address})
            });
        }else
        {
            req.io.emit('response', {status: 500, response: {error: "Could not update address", reason: "id was not specified"}});
        }
    }
};