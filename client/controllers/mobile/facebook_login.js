MobileFacebookLoginController = RouteController.extend({
  waitOn: function () {
  },

  onBeforeAction: function (route) {
    Tracker.autorun(function(){
      if (Meteor.userId() || Meteor.loggingIn())  {
        var next = Session.get('next_page')||'mobile.landing';
        Router.go(next);
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