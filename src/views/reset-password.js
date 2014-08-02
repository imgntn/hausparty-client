var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var template = require("../templates/reset-password.hbs");
var debug = require("../helpers/debug.js")

module.exports = Backbone.View.extend({
  model: new Backbone.Model(),
  'events': {
    'click .update-password-button': 'handleUpdatePasswordButtonClick'
  },
  initialize: function() {
    var _t = this;
    console.log('init reset password view');
  },
  render: function() {
    var _t = this;

    this.$el.html(template());

  },
  handleUpdatePasswordButtonClick: function() {
    console.log('clicked update password button')
    var _t = this;
    var password = $('.new-password input').val();
    var confirmPassword = $('.confirm-password').val();
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        //submit
        var resetPassword = hauspartyAPI.updatePassword(password, _t.resetToken);


        resetPassword.done(function(d) {
          if (d.status === "success") {
            Backbone.history.navigate("#order", {
              trigger: true
            })
          } else {
            alert('Error updating password.')
          }

        })

        console.log('submitting password!', _t.resetToken);
        $('.update-password-button').css('background-color', 'gold');
      } else {
        alert('Passwords must match!');
      }
    }

  }
});