
NOW = new Date()

Meteor.startup(function () {

	// Insert two games
	if (Games.find({}).count() === 0) {
		Games.insert({
		  title:"Sharks vs Leaves",
		  start_datetime:NOW		  
		});

		Games.insert({
		  title:"Rebels vs Cats",
		  start_datetime:NOW   
		});
	}

	// Insert two bets
	if (Bets.find({}).count() === 0){
  		game = Games.findOne();
  		console.log(game)
  		Bets.insert({
  			game_id:game._id,
	    	question:"Do you think the last play in the game will be ...",
	    	title:"Last Play",
	    	status:"HIDDEN",
	    	submitted_at: NOW,
	    	status_update:"Wow did you see that touch down",
	    	outcomes:[
	    		{text:"Isaac Lawn",odds:12},
	    		{text:"Gary Brown",odds:3},
	    		{text:"Harry Sean",odds:2},
	    		{text:"Paul Williams",odds:17}
	    	]
	    });
	    Bets.insert({
  			game_id:game._id,
	    	question:"Will Larry Williams score in the next quarter",
	    	title:"Larry Scores?",
	    	status:"HIDDEN",
	    	submitted_at: NOW,
	    	status_update:"Nope, Larry didn't make it",
	    	outcomes:[
	    		{text:"Yes",odds:12},
	    		{text:"No",odds:3},
	    	]
	    });
	}
});
