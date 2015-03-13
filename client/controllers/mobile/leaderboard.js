LeaderboardController = RouteController.extend({
  waitOn: function () {
      Meteor.subscribe('publish_leaderboard', this.params._id);
      Meteor.subscribe('publish_bets', this.params._id);
      Session.set('user_current_game_id', this.params._id);
  },

  data: function () {
  	return {_id:this.params._id}
  },

  action: function () {
    this.render();
  }
});