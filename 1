// API files to Create/ Edit / Delete Blog posts and Comments
var post_attr = require('./db_constants/db_blog_post').db_blog_post_attr;
var comm_attr = require('./db_constants/db_comments').db_comments_attr;
var ui_msg = require('./ui_constants').ui_msg;
var ui_err_msg = require('./ui_constants').ui_err_msg;
var vasync = require('vasync');

function add_blog_post(req, res){
    var post_data = req.body;
    var post_title = post_data.title;
    var post_id = post_data.id;
    var post_content = post_data.content;
    var doc = {};
    console.log("Request Coming into add Post: %s", post_id);
    doc[post_attr.ID] = post_id;
    doc[post_attr.TITLE] = post_title;
    doc[post_attr.CONTENT] = post_content;
    doc[post_attr.CREATED_AT] = new Date().getTime();
    doc[post_attr.VERSION] = 1;

    // Insert the document to the collection
    var col = blogdb.collection('blog_post');
    col.insertOne(doc, {}, function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: ui_err_msg.MSG_ADD_ERR}));
            res.end();
            console.log(err);
            return;
        }
        res.write(JSON.stringify({success:true, data:ui_msg.MSG_ADD}, null, " "));
        console.log(result);
        res.end();
    });
}

function edit_blog_post(req, res){
    var post_data = req.body
    var post_title = post_data.title;
    var post_id = post_data.id;
    var post_content = post_data.content;
    var pgraph_ids = [];
    var doc = {};
    var selector = {};
    var opts = {};
    var updates = {};
    var col;
    console.log("Request Coming into edit Post: %s", post_id);
    for(var i=0; i<post_content.length; i++)
        pgraph_ids.push(post_content[i]["p_id"]);

    doc[post_attr.TITLE] = post_title;
    doc[post_attr.CONTENT] = post_content;
    doc[post_attr.MODIFIED_AT] = new Date().getTime();
    updates["$set"] = doc;
    updates["$inc"] = {"ver" :1 };
    opts.w = 1;

    // Function to update the blog post
    vasync.waterfall([function f1(callback) {
        selector[post_attr.ID] = post_id;
        updates["$set"] = doc;
        updates["$inc"] = {"ver" :1 };
        opts.w = 1;
        col = blogdb.collection('blog_post');
        col.updateOne(selector, updates, opts, function(err, result) {
            if (err)
                callback(err);
            else
                callback();
        });
    }, function f2(callback) {
    // Function to delete the comments, If some of the paragraphs are removed
    // as part of editing the Post
        console.log("Deleting invalid Comments for the post %s", post_id);
        selector = {};
        selector[comm_attr.POST_ID] = post_id;
        selector[comm_attr.PGRAPH_ID] = { $nin : pgraph_ids };
        col = blogdb.collection('comments');
        var options = {};
        col.deleteMany(selector, options, function(err, result) {
            if (err)
                callback(err);
            else
                callback();
        });
    }], function(err, result) {
        if (err) {
            console.log(err);
            res.write(JSON.stringify({success: false, error: ui_err_msg.MSG_EDIT_ERR}));
            res.end();
        } else {
            res.write(JSON.stringify({success:true, data:ui_msg.MSG_EDIT}, null, " "));
            res.end();
        }
    });
}

function list_blog_posts(req, res){
    console.log("Request coming in to list Blog posts");
    var limit = req.query.lim;
    var page = req.query.page;
    var selector = {};
    var opts = {};
    var projector = {};
    projector[post_attr.TITLE] = 1;

    opts["sort"] = {"created_at": -1};
    opts["skip"] = ((page-1) * limit);
    opts["limit"] = limit;
    opts["fields"] = projector;
    var col = blogdb.collection('blog_post');
    col.find(selector, opts).toArray(function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: err}));
            res.end();
            console.log(err);
            return;
        }
        res.write(JSON.stringify({success:true, data:result}, null, " "));
        console.log(result);
        res.end();
    });
}

function view_blog_post(req, res){
    var post_id = req.query.id;
    console.log("Request coming in to view the Blog post %s", post_id);
    var selector = {};
    var opts = {};
    var projector = {};

    selector[post_attr.ID] = post_id;
    var col = blogdb.collection('blog_post');
    col.findOne(selector, opts, function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: err}));
            res.end();
            console.log(err);
            return;
        }
        res.write(JSON.stringify({success:true, data:result}, null, " "));
        console.log(result);
        res.end();
    });
}

