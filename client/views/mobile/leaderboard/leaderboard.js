/*****************************************************************************/
/* Leaderboard: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Leaderboard.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});


Template.Leaderboard.helpers({
    getUserLeaderboard: function() {
        var maxUsersInLeaderBoard = Session.get('maxUsersInLeaderBoard') || 3;
        var t = Meteor.users.find({},{sort: {bank_account: -1}, limit: maxUsersInLeaderBoard})
        
        var amIinTop10 = false;
        t.forEach(function(y) {amIinTop10 |= (y._id == Meteor.userId());});
        Session.set('LeaderboardAmIinTop10', amIinTop10);
        
        return t;
    },
    highlightMyselfOnTable: function() {
        return (this._id == Meteor.userId());
    },
    getPositionsInLeaderboard: function() {
        var self = this;
        var index = 0;
        var t = Meteor.users.find({},{sort: {bank_account: -1}});
        var found = false;
        t.forEach(function(y) {
            if (!found) {
                index++;
                found = (y._id == self._id);
            }
        });
        return index;
    }
});

/*****************************************************************************/
/* Leaderboard: Lifecycle Hooks */
/*****************************************************************************/
Template.Leaderboard.created = function () {
};

Template.Leaderboard.rendered = function () {
};

Template.Leaderboard.destroyed = function () {
};