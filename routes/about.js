var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

/*
*  Show resume
*/

getAbout = function(req, res) {

    //display skills in descending order (latest first)
    schemas.AppSkill.find().sort({_id: -1}).exec(function(err, skill) {
        if (err) {
            console.log("ERROR: skill list isn't displaying")
        }

        //display experience in descending order (latest first)
        schemas.AppExperience.find().sort({_id: -1}).exec(function(err, experience) {
            if (err) {
                console.log("ERROR: experience list isn't displaying")
            }

            //display education in descending order (latest first)
            schemas.AppEducation.find().sort({_id: -1}).exec(function(err, education) {
                if (err) {
                    console.log("ERROR: education list isn't displaying")
                }

                //display about page with skills, experience, education, and sesion
                res.render('about', {
                    pageTitle: 'Jason Piros - CV',
                    skills: skill,
                    experiences: experience,
                    educations: education,
                    admin: req.session.admin
                });
                return;
            });
        });
    });
}

/*
*  Show resume section
*/

getAboutSection = function(req, res) {

    //redirect to specific section on about page
    res.redirect('/about/'+req.params.section)
    return;
};


/*
*  Show new skill section
*/

showNewSkill = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //display add-skill page with session
    res.render('add-skill', {
        pageTitle: 'Add Skill',
        admin: req.session.admin
    });
    return;
};

/*
*  Show new experience section
*/

showNewExperience = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //display add-experience page with session
    res.render('add-experience', {
        pageTitle: 'Add Experience',
        admin: req.session.admin
    });
    return;
};

/*
*  Show new education section
*/

showNewEducation = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //display add-education page with session
    res.render('add-education', {
        pageTitle: 'Add Education',
        admin: req.session.admin
    });
    return;
};

/*
*  Show edit skill
*/

editSkill = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //display skill by id in edit form
    schemas.AppSkill.findOne({_id: req.params.id}, function(err, skill) {
        if (err) {
            console.log("ERROR: unable to display skill to edit");
        }

        //display edit-skill page, the skill values, and session
        res.render('edit-skill', {
            pageTitle: 'Edit Skill',
            skill: skill,
            admin: req.session.admin
        });
        return;
    });
};

/*
*  Update skill
*/

updateSkill = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //update skill with changes to edit form
    schemas.AppSkill.findOne({_id: req.params.id}, function(err, skill) {
        if (err) {
            console.log("ERROR: unable to update project");
        }

        var header = req.body.header.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var date = req.body.date.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var description = req.body.description.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

        //set skill values to form values
        skill.header = header;
        skill.date = date;
        skill.description = description;

        //update skill in collection
        skill.save(function(err) {
            if (err) {
                console.log("ERROR: unable to save skill");
            }
        });

        //redirect to about skills section
        res.redirect('/about/#skills');
        return;
    });
};

/*
*  Show edit experience
*/

editExperience = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //display experience by id in edit form
    schemas.AppExperience.findOne({_id: req.params.id}, function(err, experience) {
        if (err) {
            console.log("ERROR: unable to display experience to edit");
        }

        //display edit-experience form, experience values, with session
        res.render('edit-experience', {
            pageTitle: 'Edit Experience',
            experience: experience,
            admin: req.session.admin
        });
        return;
    });
};

/*
*  Update experience
*/

updateExperience = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //update experience with edit form values
    schemas.AppExperience.findOne({_id: req.params.id}, function(err, experience) {
        if (err) {
            console.log("ERROR: unable to update experience");
        }

        var header = req.body.header.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var date = req.body.date.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var list1 = req.body.list1.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var list2 = req.body.list2.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var list3 = req.body.list3.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var list4 = req.body.list4.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

        //set experience values from edit form
        experience.header = header;
        experience.date = date;
        experience.list1 = list1;
        experience.list2 = list2;
        experience.list3 = list3;
        experience.list4 = list4;

        //save experience in collection
        experience.save(function(err) {
            if (err) {
                console.log("ERROR: unable to save experience");
            }
        });

        //redirect to about experience section
        res.redirect('/about/#experience');
        return;
    });
};

/*
*  Show edit education
*/

