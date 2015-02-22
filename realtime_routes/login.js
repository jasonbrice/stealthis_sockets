
var sha512 = require('sha512');

var Login = require('../models/login').model;
var Person = require('../models/person').model;

module.exports = {

    authenticate: function(req)
    {
        if(req.data.email && req.data.password)
        {
            req.data.password = sha512(req.data.password).toString('hex');
            Login.forge({email: req.data.email, password: req.data.password}).fetch({}).then(function (login) {

                login = login.toJSON();

                if(login.password) delete login.password;

                Person.forge({id: login.personid}).fetch({}).then(function (person) {
                    req.io.emit('response', {person: person, login: login});
                })
            }).catch(function(error){
                console.log(error);
                req.io.emit('response', {status: 500, error: {message: "Could not complete request", reason: "Credentials not found or database is down"}});
            });
        }
        else
        {
            req.io.emit('response', {status: 400, error: {message: "Malformed request", reason: "Missing email or password"}});
        }
    },

    create: function(req) {

        if(req.data.password){

            req.data.password = sha512(req.data.password).toString('hex');

        }

        Login.forge(req.data).save().then(function(login){
            login = login.toJSON();
            if(login.password){ delete login.password; }
            req.io.emit('response', {status: 200, login: login})
        }).catch(function(error){
            console.log(JSON.stringify(error));
            req.io.emit('response', {status: 500, error: {message: "Could not create login", reason: error.detail}});
        });
    }
};