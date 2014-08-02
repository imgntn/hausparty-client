var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
  initialize: function(signin) {
    console.log('init facebook')
    var _t = this;

    if (typeof FB === "undefined") {
      window.fbAsyncInit = function() {
        FB.init({
          appId: '811982622186838',
          xfbml: true,
          version: 'v2.0'
        });
     
        _t.FB = FB;
        _t.set('fb_loaded', true)
        _t.trigger('fb_loaded');
        _t.afterLoad();

      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);

      }(document, 'script', 'facebook-jssdk'));
    } else {
           _t.FB = FB;
        console.log('signin?', signin)
        if (signin === true) {
          _t.login();
        }

    }

  },
  afterLoad: function() {
    var _t = this;
    console.log('after fb loaded')
    window._fb=this;
    //_t.login();
  },
  login: function() {
    var _t = this;
    console.log('in fb login')
    _t.FB.login(function(response) {
      if (response.status === 'connected') {
        console.log('connected to facebook', response);
        _t.afterSuccessfulLogin();
        // Logged into your app and Facebook.
      } else if (response.status === 'not_authorized') {
        console.log('not authorized for this facebook app');
        // The person is logged into Facebook, but not your app.
      } else {
        console.log('unknown, most likely logged out')
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }

    }, {
      scope: 'public_profile,email'
    });
  },
  logout: function() {
    var _t = this;
    _t.FB.logout(function(data) {
      console.log(data)
    })
  },
  getLoginStatus: function() {

    var _t = this;
    _t.FB.getLoginStatus(function(response) {
      console.log(response);
    });
  },
  getAuthToken: function() {
    console.log('GET AUTH TOKEN IN FB ')
    var _t = this;
    var token = _t.FB.getAccessToken();
    return token
  },
  afterSuccessfulLogin: function() {
    console.log('after login')
    var _t = this;
    _t.FB.api(
      "/me",
      function(response) {
        if (response && !response.error) {

          _t.set('me', response);
          _t.trigger('goodLogin', response.id);
          console.log('me is:', _t.get('me'))
        }
      }
    );
  }
});