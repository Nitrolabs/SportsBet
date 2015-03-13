/*****************************************************************************/
/* FacebookLogin: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileFacebookLogin.events({
  // Login using the accounts system
  'click #alternative-login':function(){
      App.track("From FB to Email Login");
      Router.go('mobile.login')
  },

  'click #facebook-login-button':function(){
    App.track("Click FB Login");
    var options = {loginStyle:'redirect'}
    Meteor.loginWithFacebook(options,onLogin)
    
    function onLogin(error){
      if (error){
        onError(error);
      } else {
        // This code will never execute, as we are using the redirect flow
        // Leave it here in case the loging flow is changed
        App.track("FB Login Successful");
        var next_page = Session.get('next_page') || 'mobile.landing'
        Router.go(next_page);
      }
    }

    function onError(error){
      console.log(error)
      App.track("FB Login Failed",{error:error});
      $('#error').show().css({visibility:visible});
      $('#error .message').text(error.reason);
    }
  }
});

Template.MobileFacebookLogin.helpers({
  
  getGameName: function() {
      var g = Games.findOne();
      if (!g) return "";
      
      return (g.short_title);
  },
  
  getGameStatus: function() {
      
      var g = Games.findOne();
      if (!g) return "";
      var game_t = g.start_datetime
      var now = Date.now();
      var diff = now - game_t;
      
      // 15 minutes before start to 3 hours after start
      if ((diff > (-15*60*1000)) && (diff < (3 * 60 * 60 * 1000))) {
        return '<span class="highlight-in-blue"><b>LIVE NOW!</b></span>'
      }
      // 15-60 minutes before start
      else if ((diff > (-60*60*1000)) && (diff < (-15*60*1000))) {
          return "Starting in a few minutes!"
      }
      else if (diff < 0) {
          return "Starting " + App.helpers.prettifyDate(game_t);
      }
      else return "";
  },
});

/*****************************************************************************/
/* FacebookLogin: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileFacebookLogin.created = function () {
};

Template.MobileFacebookLogin.rendered = function () {
};

Template.MobileFacebookLogin.destroyed = function () {
};
