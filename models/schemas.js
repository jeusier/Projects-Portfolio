var mongoose = require('mongoose');


/*
*  Schema for projects
*/

//schema for projects collection
var newProjectSchema = new mongoose.Schema({
    name: String,
    url: String,
    imgURL: String,
    description: String,
    type: String
});

//schema for skills collection
var newSkillsSchema = new mongoose.Schema({
    date: String,
    header: String,
    description: String
});

//schema for experiences collection
var newExperiencesSchema = new mongoose.Schema({
    date: String,
    header: String,
    subheader: String,
    list1: String,
    list2: String,
    list3: String,
    list4: String
});

//schema for educations collection
var newEducationsSchema = new mongoose.Schema({
    header: String,
    subheader: String,
    description: String
});

/*
*  Store models in variables
*/
var projects = mongoose.model('projects', newProjectSchema);
var skills = mongoose.model('skills', newSkillsSchema);
var experience = mongoose.model('experiences', newExperiencesSchema);
var education = mongoose.model('educations', newEducationsSchema);

/*
*  Model variables to be available in app.js
*/

module.exports.AppProject = projects;
module.exports.AppSkill = skills;
module.exports.AppExperience = experience;
module.exports.AppEducation = education;
