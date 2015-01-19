/*****************************************************************************/
/* Game: Event Handlers
/*****************************************************************************/
Template.MobileGame.events({
  'click #buy-chips-button': function (event, template) {
     var userId = Meteor.userId();
     var balance = Meteor.user().bank_account + 100;
     Meteor.users.update(userId, {$set:{bank_account:balance}});
  },

  'click #bet-amount-button': function (event, template) {
     Blaze.render(Template.BetAmount,document.body)
     $(event.target).attr('disabled',true);
  },
    
 'click .bet-option-button':function(tmpl, event){
 	
 	// We need to create a new user-bet, with correct bet_id and user_id
 	var user_bet_amount = Session.get('bet_amount') || 2; //TODO - update this once we have a bar
 	
 	var user_selected_answer = this.index_for_ref + 1;

 	var new_user_bet = {
 	    user_id: Meteor.userId(),
        bet_id: Session.get("user_current_bet_id"), 
        wager: user_bet_amount,
        answer: user_selected_answer,
        skipped: false,
        was_result_displayed: false,
        submitted_at: new Date()
    };
    Meteor.users.update(Meteor.userId(), 
    {
        $inc: {bank_account: -user_bet_amount,
               "user_stats.money_on_the_table": user_bet_amount,
               "user_stats.total_number_of_bets_placed": 1}
    });
    UserBets.insert(new_user_bet);
    console.log("Done! Bet placed successfully! :)" );
 },
 
 'click .bet-skip-button':function(event){
 	// Create a new user-bet, and set the skipped flag to true

 	var new_user_bet = {
 	    user_id: Meteor.userId(),
        bet_id: this._id, 
        wager: 0,
        answer: 0,
        skipped: true,
        was_result_displayed: false,
        submitted_at: new Date()
    };
    
 	UserBets.insert(new_user_bet);
 	
 }
});

/*****************************************************************************/
/* Game: Helpers */
/*****************************************************************************/

Template.MobileGame.helpers({
    // Return the bet amount
    formatted_bet_amount:function(){
        var bet_amount = Session.get('bet_amount');
        return numeral(bet_amount).format('$0,0');
    },
    formatted_bank_account:function(){
        var bank_account = Meteor.user().bank_account;
        return numeral(bank_account).format('$0,0');
    },
    formatted_win_value:function(){
        var win = this.odds*Session.get('bet_amount');
        return '+'+win;
    },
    is_user_bankrupt:function(){
        return Meteor.user().bank_account<=0;
    },
    number_bets:function(){
        var uid = Meteor.userId();
        // TODO: Only select active bets
        return UserBets.find({user_id:uid}).count()
    },
    value_bets:function(){
        // TODO: Only select active bets
        var value = 0;
        var uid = Meteor.userId();
        var bets = UserBets.find({user_id:uid});
        bets.forEach(function(bet){
            value += bet.wager;
        })
        return value;
    }
});


/*****************************************************************************/
/* Game: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileGame.created = function () {
    // Set the session variable for the bet size
    Tracker.autorun(function(){
        if (Meteor.user() && !Meteor.loggingIn()){
            var bet_amount = Meteor.user().profile.bet_amount || 10;
            Session.setDefault('bet_amount',bet_amount);
        }
    });
};

Template.MobileGame.rendered = function () {
};

Template.MobileGame.destroyed = function () {
};