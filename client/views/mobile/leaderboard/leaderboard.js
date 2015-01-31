/*****************************************************************************/
/* Leaderboard: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Leaderboard.events({
});

Template.Leaderboard.helpers({
<<<<<<< HEAD
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
    getPositionsInLeaderboard: function(id) {
        var self = this;
        var index = 0;
        var t = Meteor.users.find({},{sort: {bank_account: -1}});
        var found = false;
        t.forEach(function(y) {
            if (!found) {
                index++;
                found = (y._id == id);
            }
        });
        
        // if (self._id == Meteor.userId()) {
        //     App.track("My place in the leadeboard", {place:index});
        // }
        
        return index;
    }
=======
  leaderboard: function(){
    // ASSAF: Return a list that we can generate the leaderboard from
  }
>>>>>>> d5c5f747f2e331aa21ca9f9608c968a9882d95f6
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