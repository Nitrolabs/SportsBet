/*****************************************************************************/
/* Activebets: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Activebets.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Activebets.helpers({
  bets:function(){

    var list_active = _.pluck(Bets.find({status: {$in: ["ACTIVE", "CLOSED"]}}).fetch(), '_id');
    var user_active_bets = UserBets.find({user_id: Meteor.userId(), bet_id: {$in: list_active}}, {sort: {submitted_at: -1}}).fetch();
    user_active_bets.forEach(function(x) {
        var b = Bets.findOne(x.bet_id);
        
        var user_answer = (x.skipped == true) ? "<Skipped>" : b.outcomes[x.answer - 1].text;
        
        var potential_winning = 0;
        if (!x.skipped && x.answer > 0) {
            potential_winning += b.outcomes[x.answer - 1].odds * x.wager;
        } 
        _.extend(x, {question: b.question, user_answer: user_answer, potential_winning: potential_winning});
    });
    return user_active_bets;
  }
});

/*****************************************************************************/
/* Activebets: Lifecycle Hooks */
/*****************************************************************************/
Template.Activebets.created = function () {
};

Template.Activebets.rendered = function () {
};

Template.Activebets.destroyed = function () {
};