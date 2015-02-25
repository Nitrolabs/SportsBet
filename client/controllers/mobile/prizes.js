PrizesController = RouteController.extend({
  waitOn: function () {
      Meteor.subscribe('publish_bets', this.params._id);
  },

  data: function () {
  	return {_id:this.params._id}
  },

  action: function () {
    this.render();
  }
});