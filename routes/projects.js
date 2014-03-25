var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');
mongoose.connect('mongodb://localhost/portfolio');

/*
*  Show all projects
*/

getAllProjects = function(req, res) {
    schemas.AppProject.find(function(err, project) {
        if (err) {
            console.log("ERROR: project list isn't displaying")
        }

        res.render('index', {
            pageTitle: 'Jason Piros - Project Portfolio',
            projects: project,
        });
    });
};

/*
*  Show edit project
*/

editProject = function(req, res) {
    schemas.AppProject.findOne({_id: req.params.id}, function(err, project) {
        if (err) {
            console.log("ERROR: unable to display project to edit");
        }

        res.render('edit', {
            pageTitle: 'Edit Project',
            project: project
        });
    });
};

/*
*  Update project
*/

updateProject = function(req, res) {
    schemas.AppProject.findOne({_id: req.params.id}, function(err, project) {
        if (err) {
            console.log("ERROR: unable to update project");
        }

        project.name = req.body.name;
        project.url = req.body.url;
        project.imgURL = req.body.imgURL;
        project.description = req.body.description;

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
    schemas.AppProject.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove project');
        }
    });

    res.redirect('/');
};

/*
*  Show new project
*/

showNewProject = function(req, res) {
    res.render('new', {
        pageTitle: 'Create New Project',
    });
};

/*
*  Create new project
*/

createNewProject = function(req, res) {
    var newProject = new schemas.AppProject({
        name: req.body.name,
        url: req.body.url,
        imgURL: req.body.imgURL,
        description: req.body.description
    });

    newProject.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create project');
        }
    });

    res.redirect('/');
};

/*
*  Functions to be available in app.js
*/

module.exports = function() {
    app.get('/', this.getAllProjects);
    app.get('/projects', this.getAllProjects);
    app.get('/projects/:id/edit', this.editProject);
    app.put('/projects/:id/edit', this.updateProject);
    app.delete('/projects/:id', this.removeProject);
    app.get('/projects/new', this.showNewProject);
    app.post('/projects', this.createNewProject);
    

    return app;
}();