MobileNewUserController = RouteController.extend({
  waitOn: function () {
      Meteor.subscribe('publish_all_games');
  },

//   onBeforeAction: function (route) {
    
//     this.next();
//   },

  data: function () {
  },

  action: function () {
    this.render();
  }
});