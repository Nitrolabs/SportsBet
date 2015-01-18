MobileGameController = RouteController.extend({
  waitOn: function () {
  },

  onBeforeAction: function (route) {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      Session.set('next_page',route.url);
      Router.go('mobile.login');
    }
    this.next();
  },
  

  data: function () {
  	// ASSAF: Filter the bets by game ect
  	// ASSAF: Properly select the current_bet
  	var game = Games.findOne({_id: this.params._id});
  	var bets = Bets.find();
  	var myPrevBets = UserBets.find(
  	    {}, //TODO: should be {user_id: Meteor.userId()}, 
  	    {fields: {bet_id: 1}}
  	    ).fetch();
  	myPrevBets = _.map(myPrevBets, function(x) {return x.bet_id});
  	var current_bet = Bets.findOne({_id: {$nin: myPrevBets}, status: "ACTIVE"}) || {};
  	
  	Session.set("user_current_bet_id", current_bet._id);
  	
  	return {game:game,
  		    bets:bets,
  		    current_bet:current_bet
  	};
  },

  action: function () {
    this.render();
  }
});