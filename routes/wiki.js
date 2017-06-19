const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req,res){
  res.redirect('/');
});

router.post('/', function(req,res){
  var body = req.body;

  var page = Page.build({
    title: body.title,
    content: body.content,
    status: body.status,
  });

  page.save().then(function(){
    res.redirect('/');
  });
});



router.get('/add', function(req,res){
  res.render('addpage');
});


module.exports = router;
