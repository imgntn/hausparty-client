var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var template = require("../templates/first-time-visitor.hbs");
var debug = require("../helpers/debug.js");


module.exports = Backbone.View.extend({
  model: new Backbone.Model(),
  events: {
    'click #submit': 'handleSubmitButtonClick',
    'change #selectResident': 'handleSelectResidentChange',
    'input #indirectConnection': 'handleIndirectConnectionChange',
    'click .connect-facebook-button':'handleConnectFacebookButtonClick'
  },
  initialize: function() {
    var _t = this;
    console.log('init first time view')
    var getResidents = _hauspartyAPI.getResidents();
    getResidents.done(function(d) {
      console.log('get residents data:', d)
      _t.render(d);
    })

  },
  render: function(residents) {
    var _t = this;

    console.log('rendering collection', _t.$el);

    _t.$el.empty();


    _t.$el.html(template(residents));


  },
  handleSubmitButtonClick: function(e) {
    var _t = this;
    e.preventDefault();
    var requiredFields = _t.checkRequiredFields();
    if (requiredFields === false) {
      return
    }
    var goodPass = _t.comparePasswords();
    if (goodPass === false) {
      return
    }
    var goodConnection = _t.checkConnection();
    if (goodConnection === false) {
      return
    }
    if (goodPass !== false && goodConnection !== false) {
      console.log('submit button click')
      var data = _t.gatherFormData();
      _t.submitFormToServer(data)
    }

  },
  gatherFormData: function() {
    var _t = this;
    var form = $('.first-time-visitor-form')
    function checkFacebookID(){
      if(typeof _fb.get('me')!=="undefined"){return _fb.get('me').id}
        else{return ""}
    }
    var formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      telephone: $('#telephone').val(),
      connection: _t.model.get('connection'),
      about: $('#about').val(),
      password: document.getElementById('password').value,
      newsletter: document.getElementById("newsletter-0").checked,
      facebookID:checkFacebookID()
    }
    console.log('formData', formData)
    return formData
  },
  checkConnection: function() {
    var _t = this;
    var connection = _t.model.get('connection');
    if (connection === "default") {
      alert('Please choose a Connection');
      return false;
    } else if (connection === "indirect") {
      alert('Please describe your Connection');
      return false;
    } else {
      return true;
    }
  },
  checkRequiredFields: function() {
    var _t = this;
    var hasName = $('#name').val() !== "";
    var hasEmail = $('#email').val() !== "";
    var hasAbout = $('#about').val() !== "";
    var hasConnection = _t.model.get('connection') || false;
    console.log('hasConnection', hasConnection)
    if (hasName === false) {
      alert('Please enter a name')
    } else if (hasEmail === false) {
      alert('Please enter an e-mail')
    } else if (hasConnection === false) {
      alert('Please choose a connection')
    } else if (hasAbout === false) {
      alert('Please enter some information about yourself')
    } else {
      return true
    }
    return false;

  },
  comparePasswords: function() {

    var password = document.getElementById('password').value
    var confirm = document.getElementById('confirmPassword').value
    if (password === "") {
      alert('Please enter a password')
      return false
    } else if (confirm === "") {
      alert('Please confirm your password')
      return false
    } else if (password !== confirm) {
      alert("Passwords don't match")
      return false
    } else {
      return true
    }

  },
  handleSelectResidentChange: function(e) {
    var _t = this;
    console.log('select resident change', e.currentTarget.value)
    var resident = e.currentTarget.value;
    if (resident === "indirect") {
      _t.showIndirectConnection();
    } else {
      _t.hideIndirectConnection();
    }
    _t.model.set('connection', resident);
  },
  showIndirectConnection: function() {
    $('.indirect-connection-row').show();
  },
  hideIndirectConnection: function() {
    $('.indirect-connection-row').hide();
  },
  handleIndirectConnectionChange: function(e) {
    console.log('indirect connection change', e.currentTarget.value)
    var _t = this;
    _t.model.set('connection', e.currentTarget.value);
  },
  submitFormToServer:function(data){
    var _t=this;
    var createNewVisitor = _hauspartyAPI.createNewVisitor(data);
    createNewVisitor.done(function(d){
      if(d.status==="success"){
        console.log('created new visitor')
        window._hauspartyUser=d.visitor;
        window._hauspartyUser.name=$('#name').val()
        Backbone.history.navigate('/returning',{
          trigger:true
        })
      }
      else if(d.code===11000){
        alert('Problem: Duplicate User')
        return
      }

    })
  },
  handleConnectFacebookButtonClick:function(){
    console.log('connect fb account')
    _fb.login();
    _fb.off('goodLogin');
    _fb.on('goodLogin',function(){
      $('#name').val(_fb.get('me').name)
       $('#email').val(_fb.get('me').email)
       $('.connect-facebook-button').text('Facebook Account Connected')
    })
  }
});