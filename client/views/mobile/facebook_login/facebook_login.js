/*****************************************************************************/
/* FacebookLogin: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileFacebookLogin.events({
  // Login using the accounts system
  'click #alternative-login':function(){
    Router.go('mobile.login')
  },

  'click #facebook-login-button':function(){
    //var options = {loginStyle:'redirect'}
    Meteor.loginWithFacebook(options,onLogin)
    
    function onLogin(error){
      if (error){
        onError(error);
      } else {
        alert('logged in')
        var next_page = Session.get('next_page') || 'mobile.landing'
        Router.go(next_page);
      }
    }

    function onError(error){
      console.log(error)
      $('#error').show().css({visibility:visible});
      $('#error .message').text(error.reason);
    }
  }
});

Template.MobileFacebookLogin.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
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