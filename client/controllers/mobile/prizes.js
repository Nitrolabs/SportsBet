PrizesController = RouteController.extend({
  waitOn: function () {
      Meteor.subscribe('publish_bets', this.params._id);
  },

  data: function () {
  	var _id = this.params._id;
  	var game = Games.findOne({_id:_id});
  	return {_id:_id,
  			game:game
  		}
  },

  action: function () {
    this.render();
  }
});