var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var template = require("../templates/main-menu.hbs");
var debug = require("../helpers/debug.js");


module.exports = Backbone.View.extend({
  model: new Backbone.Model(),
  events: {
    'click .first-time-visitor-link': 'handleFirstTimeVisitorLinkClick',
    'click .returning-link': 'handleReturningLinkClick'
  },
  initialize: function() {
    var _t = this;
    console.log('init main menu view')

_t.render()
  },
  render: function() {
    var _t = this;

    console.log('rendering collection', _t.$el);

    _t.$el.empty();


    _t.$el.html(template());

    // _t.$el.append(aSingleProduct.el);

  },
  handleFirstTimeVisitorLinkClick:function(){
    console.log('first time visitor')
    Backbone.history.navigate('firstTimeVisitor',{
      trigger:true
    })
  },
  handleReturningLinkClick:function(){
     console.log('returning')
         Backbone.history.navigate('signIn',{
      trigger:true
    })
  }
});