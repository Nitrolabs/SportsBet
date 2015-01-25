/*****************************************************************************/
/* Game: Event Handlers
/*****************************************************************************/
Template.MobileGame.events({
    'click #side-menu-button':function(){
        //IonSideMenu.snapper.open();
    },

    'click #buy-chips-button': function (event, template) {
        // Meteor.users.update(Meteor.userId(), {$inc:{bank_account:100}});
        Meteor.users.update(Meteor.userId(), {$set:{bank_request_more_funds:"YES"}});
    },

    'click #bet-amount-button': function (event, template) {
        Blaze.render(Template.BetAmount,document.body)
        $(event.target).attr('disabled',true);
    },
    
    'click .bet-option-button':function(event, template){
        var context = this;

        // Grey out the button
        $(event.target).addClass('clicked');
        $(event.target).parent().addClass('clicked');

        // Disable all other choices
        $('.bet-option-button').attr('disabled',true);
        
        // Wait for 1 second before submitting the bet
        setTimeout(function(){
            submitBet(context);
            $(event.target).removeClass('clicked');
            $(event.target).parent().removeClass('clicked');
            $('.bet-option-button').removeAttr('disabled');
        },1000);


        function submitBet(context){
         	// We need to create a new user-bet, with correct bet_id and user_id
         	var user_bet_amount = Session.get('bet_amount');          	
         	var user_selected_answer = context.index_for_ref + 1;

            var user_in_bet = {
                selection: user_selected_answer,
                userid: Meteor.userId(),
            }

         	var new_user_bet = {
         	    user_id: Meteor.userId(),
                bet_id: Session.get("user_current_bet_id"), 
                wager: user_bet_amount,
                answer: user_selected_answer,
                skipped: false,
                was_result_displayed: false,
                submitted_at: new Date()
            };

            Bets.update({_id: Session.get("user_current_bet_id")}, 
                { $push: { users_in_bet: user_in_bet} })

            Meteor.users.update(Meteor.userId(), 
            {
                $inc: {bank_account: -user_bet_amount,
                       "user_stats.money_on_the_table": user_bet_amount,
                       "user_stats.total_number_of_bets_placed": 1}
            });
            UserBets.insert(new_user_bet);
            
            if (Session.get('bet_amount') > Meteor.user().bank_account && Meteor.user().bank_account > 0) {
                Session.set('bet_amount',Meteor.user().bank_account);
            }
            console.log("Done! Bet placed successfully! :)" );
        }
    },
         
    'click #bet-skip-button':function(event){
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
    users_in_question:function(question){
        question = question + 1; // Swap to base-1 indexing;
        // Release users at 5 second intervals
        // var time_since_render = new Date()-App.page.rendered;
        //var max_items = Math.floor(time_since_render/1000/5);
        var MAX_USERS = 10
        var bet_id = Session.get('user_current_bet_id');
        var bet = Bets.findOne({_id:bet_id})
        if (bet){
            var users = bet.users_in_bet || [] // REMOVE THIS WHEN USERS_IN_BET is always defined
            users = users.slice(-MAX_USERS);
            // Find the user_ids of people that selected this question
            var user_ids = _.chain(users).where({selection:question}).pluck('userid').value();
            return Meteor.users.find({_id:{$in:user_ids}});
        }
    },

    current_status_message:function(){
        return Session.get('current_status_message')
    },

    facebook_profile_image:function(fbid){
        return "http://graph.facebook.com/" + fbid + "/picture/?type=small";
    },

    // Return the bet amount
    formatted_bet_amount:function(){
        var bet_amount = Session.get('bet_amount');
        return numeral(bet_amount).format('$0,0');
    },

    disable_based_on_bank_account:function(){
        return Meteor.user().bank_account > 0 ? "" : "disabled"
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
    console.log('status changed');
    setTimeout(function(){
        $('.status_message').addClass('text-warning');
    },300);
    setTimeout(function(){
        $('.status_message').removeClass('text-warning');
    },2500);
    setTimeout(function(){
        $('.status_message').addClass('text-muted');
    },5000);
}

function onBankUp(amount){
    
    console.log('bank went up');
    $('.bet-user-bank').addClass('success');
    $('.bet-user-bank span').addClass('text-success');
    setTimeout(function(){
        $('.bet-user-bank').removeClass('success');
        $('.bet-user-bank span').removeClass('text-success');
    },1000);
}

function onBankDown(amount){
    console.log('bank went down');
    $('.bet-user-bank').addClass('danger');
    $('.bet-user-bank span').addClass('text-danger');
    setTimeout(function(){
        $('.bet-user-bank').removeClass('danger');
        $('.bet-user-bank span').removeClass('text-danger');
    },1000);
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
                    onBankUp(modifier.$inc.bank_account)
                }
                else {
                    onBankDown(modifier.$inc.bank_account)
                }
            }
        }
    }
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
            Session.set('current_status_message',"")
        }
    },5000);

    Tracker.autorun(function(){
        if (Meteor.user() && !Meteor.loggingIn()){
            var bet_amount = Meteor.user().profile.bet_amount || 50;
            Session.setDefault('bet_amount',bet_amount);
        }
    });

    // Record the time this element was created
    App.page = {}
    App.page.rendered = new Date();
};

Template.MobileGame.rendered = function (a,b,c) { 
};

Template.MobileGame.destroyed = function () {
};