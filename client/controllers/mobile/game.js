MobileGameController = RouteController.extend({
  waitOn: function () {
      Meteor.subscribe('publish_leaderboard', this.params._id, 30);
    //   console.log("Wait On");
    //   console.log(this.params._id);
      Meteor.subscribe('publish_bets', this.params._id);
      Meteor.subscribe('publish_twitter_feed', this.params._id);
  },

  onBeforeAction: function (route) {
    Tracker.autorun(function(){
      if (!Meteor.userId() && !Meteor.loggingIn())  {
        Session.set('next_page',route.url);
        Router.go('mobile.facebook.login');
      }
    });
    this.next();
  },

  data: function () {

    var game = Games.findOne({_id: this.params._id});
    var bets = Bets.find({game_id: this.params._id});
    var myPrevBets = UserBets.find(
  	    {user_id: Meteor.userId()}, 
  	    {fields: {bet_id: 1}}
  	    ).fetch();
  	myPrevBets = _.map(myPrevBets, function(x) {return x.bet_id});
  	
  	var myTempBets = Session.get("my_temp_bets");
  	if (myTempBets && myTempBets.length > 0) {
  	    var allPrevBets = _.union(myPrevBets, myTempBets);
  	    if (allPrevBets.length != myPrevBets.length) {
  	        myPrevBets = allPrevBets;
  	    }
  	    else {
  	        Session.set("my_temp_bets", null);
  	    }
  	}
  	
  	var current_bet = Bets.findOne({_id: {$nin: myPrevBets}, status: "ACTIVE", game_id: this.params._id}) || {};
  	
  	Session.set("user_current_game_id", this.params._id);
  	Session.set("user_current_bet_id",  current_bet._id);
  	
  	return {_id:this.params._id,
            game:game,
  		      bets:bets,
  		      current_bet:current_bet
  	};
  },

  action: function () {
    this.render();
  }
});