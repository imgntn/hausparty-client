var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var template = require("../templates/forgot-password.hbs");
var debug = require("../helpers/debug.js")


module.exports = Backbone.View.extend({
  buttonEnabled:true,
  model: new Backbone.Model(),
  'events': {
    'click .reset-password-button': 'handleResetPasswordButtonClick'
  },
  initialize: function() {
    var _t = this;
    _t.buttonEnabled=true;
    console.log('init forgot password view');
  },
  render: function() {
    var _t = this;

    this.$el.html(template());

  },
  handleResetPasswordButtonClick: function() {
    var _t = this;

    var userEmail = $('.forgot-email').val();

    if (userEmail !== "" && _t.buttonEnabled===true) {
    var forgotPassword=_hauspartyAPI.forgotPassword(userEmail);
    _t.buttonEnabled=false;
    forgotPassword.done(function(d){
      if(d.status==="success"){
          $('.reset-password-button').hide();
          $('.sent-reset-email-text').show();
      }
      else{
        alert('Problem resetting password');
          _t.buttonEnabled=true;
        
      }
        
    })
      console.log('reset password button click', userEmail)
  
    }

  }

});