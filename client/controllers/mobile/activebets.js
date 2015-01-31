ActivebetsController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
    var list_active = _.pluck(Bets.find({status: {$in: ["ACTIVE", "CLOSED"]}}).fetch(), '_id');
    var user_active_bets = UserBets.find({user_id: Meteor.userId(), bet_id: {$in: list_active}}, {sort: {submitted_at: -1}});
    return user_active_bets;

  },

  action: function () {
    this.render();
  }
});