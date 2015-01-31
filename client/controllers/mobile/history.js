HistoryController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
    var list_history = _.pluck(Bets.find({status:"RESOLVED"}).fetch(), '_id');
    var user_history_bets = UserBets.find({user_id: Meteor.userId(), bet_id: {$in: list_history}}, {sort: {resolved_at: -1}});
    return {
      _id:this.params._id,
      bets:user_history_bets
    }
  },

  action: function () {
    this.render();
  }
});