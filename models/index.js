var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging:false
});


function generateUrlTitle (title) {
  if (title) {
    console.log('awef')
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,

        },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },

  },
  {
    getterMethods: {
          route: function() {var title = this.getDataValue('urlTitle');
          return '/wiki/' + title;}
  },
}
// {
//     hooks: {
//       beforeValidate: function(page, options) {
//         console.log('validat')
//         page.urlTitle = generateUrlTitle(page.title)
//       }
//     }
// }
);

Page.hook('beforeValidate',function(page){
  page.urlTitle = generateUrlTitle(page.title);
});


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});


// var Page = db.define('Page', {
//   title: sequelize.STRING,
//   urlTitle: sequelize.STRING,
//   content: sequelize.TEXT,
//   status: sequelize.ENUM('open', 'closed')
// })

// var User = db.define('User', {
//   name: sequelize.STRING,
//   email: sequelize.STRING
// })

module.exports = {
  Page: Page,
  User: User,
  db : db
};
