var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

/*
*  Show all blogs
*/

getAllBlogs = function(req, res) {
    //display blogs in descending order (latest first)
    schemas.AppBlog.find().sort({_id: -1}).exec(function(err, blog) {
        if (err) {
            console.log("ERROR: blog list isn't displaying")
        }

        //display index page with all blogs and session
        res.render('index', {
            pageTitle: 'Jason Piros - Blog',
            blogs: blog,
            admin: req.session.admin
        });
        return;
    });
};

/*
*  Show new blog
*/

showNewBlog = function(req, res) {
    //if admin session doesn't exist, redirect to blogs page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/blogs');
    }

    //display add blog page and session
    res.render('add-blog', {
        pageTitle: 'Create New Blog',
        admin: req.session.admin
    });
    return;
};

/*
*  Show edit blog
*/

editBlog = function(req, res) {
    //if admin session doesn't exist, redirect to blogs page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/blogs');
    }

    //display blog based on id in edit form
    schemas.AppBlog.findOne({_id: req.params.id}, function(err, blog) {
        if (err) {
            console.log("ERROR: unable to display blog to edit");
        }

        //display edit project page and session
        res.render('edit-blog', {
            pageTitle: 'Edit Blog',
            blog: blog,
            admin: req.session.admin
        });
        return;
    });
};

/*
*  Update blog
*/

updateBlog = function(req, res) {
    //if admin session doesn't exist, redirect to blogs page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/blogs');
    }

    //update blog based on id and changed values from edit form
    schemas.AppBlog.findOne({_id: req.params.id}, function(err, blog) {
        if (err) {
            console.log("ERROR: unable to update blog");
        }

        var title = req.body.title.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var date = req.body.date.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
        var post = req.body.post.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

        //set project values to the current edit form values
        blog.title = title;
        blog.date = date;
        blog.post = post;

        //save values to project collection
        blog.save(function(err) {
            if (err) {
                console.log("ERROR: unable to save blog");
            }
        });

        //redirect to projects page
        res.redirect('/blogs');
        return;
    });
};

/*
*  Remove Blog
*/

removeBlog = function(req, res) {
    //if admin session doesn't exist, redirect to blogs page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/blogs');
    }

    //remove blog by id
    schemas.AppBlog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('ERROR: unable to remove blog');
        }
    });

    //redirect to blog page
    res.redirect('/blogs');
    return;
};

/*
*  Create new blog
*/

createNewBlog = function(req, res) {
    //if admin session doesn't exist, redirect to blogs page
    if (req.session.admin !== 'jcurray') {
        res.redirect('/blogs');
    }

    var title = req.body.title.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var date = req.body.date.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');
    var post = req.body.post.replace('&','&amp').replace('"','&quot').replace("'",'&rsquo').replace("'",'&lsquo').replace("<",'&lt').replace(">",'&gt');

    //set add blog form values to new schema
    var newBlog = new schemas.AppBlog({
        title: title,
        date: date,
        post: post
    });

    //save blog schema to collection
    newBlog.save(function(err) {
        if (err) {
            console.log('ERROR: unable to create blog');
        }
    });

    //send ajax request for redirect
    res.send({redirect: '/blogs'});
    return;
};

/*
*  Functions to be available in app.js
*/

module.exports = function() {
    app.get('/blogs', this.getAllBlogs);
    app.get('/blogs/add', this.showNewProject);
    app.get('/blogs/:id/edit', this.editProject);
    app.put('/blogs/:id/edit', this.updateProject);
    app.delete('/blogs/:id', this.removeProject);
    app.post('/blogs', this.createNewProject);
    

    return app;
}();