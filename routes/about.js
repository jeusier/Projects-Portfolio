var express = require('express');
var app = module.exports = express();

/*
*  Show resume
*/

getAbout = function(req, res) {

    res.render('about', {
        pageTitle: 'Jason Piros - CV',
    });
};

/*
*  Show resume section
*/

getAboutSection = function(req, res) {

    res.redirect('/about/'+req.params.section)
};

/*
*  Functions to be available in app.js
*/

module.exports = function() {
    app.get('/about', this.getAbout);
    app.get('/about/:section', this.getAboutSection);
    

    return app;
}();