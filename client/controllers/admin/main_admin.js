MainAdminController = RouteController.extend({
  waitOn: function () {
  },

  onBeforeAction: function (route) {
    if (!Meteor.userId() && !Meteor.loggingIn())  {
      Session.set('next_page',route.url);
      Router.go('mobile.login');
    }
    this.next();
  },


  data: function () {
  },

  action: function () {
    this.render();
  }
});