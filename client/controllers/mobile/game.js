MobileGameController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  	// ASSAF: Filter the bets by game ect
  	// ASSAF: Properly select the current_bet
  	var game = Games.findOne({_id: this.params._id});
  	var bets = Bets.find();
  	var current_bet = Bets.findOne()
  	return {game:game,
  		    bets:bets,
  		    current_bet:current_bet
  	};
  },

  action: function () {
    this.render();
  }
});