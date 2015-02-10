/*****************************************************************************/
/* Leaderboard: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Leaderboard.events({
});

Template.Leaderboard.helpers({
  
  getUserLeaderboard: function() {

        var maxUsersInLeaderBoard = Session.get('maxUsersInLeaderBoard') || 30;
        var t = Meteor.users.find({},{sort: {bank_account: -1}, limit: maxUsersInLeaderBoard})

        var amIinTop10 = false;
        t.forEach(function(y) {amIinTop10 |= (y._id == Meteor.userId());});
        Session.set('LeaderboardAmIinTop10', amIinTop10);

        // Add the index 
        var z = t.fetch();
        var index = 0;
        z.forEach(function(a) {_.extend(a, {index_in_list: ++index});});
        
        // Return the array
        return z;
    },
    highlightMyselfOnTable: function() {
        return (this._id == Meteor.userId());
    },
    index_outside_of_list: function() {
        return (Session.get('maxUsersInLeaderBoard') || 30) + 1;
    }
    // getPositionsInLeaderboard: function(id) {
    //     var self = this;
    //     var index = 0;
    //     var t = Meteor.users.find({},{sort: {bank_account: -1}});
    //   var found = false;
    //     t.forEach(function(y) {
    //         if (!found) {
    //             index++;
    //             found = (y._id == id);
    //         }
    //     });
    //     return index;
    // }
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