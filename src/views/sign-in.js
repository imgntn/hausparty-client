var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var template = require("../templates/sign-in.hbs");
var debug = require("../helpers/debug.js")

var Facebook = require('../models/facebook');
var fb;
module.exports = Backbone.View.extend({
  model: new Backbone.Model(),
  'events': {
    'click .sign-in-text': 'handleSignInButtonClick',
    'click .sign-in.connect-facebook': 'handleFacebookButtonClick'
  },
  initialize: function() {
    var _t = this;
    _t.render();
    console.log('init sign in view')
  },
  render: function() {
    var _t = this;
    $('.sign-in-text').off();
    $('.sign-in.connect-facebook').off();


    _t.$el.html(template());

  },
  navigateToReturningPage: function() {
    console.log('navigate to returning page')
    Backbone.history.navigate("returning", {
      trigger: true
    })
  },
  handleSignInButtonClick: function() {
    var _t = this;
    if ($('#sign-in-email').val() !== "" && $('#sign-in-password').val() !== "") {
      var user = _t.getSignInValues();

 
      _hauspartyAPI.login(user.email, user.pass).done(function(d) {

        if (d.status === "success") {
          _t.setUserDetails(d);
          _t.navigateToReturningPage();
        } else {
          _t.renderBadLogin();
        }

      });
    }

  },
  renderBadLogin: function() {
    console.log('rendering bad login');
    $('.bad-login').show();

    function hideModal() {
      $('.bad-login').hide();
    }
   
    setTimeout(hideModal, 2000);
  },
  setUserDetails: function(user) {
    console.log('setting user details', user)
    window._hauspartyUser=user;

  },
  handleFacebookButtonClick: function() {
    var _t = this;
    console.log('login with facebook!', fb === undefined);
    if (typeof fb === 'undefined') {
      fb = new Facebook(true);

    } else {
      fb.login();
    }


    fb.off('goodLogin');
    fb.on('goodLogin', function(fbid) {
      console.log('in fb good login sign in page')
      console.log('GOT INTO FACEBOOK IN SIGN IN VIEW', fb.get('me'))
      _t.lookupHauspartyUserFromFacebook(fbid);

    });


  },
  lookupHauspartyUserFromFacebook: function(fbid) {
    console.log('looking up user', fbid)
    var _t = this;
    _hauspartyAPI.loginWithFacebook(fbid).done(function(d) {
      if (d.status === "success") {
      
        _t.navigateToReturningPage();
      } else {
        _t.renderBadLogin();
      }
    });
  },
  getSignInValues: function() {
    var email = $('#sign-in-email').val();
    var pass = $('#sign-in-password').val()
    return {
      email: email,
      pass: pass
    }
  }
});