ChatController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  	return {_id:this.params._id}
  },

  action: function () {
    //   console.log(this);
      
      Session.set('active_game_for_chat', this.params._id);
    this.render();
  }
});