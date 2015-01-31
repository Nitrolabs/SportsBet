/*****************************************************************************/
/* History: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.History.events({
});

Template.History.helpers({
  bets:function(){
    
    var list_history = _.pluck(Bets.find({status:"RESOLVED"}).fetch(), '_id');
    var user_history_bets = UserBets.find({user_id: Meteor.userId(), bet_id: {$in: list_history}}, {sort: {resolved_at: -1}});
    return user_history_bets;
  }
});

/*****************************************************************************/
/* History: Lifecycle Hooks */
/*****************************************************************************/
Template.History.created = function () {
};

Template.History.rendered = function () {
};

Template.History.destroyed = function () {
};