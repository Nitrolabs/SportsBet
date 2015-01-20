/*****************************************************************************/
/* Game: Event Handlers
/*****************************************************************************/
Template.MobileGame.events({
  'click #side-menu-button':function(){
    //IonSideMenu.snapper.open();
  },

  'click #buy-chips-button': function (event, template) {
     Meteor.users.update(Meteor.userId(), {$inc:{bank_account:100}});
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
    current_status_message:function(){
        return Session.get('current_status_message')
    },

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
        var s = Meteor.user().user_stats;
        return (s.total_number_of_bets_placed - s.total_number_of_bets_resolved);
    },
    value_bets:function(){
        return Meteor.user().user_stats.money_on_the_table;
    }
});

/*****************************************************************************/
/* Game: Collection Hooks */
/*****************************************************************************/

function onStatusChange(){
    console.log('status changed')
}

// https://github.com/matb33/meteor-collection-hooks
Meteor.users.after.update(function(userId, doc, fieldNames, modifier, options) {
    
    /*******************************************************************************************************************************
    /* IMPORTANT COMMENT! WHEN CHANGING bank_account, we should use $inc and not $set (otherwise we cannot tell if it's up or down) */
    /********************************************************************************************************************************/
    
    // If money changed (up or down...)
    if (Meteor.userId() == userId) {
        // Session.set('debug_fieldNames', fieldNames);
        // Session.set('debug_doc', doc);
        if (fieldNames.filter(function(f) {return (f == "bank_account");}).length > 0) {
            
            // up or down will be based on the modifier
            if ((modifier && modifier.$inc && modifier.$inc.bank_account)
                // || (modifier && modifier.$inc && modifier.$set.bank_account)
                ) {
                if ((modifier.$inc && modifier.$inc.bank_account > 0)  
                    // || (modifier.$set && modifier.$set.bank_account > ?)
                    ) {
                    console.log("user money went up! " + modifier.$inc.bank_account);
                    // MAX: Write UI code
                }
                else {
                    console.log("user money went down! " + modifier.$inc.bank_account);
                    // MAX: Write UI code
                }
            }
            
            // Session.set('debug_modifier', modifier);
        }
    }
    

    // TODO ASSAF: implement this part after Jialu makes his change
    //   if (status_message_changed){
    //         MAX: Write UI code
    //   }
    // console.log(userId);
    // console.log(doc);
    // console.log(fieldNames);
    // console.log(modifier);
    // console.log(options);
 });


/*****************************************************************************/
/* Game: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileGame.created = function () {
    // Set the session variable for the bet size
    setInterval(function(){
        // This will run every 5000 ms and update the session
        if (Meteor.user().messages_queue.shift()){
            onStatusChange()
            var message = Meteor.user().messages_queue.shift().text
            Session.set('current_status_message',message)
            Meteor.users.update({_id: Meteor.userId()}, { $pop: { messages_queue: -1 } } )
        } else {
            Session.set('current_status_message',"no msg now")
        }
    },5000);

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