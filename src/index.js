var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');


var DEBUG = true;
if (!DEBUG) {
  if (!window.console) window.console = {};
  var methods = ["log", "debug", "warn", "info"];
  for (var i = 0; i < methods.length; i++) {
    console[methods[i]] = function() {};
  }
}


var HausPartyAPI = require('./models/hausparty-api');
var hauspartyAPI = new HausPartyAPI();

// init facebook sdk
var Facebook = require('./models/facebook');
var facebook = new Facebook();

var LayoutView = require('./views/layout');
var layoutView = new LayoutView();
var MainMenuView = require('./views/main-menu');
var FirstTimeVisitorView = require('./views/first-time-visitor');
var ForgotPasswordView = require('./views/forgot-password');
var ResetPasswordView = require('./views/reset-password');
var SignInView = require('./views/sign-in');

function cleanUpMainContentTargetView() {
  $('#mainContentTarget').empty();
  $('#mainContentTarget').off();
}

function checkIfSignedIn(){
  if (window._hauspartyUser){
    return window._hauspartyUser
  }
  else{
    return false
  }
}

var Router = Backbone.Router.extend({
  routes: {
    "": "mainMenu",
    "firstTimeVisitor": "firstTimeVisitor",
    "returningVisitor": "returningVisitor",
    "forgot": "forgot",
    "signIn": "signIn",
    "reset/:token": "reset",
    "signOut":"signOut"


  },
  "mainMenu": function() {
    console.log('mainMenu route')
    var mainMenuView = new MainMenuView({
      el: '#mainContentTarget',
    });



  },

  "firstTimeVisitor": function() {
    cleanUpMainContentTargetView();
    console.log('firstTimeVisitor route')
    var firstTimeVisitorView = new FirstTimeVisitorView({
      el: '#mainContentTarget',
    });



  },
  "returningVisitor": function() {
   var user= checkIfSignedIn();
   if(user!==false){
    
   }
    console.log('returningVisitor route',user)



  },
  forgot: function() {
    console.log('forgot route');

    var forgotPasswordView = new ForgotPasswordView({
      el: '#mainContentTarget'
    });
    forgotPasswordView.render();

  },
  reset: function(token) {

    console.log('reset route');

    var resetPasswordView = new ResetPasswordView({
      el: '#mainContentTarget'
    });
    resetPasswordView.resetToken = token
    resetPasswordView.render();

  },
  signIn: function() {
    console.log('signIn route');


    var signInView = new SignInView({
      el: '#mainContentTarget'
    });

    signInView.render();

  },
  signOut:function(){
    delete window._hauspartyUser
  }
});

var router = new Router();

Backbone.history.start();