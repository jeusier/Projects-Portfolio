var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

/*
*  Show login form
*/

getLogin = function(req, res) {

    res.render('login', {
        pageTitle: 'Jason Piros - Login',
    });
};

/*
*  Authenticate login
*/

authLogin = function(req, res) {

    if (req.body.username === "jcurray") {
        if (req.body.password === "kingtak(.)(.)") {
            req.session.admin = req.body.username;
            data = {
                redirect: '/projects',
                admin: req.session.admin,
            }
            res.send(data);
        } else {
            res.send("Incorrect password");
        }
    } else {
        res.send("Incorrect username");
    }
};

/*
* Terminates session
*/
destroySession = function(req, res) {
    req.session.destroy();
    res.redirect('/projects');
};

/*
*  Functions to be available in app.js
*/

module.exports = function() {
    app.get('/login', this.getLogin);
    app.post('/login', this.authLogin);
    app.get('/logout', this.destroySession);
    

    return app;
}();