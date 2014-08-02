var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var template = require("../templates/layout.hbs");
var debug = require("../helpers/debug.js")


module.exports = Backbone.View.extend({

  el: 'body',
  model: new Backbone.Model(),
  'events': {

 
  },
  initialize: function(session) {
    var _t = this;
    _t.render();
  },
  render: function() {
    var _t = this;

    $('body').html(template());

    // setTimeout(function() {
    //   _t.afterRender();
    // }, 0);


  },
  sendAnchorLinksThroughRouter: function() {

    $(document).on("click", "a:not([data-bypass])", function(evt) {
      evt.preventDefault();

      var href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
      };
      var root = location.protocol + "//" + location.host + Backbone.history.root;

      if (href.prop && href.prop.slice(0, root.length) === root) {

        Backbone.history.navigate(href.attr, true);
      }
    });
  }

});