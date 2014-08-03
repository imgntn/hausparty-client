var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var template = require("../templates/returning.hbs");
var debug = require("../helpers/debug.js");


module.exports = Backbone.View.extend({
  model: new Backbone.Model(),
  events: {

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

var data={
  name:_hauspartyUser.name
}

    _t.$el.html(template(data));



  }
});