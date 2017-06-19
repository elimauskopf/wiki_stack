const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res){
  Page.findAll({
    attributes: ['urlTitle']
  }).then(function(pages){
  res.render('index', {pages: pages});
  });
});

router.post('/', function(req, res){
  var body = req.body;
  var user_id;

  User.findOrCreate(
    {where: {
      name: body.author,
      email: body.email
    }
  }).then(function(newUser){
    user_id = newUser[0].dataValues.id;
    console.log(user_id);
  });


    // console.log(author_id)

  var page = Page.build({
    title: body.title,
    content: body.content,
    status: body.status,
    author_id: user_id
  });

  page.save().then(function(savedPage){
    res.redirect(savedPage.route);
  });
});

router.get('/add', function(req, res){
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
  let url = req.params.urlTitle;
  Page.findOne({
    where: {
      urlTitle: url
    }
  }).then((foundPage) => {
    res.render('wikipage', {foundPage: foundPage});
    // res.json(foundPage);
  }).catch(next);
});



module.exports = router;
