ChatController = RouteController.extend({
  waitOn: function () {
      Meteor.subscribe('publish_bets', this.params._id);
      Meteor.subscribe('publish_chats', this.params._id);
  },

  data: function () {
  	return {_id:this.params._id}
  },

  action: function () {
      Session.set('active_game_for_chat', this.params._id);
    this.render();
  }
});