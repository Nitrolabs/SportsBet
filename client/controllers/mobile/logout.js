MobileLogoutController = RouteController.extend({
  waitOn: function () {
  },

  onBeforeAction: function (route) {
    Tracker.autorun(function(){
      if (!Meteor.userId() && !Meteor.loggingIn())  {
        Router.go('mobile.facebook.login');
      }
    });
    this.next();
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});