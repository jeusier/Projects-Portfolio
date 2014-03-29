var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');
mongoose.connect('mongodb://localhost/portfolio');

/*
*  Show all projects
*/

getAllProjects = function(req, res) {
    //display projects in descending order (latest first)
    schemas.AppProject.find().sort({_id: -1}).exec(function(err, project) {
        if (err) {
            console.log("ERROR: project list isn't displaying")
        }

        //display index page with all projects and session
        res.render('index', {
            pageTitle: 'Jason Piros - Project Portfolio',
            projects: project,
            admin: req.session.admin
        });
        return;
    });
};

/*
*  Show all projects of type
*/

getTypeProjects = function(req, res) {
    //display projects of type in descending order (latest first)
    schemas.AppProject.find({type: req.params.type}).sort({_id: -1}).exec(function(err, project) {
        if (err) {
            console.log("ERROR: project list isn't displaying")
        }

        //display type page with projects and session
        res.render('type', {
            pageTitle: 'Jason Piros - Project Portfolio',
            projects: project,
            admin: req.session.admin
        });
        return;
    });
};

/*
*  Show new project
*/

showNewProject = function(req, res) {
    //if admin session doesn't exist, redirect to projects page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }

    //display add project page and session
    res.render('add', {
        pageTitle: 'Create New Project',
        admin: req.session.admin
    });
    return;
};

/*
*  Show edit project
*/

editProject = function(req, res) {
    //if admin session doesn't exist, redirect to projects page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }

    //display project based on id
    schemas.AppProject.findOne({_id: req.params.id}, function(err, project) {
        if (err) {
            console.log("ERROR: unable to display project to edit");
        }

        //display edit project page and session
        res.render('edit', {
            pageTitle: 'Edit Project',
            project: project,
            admin: req.session.admin
        });
        return;
    });
};

/*
*  Update project
*/

updateProject = function(req, res) {
    //if admin session doesn't exist, redirect to projects page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }

    //update project based on id and changed values from edit form
    schemas.AppProject.findOne({_id: req.params.id}, function(err, project) {
        if (err) {
            console.log("ERROR: unable to update project");
        }

        var name = req.body.name.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var url = req.body.url.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var imgURL = req.body.imgURL.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var description = req.body.description.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

        //set project values to the current edit form values
        project.name = name;
        project.url = url;
        project.imgURL = imgURL;
        project.description = description;
        project.type = req.body.type;

        //save values to project collection
        project.save(function(err) {
            if (err) {
                console.log("ERROR: unable to save project");
            }
        });

        //redirect to projects page
        res.redirect('/projects');
        return;
    });
};

/*
*  Remove project
*/

removeProject = function(req, res) {
    //if admin session doesn't exist, redirect to projects page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }

    //remove project by id
    schemas.AppProject.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove project');
        }
    });

    //redirect to projects page
    res.redirect('/projects');
    return;
};

/*
*  Create new project
*/

createNewProject = function(req, res) {
    //if admin session doesn't exist, redirect to projects page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/projects');
    }

    var name = req.body.name.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var url = req.body.url.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var imgURL = req.body.imgURL.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var description = req.body.description.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

    //set add form values to new schema
    var newProject = new schemas.AppProject({
        name: name,
        url: url,
        imgURL: imgURL,
        description: description,
        type: req.body.type
    });

    //save project schema to collection
    newProject.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create project');
        }
    });

    //send ajax request for redirect
    res.send({redirect: '/projects'});
    return;
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