var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

/*
*  Show login form
*/

getLogin = function(req, res) {

    //display login page
    res.render('login', {
        pageTitle: 'Jason Piros - Login',
    });
    return;
};

/*
*  Authenticate login
*/

authLogin = function(req, res) {

    //validate username and password
    if (req.body.username === "jcurray") {
        if (req.body.password === "kingtak(.)(.)") {

            //set session to username
            req.session.admin = req.body.username;
            data = {
                redirect: '/projects',
                admin: req.session.admin
            }

            //send ajax request to redirect to projects page with session
            res.send(data);
            return;
        } else {
            //send ajax request to display error
            res.send("Incorrect password");
            return;
        }
    } else {
        //send ajax request to display error
        res.send("Incorrect username");
        return;
    }
};

/*
* Terminates session
*/
destroySession = function(req, res) {
    //destroys admin session and redirects to projects page
    req.session.destroy();
    res.redirect('/projects');
    return;
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