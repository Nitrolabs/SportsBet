Meteor.publish(null, function() {
    var u = Meteor.users.findOne(this.userId);
    if (!u) return null;
    if (!u.is_admin)
        return Meteor.users.find({_id: this.userId}, {fields: {secrets: 0}});
    else
        return Meteor.users.find({}, {fields: {secrets: 0}});
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
  var t = Meteor.users.find({},{sort: {bank_account: -1}, limit: maxUsersInLeaderBoard,
      fields: {username:1,user_stats:1,roles:1,profile:1,bank_account:1}
      
  });
    
    return t;  
  });

Meteor.publish('publish_bets', function(game_id) {
    
    var game = Games.find(game_id);
  	var bets = Bets.find({game_id: game_id});
  	var myPrevBets = UserBets.find({user_id: this.userId, game_id: game_id});
//   	myPrevBets = _.map(myPrevBets, function(x) {return x.bet_id});
//   	var current_bet = Bets.findOne({_id: {$nin: myPrevBets}, status: "ACTIVE", game_id: this.params._id}) || {};
  	
//   	Session.set("user_current_game_id", this.params._id);
//   	maxUsersInLeaderBoard

    // return game;
  	return [game,bets,myPrevBets];
//   	};
});

Meteor.publish('publish_chats', function(game_id) {
    
  	return Chats.find({game_id: game_id});
});