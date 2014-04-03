var express = require('express');
var app = module.exports = express();
var sha1 = require('sha1');
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

    var username = req.body.username.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var password = req.body.password.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

    //validate username and password
    if (username === "jcurray") {
        if (sha1(password) === "00b3d2e1e391d4252570abae324be47c5326adac") {

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