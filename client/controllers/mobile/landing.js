LandingController = RouteController.extend({
  waitOn: function () {
  },

  onBeforeAction: function (pause) {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      Router.go('login');
    }
    this.next();
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});