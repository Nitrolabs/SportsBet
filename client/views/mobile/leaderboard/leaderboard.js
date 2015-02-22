/*****************************************************************************/
/* Leaderboard: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.LeaderboardTable.events({
});

Template.LeaderboardTable.helpers({
  
  removeUnderscores: function(x) {
      if (!x) return x;
      return x.replace("_", " ");
  },
  getUserLeaderboardPreview: function() {
        // console.log('getUserLeaderboardPreview')
        // console.log(this);
        var MAX_USERS_IN_PREVIEW = this.num_users_to_show;
        
        var maxUsersInLeaderBoard = Session.get('maxUsersInLeaderBoardPreview') || 30;
        // var t = Meteor.users.find({},{sort: {bank_account: -1}, limit: maxUsersInLeaderBoard})
        var t = UserStats.find({game_id:Session.get('user_current_game_id')},{sort: {bank_account: -1}, limit: maxUsersInLeaderBoard})
        
        var z = t.fetch();
        var index = 0;
        var my_pos = maxUsersInLeaderBoard + 1;
        var amIinTop10 = false;
        
        z.forEach(function(a) {
            _.extend(a, {index_in_list: ++index});
            if (a.user_id == Meteor.userId()) {my_pos = index;}
        
        });
        Session.set('LeaderboardAmIinTop3', my_pos <= MAX_USERS_IN_PREVIEW);
        Session.set('LeaderboardMyPos', my_pos);
        
        // Return the array
        return z.slice(0,MAX_USERS_IN_PREVIEW);
    },
    highlightMyselfOnTable: function() {
        return (this.user_id == Meteor.userId());
    },
    index_outside_of_list: function() {
        return (Session.get('maxUsersInLeaderBoard') || 30) + 1;
    },
    getMyPositionInLeaderboard: function() {
        var pos = Session.get('LeaderboardMyPos');
        return pos;
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
Template.LeaderboardTable.created = function () {
    // console.log('LeaderboardTable.created ' + num_users_to_show);
    var max = (this.data && this.data.num_users_to_show) || 3;
    
};

Template.Leaderboard.rendered = function () {
};

Template.Leaderboard.destroyed = function () {
};