var express = require('express');
var app = express();
var path = require("path");
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var ini = require('ini');
var temp = fs.readFileSync('./blog.conf', 'utf-8');
var readconf = ini.parse(temp);
var BLOGDBURL = "mongodb://" + readconf.MONGODB_ADDR + ":" + readconf.MONGODB_PORT + "/blog";
var app_port = readconf.APP_PORT;
var blog_api = require('./blog_api.js');
var http = require('http');
var bodyParser = require('body-parser');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

MongoClient.connect(BLOGDBURL, {}, function(err, db){
    if (err) {
         console.log("ERROR: failed to open " + BLOGDBURL + ", err = " + err);
         process.exit(1);
         return;
    }
    blogdb = db;
    global.blogdb = db;
    http.createServer(app).listen(app_port);
    console.log('Blog app server started');
});

app.route('/add_post').post(blog_api.add_blog_post);
app.route('/edit_post').post(blog_api.edit_blog_post);
app.route('/del_post').get(blog_api.del_blog_post);
app.route('/list_posts').get(blog_api.list_blog_posts);
app.route('/view_post').get(blog_api.view_blog_post);
app.route('/add_comment').post(blog_api.add_comments);
app.route('/edit_comment').post(blog_api.edit_comments);
app.route('/del_comment').get(blog_api.delete_comments);
app.route('/comments').get(blog_api.view_comments);
