MainAdminController = RouteController.extend({
  waitOn: function () {
  },

  
  onBeforeAction: function (pause) {
    if (!Meteor.userId() && !Meteor.loggingIn())  {
      Session.set('next_page','admin');
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