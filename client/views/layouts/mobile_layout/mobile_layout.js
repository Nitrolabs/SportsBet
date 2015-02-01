
Template.newBetsAlert.events({
	'click .alert-close':function(){
		// Clicking close, closes the alert
		Session.set('betAlertClosed',true);
	}
});


// Whenever a new bet is submitted we reopen the alert
Meteor.startup(function(){
	debugger
	Bets.after.update(function(userId, doc){
		console.log('Bet updated');
		if (doc.status=="ACTIVE"){
			Session.set('betAlertClosed',false);
		}
	});
})



Template.newBetsAlert.helpers({
	showBetsAlert:function(){
		console.log("Checking if new bets are available");
		var WHITELISTED = ['leaderboard','history','chat','activebets']
		var current = Router.current().route.getName();

		if (Session.get('betAlertClosed')){
			return false;
		}

		if (_.contains(WHITELISTED,current)){
			// Find out if there are any current bets

		  	var game = Games.findOne({_id: this._id});
		  	var myPrevBets = UserBets.find(
		  	    {user_id: Meteor.userId()}, 
		  	    {fields: {bet_id: 1}}
		  	    ).fetch();
		  	myPrevBets = _.map(myPrevBets, function(x) {return x.bet_id});
		  	var current_bets = Bets.find({_id: {$nin: myPrevBets}, status: "ACTIVE", game_id: game._id}) || {};
			return Boolean(current_bets.count());
		}
	} 
})