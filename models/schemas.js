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

var newSkillsSchema = new mongoose.Schema({
    date: String,
    header: String,
    description: String
});

var newExperiencesSchema = new mongoose.Schema({
    date: String,
    header: String,
    subheader: String,
    list1: String,
    list2: String,
    list3: String,
    list4: String
});

var newEducationsSchema = new mongoose.Schema({
    header: String,
    subheader: String,
    description: String
});

var projects = mongoose.model('projects', newProjectSchema);

var skills = mongoose.model('skills', newSkillsSchema);

var experience = mongoose.model('experiences', newExperiencesSchema);

var education = mongoose.model('educations', newEducationsSchema);

module.exports.AppProject = projects;
module.exports.AppSkill = skills;
module.exports.AppExperience = experience;
module.exports.AppEducation = education;
