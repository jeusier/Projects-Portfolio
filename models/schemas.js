var mongoose = require('mongoose');


/*
*  Schema for projects
*/

var newProjectSchema = new mongoose.Schema({
    name: String,
    url: String,
    imgURL: String,
    description: String,
    type: String
});

var newAdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

var projects = mongoose.model('projects', newProjectSchema);
var admin = mongoose.model('admin', newAdminSchema);

module.exports.AppProject = projects;
module.exports.AppAdmin = admin;