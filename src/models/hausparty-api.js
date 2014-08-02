var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var async = require('async');
module.exports = Backbone.Model.extend({
  initialize: function() {
    var _t = this;
    console.log('init haus api')
   // this.set('baseURL', 'https://haus-api.herokuapp.com/api');
      this.set('baseURL', 'http://localhost:8888/api');
    window._hauspartyAPI=_t;
  },
  login: function(username, password) {
    var route = "/login"
    var data = {
      email: username,
      password: password
    }
    return $.post(this.get('baseURL') + route, data, function(d) {
      console.log('login is:', d)
    })
  },
  loginWithFacebook: function(fbid) {
    var _t = this;
    var data = {
      facebookID: fbid
    }
    var route = "/login/facebook";
    return $.post(this.get('baseURL') + route, data, function(d) {
      console.log('login with facebook is:', d)
    })
  },
  exchangeFacebookToken: function(shortToken) {
    var route = "/visitors/exchange/"
    console.log('EXCHANGING TOKEN')
    return $.getJSON(this.get('baseURL') + route + shortToken, function(data) {
      console.log('EXCHANGE TOKEN DATA', data)
    });
  },
  setVisitorFacebookID: function(email, facebookID) {
    var route = "/visitors/facebook/" + email;
    var data = {
      facebookID: facebookID
    }
    return $.put(this.get('baseURL') + route, data, function(d) {
      console.log('create visitor is:', d)
    })
  },
  getVisitorFacebookID: function(email) {
    var route = "/visitors/facebook/" + email;
    return $.getJSON(this.get('baseURL') + route, data, function(d) {
      console.log('create visitor is:', d)
    })
  },
  clearVisitorFacebookID: function(email) {
    var route = "/visitors/facebook/" + email;

    return $.ajax({
      url: this.get('baseURL') + route,
      type: "DELETE",
      success: function(d) {
        console.log('clear fb data is:', d)
      }
    })
  },
  forgotPassword: function(email) {
    var data = {
      email: email
    }
    var route = "/forgot"

    return $.post(this.get('baseURL') + route, data, function(d) {
      console.log('reset password data is:', d)

    })
  },
  updatePassword: function(password, resetToken) {
    var data = {
      password: password,
      resetPasswordToken: resetToken

    }
    var route = "/reset";

    return $.post(this.get('baseURL') + route, data, function(d) {
      console.log('update password data is:', d);

    })
  },
  subscribeToNewsletter: function(visitorEmail) {
    var data = {
      email: visitorEmail,
    }
    var route = "/visitors/subscribeToNewsletter";

    return $.post(this.get('baseURL') + route, data, function(d) {
      console.log('subscribe to newsletter data is:', d);

    })
  },
  getResidents:function(){
        var route = "/residents"
    return $.getJSON(this.get('baseURL') + route, function(d) {
      console.log('getResidents is:', d)
    })
  },
  createNewVisitor:function(data){
       var route = "/visitors"
    return $.post(this.get('baseURL') + route, data, function(d) {
      console.log('create new visitor data is:', d)
    })
  }
});