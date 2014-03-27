var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

/*
*  Show resume
*/

getAbout = function(req, res) {
    schemas.AppSkill.find().sort({_id: -1}).exec(function(err, skill) {
        if (err) {
            console.log("ERROR: skill list isn't displaying")
        }

        schemas.AppExperience.find().sort({_id: -1}).exec(function(err, experience) {
            if (err) {
                console.log("ERROR: experience list isn't displaying")
            }

            schemas.AppEducation.find().sort({_id: -1}).exec(function(err, education) {
                if (err) {
                    console.log("ERROR: education list isn't displaying")
                }

                res.render('about', {
                    pageTitle: 'Jason Piros - CV',
                    skills: skill,
                    experiences: experience,
                    educations: education,
                    admin: req.session.admin
                });
            });
        });
    });
};

/*
*  Show resume section
*/

getAboutSection = function(req, res) {

    res.redirect('/about/'+req.params.section)
};

/*
*  Redirect to about
*/

aboutRedirect = function(req, res) {

    req.method = 'GET';
    res.redirect('/about');
};

/*
*  Show new skill section
*/

showNewSkill = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    res.render('add-skill', {
        pageTitle: 'Add Skill',
        admin: req.session.admin
    });
};

/*
*  Show new experience section
*/

showNewExperience = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    res.render('add-experience', {
        pageTitle: 'Add Experience',
        admin: req.session.admin
    });
};

/*
*  Show new education section
*/

showNewEducation = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    res.render('add-education', {
        pageTitle: 'Add Education',
        admin: req.session.admin
    });
};

/*
*  Show edit skill
*/

editSkill = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }
    schemas.AppSkill.findOne({_id: req.params.id}, function(err, skill) {
        if (err) {
            console.log("ERROR: unable to display skill to edit");
        }

        res.render('edit-skill', {
            pageTitle: 'Edit Skill',
            skill: skill,
            admin: req.session.admin
        });
    });
};

/*
*  Update skill
*/

updateSkill = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }
    schemas.AppSkill.findOne({_id: req.params.id}, function(err, skill) {
        if (err) {
            console.log("ERROR: unable to update project");
        }

        skill.header = req.body.header;
        skill.date = req.body.date;
        skill.description = req.body.description;

        skill.save(function(err) {
            if (err) {
                console.log("ERROR: unable to save skill");
            }
        });

        res.redirect('/about');
        return;
    });
};

/*
*  Create new skill
*/

createNewSkill = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }
    var newSkill = new schemas.AppSkill({
        header: req.body.header,
        date: req.body.date,
        description: req.body.description,
    });

    newSkill.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create skill');
        }
    });

    res.redirect('/about');
};

/*
*  Create new experience
*/

createNewExperience = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }
    var newExperience = new schemas.AppExperience({
        header: req.body.header,
        subheader: req.body.subheader,
        date: req.body.date,
        list1: req.body.list1,
        list2: req.body.list2,
        list3: req.body.list3,
        list4: req.body.list4
    });

    newExperience.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create experience');
        }
    });

    res.redirect('/about');
};

/*
*  Create new education
*/

createNewEducation = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }
    var newEducation = new schemas.AppEducation({
        header: req.body.header,
        subheader: req.body.subheader,
        description: req.body.description,
    });

    newEducation.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create education');
        }
    });

    res.redirect('/about');
};

/*
*  Remove skill
*/

removeSkill = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }
    schemas.AppSkill.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove skill');
        }
    });

    res.redirect('/about');
};

/*
*  Functions to be available in app.js
*/

module.exports = function() {
    app.get('/about', this.getAbout);
    app.get('/about/add-skill', this.showNewSkill);
    app.get('/about/add-experience', this.showNewExperience);
    app.get('/about/add-education', this.showNewEducation);
    app.get('/about/redirect', this.aboutRedirect);
    app.get('/about/:section', this.getAboutSection);
    app.get('/about/:id/edit-skill', this.editSkill);
    app.put('/about/:id/edit-skill', this.updateSkill);
    app.post('/about/add-skill', this.createNewSkill);
    app.post('/about/add-experience', this.createNewExperience);
    app.post('/about/add-education', this.createNewEducation);
    app.delete('/about/:id/skill', this.removeSkill);

    return app;
}();