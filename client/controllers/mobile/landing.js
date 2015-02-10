MobileLandingController = RouteController.extend({
  waitOn: function () {
    //   console.log("wait on - i get here")
    Meteor.subscribe('publish_all_games');
  },

  onBeforeAction: function (route) {
    Tracker.autorun(function(){
      if (!Meteor.userId() && !Meteor.loggingIn())  {
        Session.set('next_page',route.url);
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