editEducation = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //display education values in edit form
    schemas.AppEducation.findOne({_id: req.params.id}, function(err, education) {
        if (err) {
            console.log("ERROR: unable to display education to edit");
        }

        //display edit-education page, education values, and session
        res.render('edit-education', {
            pageTitle: 'Edit Education',
            education: education,
            admin: req.session.admin
        });
    });
};

/*
*  Update education
*/

updateEducation = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //update education values with edit form values
    schemas.AppEducation.findOne({_id: req.params.id}, function(err, education) {
        if (err) {
            console.log("ERROR: unable to update project");
        }

        var header = req.body.header.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var subheader = req.body.subheader.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var description = req.body.description.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

        //set education values to edit form values
        education.header = header;
        education.subheader = subheader;
        education.description = description;

        //update education in collection
        education.save(function(err) {
            if (err) {
                console.log("ERROR: unable to save skill");
            }
        });

        //redirect to about education section
        res.redirect('/about/#education');
        return;
    });
};

/*
*  Create new skill
*/

createNewSkill = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    var header = req.body.header.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var date = req.body.date.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var description = req.body.description.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

    //create skill schema to store add form values
    var newSkill = new schemas.AppSkill({
        header: header,
        date: date,
        description: description
    });

    //save skill to collection
    newSkill.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create skill');
        }
    });

    //send ajax request to redirect to about section
    res.send({redirect: '/about'});
    return;
};

/*
*  Create new experience
*/

createNewExperience = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    var header = req.body.header.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var date = req.body.date.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var subheader = req.body.subheader.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var list1 = req.body.list1.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var list2 = req.body.list2.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var list3 = req.body.list3.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var list4 = req.body.list4.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

    //create experience schema to store add form values
    var newExperience = new schemas.AppExperience({
        header: header,
        subheader: subheader,
        date: date,
        list1: list1,
        list2: list2,
        list3: list3,
        list4: list4
    });

    //save experience to collection
    newExperience.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create experience');
        }
    });

    //send ajax request to redirect to about section
    res.send({redirect: '/about'});
    return;
};

/*
*  Create new education
*/

createNewEducation = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    var header = req.body.header.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var subheader = req.body.subheader.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var description = req.body.description.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');


    //create education schema to store add form values
    var newEducation = new schemas.AppEducation({
        header: header,
        subheader: subheader,
        description: description
    });

    //save education to collection
    newEducation.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create education');
        }
    });

    //send ajax request to redirect to about section
    res.send({redirect: '/about'});
    return;
};

/*
*  Remove skill
*/

removeSkill = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //remove skill by id
    schemas.AppSkill.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove skill');
        }
    });

    //redirect to about section
    res.redirect('/about');
    return;
};

/*
*  Remove experience
*/

removeExperience = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //remove experience by id
    schemas.AppExperience.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove skill');
        }
    });

    //redirect to about section
    res.redirect('/about');
    return;
};

/*
*  Remove education
*/

removeEducation = function(req, res) {
    //if admin session doesn't exist, redirect to about page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/about');
    }

    //remove education by id
    schemas.AppEducation.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove skill');
        }
    });

    //redirect to about section
    res.redirect('/about');
    return;
};

/*
*  Functions to be available in app.js
*/

module.exports = function() {
    app.get('/about', this.getAbout);
    app.get('/about/add-skill', this.showNewSkill);
    app.get('/about/add-experience', this.showNewExperience);
    app.get('/about/add-education', this.showNewEducation);
    app.get('/about/:section', this.getAboutSection);
    app.get('/about/:id/edit-skill', this.editSkill);
    app.put('/about/:id/edit-skill', this.updateSkill);
    app.get('/about/:id/edit-experience', this.editExperience);
    app.put('/about/:id/edit-experience', this.updateExperience);
    app.get('/about/:id/edit-education', this.editEducation);
    app.put('/about/:id/edit-education', this.updateEducation);
    app.post('/about/add-skill', this.createNewSkill);
    app.post('/about/add-experience', this.createNewExperience);
    app.post('/about/add-education', this.createNewEducation);
    app.delete('/about/:id/skill', this.removeSkill);
    app.delete('/about/:id/experience', this.removeExperience);
    app.delete('/about/:id/education', this.removeEducation);

    return app;
}();