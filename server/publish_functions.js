Meteor.publish(null, function() {
    var u = Meteor.users.findOne(this.userId);
    if (!u) return null;
    var r;
    // if (!u.is_admin)
         r = Meteor.users.find({_id: this.userId}, {fields: {secrets: 0}})
    // else
        // r = Meteor.users.find({}, {fields: {secrets: 0}});
    
    var s = UserStats.find({user_id:this.userId});
    return [r,s];
});

Meteor.publish('admin_get_all_data', function(game_id) {
    // TODO: protect if it is not an admit - return only me Meteor.publish(null, function() {
    //return Meteor.users.find({_id: this.userId}, {fields: {secrets: 0}});
    var u = Meteor.users.findOne(this.userId);
    if (!u || !u.is_admin) return null;

    return [
        Meteor.users.find({}, {fields: {secrets: 0}}),
        Games.find(),
        Bets.find(),
        UserStats.find({game_id: game_id})
        // UserBets.find({game_id: game_id})
    ]
});

Meteor.publish('publish_all_games', function() {
    // TODO: protect if it is not an admit - return only me Meteor.publish(null, function() {
    //return Meteor.users.find({_id: this.userId}, {fields: {secrets: 0}});
    return Games.find();
});

Meteor.publish('publish_leaderboard', function(game_id, max) {
  if(!this.userId) return null;
  var maxUsersInLeaderBoard = max || 30;
//   var t = Meteor.users.find({},{sort: {bank_account: -1}, limit: maxUsersInLeaderBoard,
//       fields: {username:1,user_stats:1,roles:1,profile:1,bank_account:1}
      
//   });
  
  var p = UserStats.find({game_id:game_id}, {sort: {bank_account: -1}, limit: maxUsersInLeaderBoard});
    
    return [p];  
  });

Meteor.publish('publish_bets', function(game_id) {
    
    var game = Games.find(game_id);
  	var bets = Bets.find({game_id: game_id});
  	var myPrevBets = UserBets.find({user_id: this.userId, game_id: game_id});
  	var myStats = UserStats.find({game_id:game_id, user_id: this.userId});
//   	myPrevBets = _.map(myPrevBets, function(x) {return x.bet_id});
//   	var current_bet = Bets.findOne({_id: {$nin: myPrevBets}, status: "ACTIVE", game_id: this.params._id}) || {};
  	
//   	Session.set("user_current_game_id", this.params._id);
//   	maxUsersInLeaderBoard

    // return game;
  	return [game,bets,myPrevBets,myStats];
//   	};
});

Meteor.publish('publish_chats', function(game_id) {
    
  	return Chats.find({game_id: game_id});
});

Meteor.publish('publish_twitter_feed', function(game_id) {
    // TODO: filter based on active game
  	return TwitterFeed.find({},{sort: {created_at: -1}, limit: 50});
});

Meteor.publish('publish_featured_game', function() {
    
    var soon = new Date();
    soon.setHours(soon.getHours()+48);
    var not_over = new Date();
    not_over.setHours(not_over.getHours()-5);
    
    return Games.find({status: "ACTIVE", start_datetime: {$gte:not_over, $lte:soon}}, {sort: {start_datetime: 1}, limit: 1});
});