function del_blog_post(req, res){
    var post_id = req.query.id;    
    var selector = {};
    var options = {};
    var col;
    console.log("Request coming in to delete the Blog post %s", post_id);
    vasync.waterfall([function f1(callback) {
        selector[post_attr.ID] = post_id;
        col = blogdb.collection('blog_post');
        col.deleteOne(selector, options, function(err, result) {
            if (err) 
                callback(err);
            else
                callback();
        });
    }, function f2(callback) {
    // Delete all the comments associated with the post_id
        console.log("Deleting comments releated to post %s", post_id);
        selector = {};
        selector[comm_attr.POST_ID] = post_id;
        col = blogdb.collection('comments');
        col.deleteMany(selector, options, function(err, result) {
            if (err)
                callback(err);
            else
                callback();
        });
    }], function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: ui_err_msg.MSG_DEL_ERR}));
            res.end();
            console.log(err);
            return;
        } else {
            res.write(JSON.stringify({success:true, data: ui_msg.MSG_DELETE}, null, " "));
            console.log(result);
            res.end();
        }
    });
}

function add_comments(req, res){
    var comm_data = req.body;
    var doc = {};
    console.log("Request coming in to add the comment %s", comm_data);    
    doc[comm_attr.ID] = comm_data.id;
    doc[comm_attr.POST_ID] = comm_data.post_id;
    doc[comm_attr.PGRAPH_ID] = comm_data.p_id;
    doc[comm_attr.DATA] = comm_data.data;
    doc[comm_attr.CREATED_AT] = new Date().getTime();
    doc[comm_attr.VERSION] = 1;
    //Insert the comments
    var col = blogdb.collection('comments');
    col.insertOne(doc, {}, function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: ui_err_msg.MSG_ADD_ERR}));
            res.end();
            console.log(err);
            return;
        }
        res.write(JSON.stringify({success:true, data: ui_msg.MSG_ADD}, null, " "));
        console.log(result);
        res.end();
    });
}

function edit_comments(req, res){
    var comm_data = req.body;
    var selector = {};
    var opts = {};
    var updates = {};
    console.log("Request coming in to edit the comment %s", comm_data);
    selector[comm_attr.ID] = comm_data.id;
    var doc = {};
    doc[comm_attr.DATA] = comm_data.data;
    doc[comm_attr.MODIFIED_AT] = new Date().getTime();
    updates["$set"] = doc;
    updates["$inc"] = {"ver": 1};
    // Update the document
    var col = blogdb.collection('comments');
    col.updateOne(selector, updates, opts, function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: ui_err_msg.MSG_EDIT_ERR}));
            res.end();
            console.log(err);
            return;
        }
        res.write(JSON.stringify({success:true, data: ui_msg.MSG_EDIT}, null, " "));
        console.log(result);
        res.end();
    });
}

function view_comments(req, res){
    var post_id = req.query.po_id;
    var selector = {};
    var opts = {};
    var projector = {};
    console.log("Request coming in to view the comments of post %s", post_id);
    selector[comm_attr.POST_ID] = post_id;

    col = blogdb.collection('comments');
    col.find(selector, opts).toArray(function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: err}));
            res.end();
            console.log(err);
            return;
        }
        res.write(JSON.stringify({success:true, data:result}, null, " "));
        console.log(result);
        res.end();
    });
}

function delete_comments(req, res){
    var com_id = req.query.id;
    var selector = {};
    var options = {};
    console.log("Request coming in to delete the comment %s", com_id);
    selector[comm_attr.ID] = com_id;
    col = blogdb.collection('comments');
    col.deleteOne(selector, options, function(err, result) {
        if (err) {
            res.write(JSON.stringify({success: false, error: ui_err_msg.MSG_DEL_ERR}));
            res.end();
            console.log(err);
            return;
        }
        res.write(JSON.stringify({success:true, data: ui_msg.MSG_DELETE}, null, " "));
        console.log(result);
        res.end();
    });
}
    
module.exports.add_blog_post = add_blog_post;
module.exports.edit_blog_post = edit_blog_post;
module.exports.del_blog_post = del_blog_post;
module.exports.list_blog_posts = list_blog_posts;
module.exports.view_blog_post = view_blog_post;
module.exports.add_comments = add_comments;
module.exports.edit_comments = edit_comments;
module.exports.delete_comments = delete_comments;
module.exports.view_comments = view_comments;

