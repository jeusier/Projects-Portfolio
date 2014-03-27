var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');
mongoose.connect('mongodb://localhost/portfolio');

/*
*  Show all projects
*/

getAllProjects = function(req, res) {
    schemas.AppProject.find().sort({_id: -1}).exec(function(err, project) {
        if (err) {
            console.log("ERROR: project list isn't displaying")
        }

        res.render('index', {
            pageTitle: 'Jason Piros - Project Portfolio',
            projects: project,
            admin: req.session.admin
        });
    });
};

/*
*  Show all projects of type
*/

getTypeProjects = function(req, res) {
    schemas.AppProject.find({type: req.params.type}).sort({_id: -1}).exec(function(err, project) {
        if (err) {
            console.log("ERROR: project list isn't displaying")
        }

        res.render('type', {
            pageTitle: 'Jason Piros - Project Portfolio',
            projects: project,
            admin: req.session.admin
        });
    });
};

/*
*  Show new project
*/

showNewProject = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }

    res.render('add', {
        pageTitle: 'Create New Project',
        admin: req.session.admin
    });
};

/*
*  Show edit project
*/

editProject = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }
    schemas.AppProject.findOne({_id: req.params.id}, function(err, project) {
        if (err) {
            console.log("ERROR: unable to display project to edit");
        }

        res.render('edit', {
            pageTitle: 'Edit Project',
            project: project,
            admin: req.session.admin
        });
    });
};

/*
*  Update project
*/

updateProject = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }
    schemas.AppProject.findOne({_id: req.params.id}, function(err, project) {
        if (err) {
            console.log("ERROR: unable to update project");
        }

        project.name = req.body.name;
        project.url = req.body.url;
        project.imgURL = req.body.imgURL;
        project.description = req.body.description;
        project.type = req.body.type;

        project.save(function(err) {
            if (err) {
                console.log("ERROR: unable to save project");
            }
        });

        res.redirect('/projects');
        return;
    });
};

/*
*  Remove project
*/

removeProject = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }
    schemas.AppProject.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove project');
        }
    });

    res.redirect('/');
};

/*
*  Create new project
*/

createNewProject = function(req, res) {
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }
    var newProject = new schemas.AppProject({
        name: req.body.name,
        url: req.body.url,
        imgURL: req.body.imgURL,
        description: req.body.description,
        type: req.body.type
    });

    newProject.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create project');
        }
    });

    res.send({redirect: '/projects'});
};

/*
*  Functions to be available in app.js
*/

module.exports = function() {
    app.get('/', this.getAllProjects);
    app.get('/projects', this.getAllProjects);
    app.get('/projects/add', this.showNewProject);
    app.get('/projects/:type', this.getTypeProjects);
    app.get('/projects/:id/edit', this.editProject);
    app.put('/projects/:id/edit', this.updateProject);
    app.delete('/projects/:id', this.removeProject);
    app.post('/projects', this.createNewProject);
    

    return app;
}();