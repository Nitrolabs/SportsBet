ChatController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
    //   console.log(this);
      
      Session.set('active_game_for_chat', this.params._id);
    this.render();
  }
});