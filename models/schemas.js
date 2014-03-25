var mongoose = require('mongoose');


/*
*  Schema for projects
*/

var newProjectSchema = new mongoose.Schema({
    name: String,
    url: String,
    imgURL: String,
    description: String
});

var projects = mongoose.model('projects', newProjectSchema);

module.exports.AppProject = projects;