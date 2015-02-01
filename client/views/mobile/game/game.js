/*****************************************************************************/
/* Game: Event Handlers
/*****************************************************************************/
const DISTANCE_FROM_ME = 2 // in kilometers
const USERS_IN_PAST_TIME = 2 // in hours
Template.MobileGame.events({
    'click #bet-amount-button-pos':function() {
        var max_bet = Meteor.user().bank_account;
        var currBetAmount = Session.get('bet_amount');
        var delta = 5;
        if (currBetAmount < 20)        { delta = 5;   }
        else if (currBetAmount < 50)   { delta = 10;  }
        else if (currBetAmount < 100)  { delta = 20;  }
        else if (currBetAmount < 500)  { delta = 50;  }
        else if (currBetAmount < 1000) { delta = 100; }
        else                           { delta = 250; }
        
        var newBetAmount = (Math.floor(currBetAmount / delta) + 1) * delta;
        
        if (newBetAmount > max_bet)
            newBetAmount = max_bet;
        Session.set('bet_amount', newBetAmount); 
    },
    'click #bet-amount-button-neg':function() {
        var max_bet = Meteor.user().bank_account;
        var currBetAmount = Session.get('bet_amount');
        
        var delta = 5;
        if (currBetAmount <= 20)        { delta = 5;   }
        else if (currBetAmount <= 50)   { delta = 10;  }
        else if (currBetAmount <= 100)  { delta = 20;  }
        else if (currBetAmount <= 500)  { delta = 50;  }
        else if (currBetAmount <= 1000) { delta = 100; }
        else                            { delta = 250; }
        
        var newBetAmount = Math.floor((currBetAmount / delta)-0.001) * delta;
        
        if (newBetAmount <= 5) {
            newBetAmount = 5;
        }
        
        if (newBetAmount > max_bet) {
            newBetAmount = max_bet;
        }
        
        Session.set('bet_amount', newBetAmount); 
    },
    'click #side-menu-button':function(){
        //IonSideMenu.snapper.open();
    },

    'click #see-nearby-people': function(event, template) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            // reject case TODO
        }

        function showPosition(position) {
                Meteor.users.update({
                    _id: Meteor.userId()
                }, {
                    $set: {
                        "location.latitude": position.coords.latitude,
                        "location.longitude": position.coords.longitude,
                        "location.time": new Date()
                    }
                }, {
                    expireAfterSeconds: 10
                })
                var nearby_users = []
                var users = Meteor.users.find({
                    $and: [{
                        "location": {
                            $exists: true
                        },
                        "location.time": {
                            // milisecond
                            $gt: (new Date((new Date()).getTime() - (USERS_IN_PAST_TIME * 60 * 60 * 1000)))
                        }
                    }]
                })
                users.forEach(function(item) {
                    if (getDistanceFromLatLonInKm(item.location.latitude,
                            item.location.longitude, position.coords.latitude,
                            position.coords.longitude) < DISTANCE_FROM_ME) {
                        nearby_users.push(item._id)
                    }
                })
                Session.set("nearby_users", nearby_users);
                console.log(nearby_users)
            }
            //calc distance based on latitude and longitude
            //TODO: change to use API for performance reason?
        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1); // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }
    },

    'click #buy-chips-button': function(event, template) {
        // Meteor.users.update(Meteor.userId(), {$inc:{bank_account:100}});
        Meteor.users.update(Meteor.userId(), {$set:{bank_request_more_funds:"YES"}});
        App.track("Ask for more money", {});
    },

    'click #bet-amount-button': function (event, template) {
        App.track("BetSliderOpen", {})
        Blaze.render(Template.BetAmount,document.body)
        $(event.target).attr('disabled',true);
    },

    'click .bet-option-button': function(event, template) {
        var context = this;

        // Grey out the button
        $(event.target).addClass('clicked');
        $(event.target).parent().addClass('clicked');

        // Disable all other choices
        $('.bet-option-button').attr('disabled', true);

        // Wait for 1 second before submitting the bet
        setTimeout(function() {
            submitBet(context);
            $(event.target).removeClass('clicked');
            $(event.target).parent().removeClass('clicked');
            $('.bet-option-button').removeAttr('disabled');
        }, 1000);

        function submitBet(context){
            console.log("submitBet");
            console.log(context);
         	// We need to create a new user-bet, with correct bet_id and user_id
         	var user_bet_amount = Session.get('bet_amount');          	
         	var user_selected_answer = context.index_for_ref + 1;
         	var odds = context.odds || 1;
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

            Bets.update({
                _id: Session.get("user_current_bet_id")
            }, {
                $push: {
                    users_in_bet: user_in_bet
                }
            })

            Meteor.users.update(Meteor.userId(), 
            {
                $inc: {bank_account: -user_bet_amount,
                       "user_stats.money_on_the_table": user_bet_amount,
                       "user_stats.total_number_of_bets_placed": 1,
                        "user_stats.potential_winnings": user_bet_amount * odds
                }
            });
            UserBets.insert(new_user_bet);

            if (Session.get('bet_amount') > Meteor.user().bank_account && Meteor.user().bank_account > 0) {
                Session.set('bet_amount', Meteor.user().bank_account);
            }
            App.track("Bet Place", new_user_bet);
            // console.log("Done! Bet placed successfully! :)" );
        }
    },

    'click #bet-skip-button': function(event) {
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
     	App.track("Bet Skip", new_user_bet);
    }
});

/*****************************************************************************/
/* Game: Helpers */
/*****************************************************************************/
//Jialu
// console.log("zhujialu")
//     // var xx = navigator.geolocation
//     // console.log(xx)
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
// }

// function showPosition(position) {
//     console.log(position.coords.latitude)
//         // "<br />Longitude: " + position.coords.longitude;  
// }

Template.MobileGame.helpers({
    users_nearby: function() {
        return Session.get("nearby_users");
    },

    users_in_question: function(question) {
        question = question + 1; // Swap to base-1 indexing;
        // Release users at 5 second intervals
        // var time_since_render = new Date()-App.page.rendered;
        //var max_items = Math.floor(time_since_render/1000/5);
        var MAX_USERS = 8
        var bet_id = Session.get('user_current_bet_id');
        var bet = Bets.findOne({
            _id: bet_id
        })
        if (bet) {
            var users = bet.users_in_bet || [] // REMOVE THIS WHEN USERS_IN_BET is always defined
            users = users.slice(-MAX_USERS);
            // Find the user_ids of people that selected this question
            var user_ids = _.chain(users).where({
                selection: question
            }).pluck('userid').value();
            return Meteor.users.find({
                _id: {
                    $in: user_ids
                }
            });
        }
    },

    current_status_message: function() {
        return Session.get('current_status_message')
    },

    facebook_profile_image: function(fbid) {
        return "http://graph.facebook.com/" + fbid + "/picture/?type=small";
    },

    // Return the bet amount
    formatted_bet_amount: function() {
        var bet_amount = Session.get('bet_amount');
        return numeral(bet_amount).format('$0,0');
    },

    disable_based_on_bank_account: function() {
        return Meteor.user().bank_account > 0 ? "" : "disabled"
    },

    formatted_bank_account: function() {
        var bank_account = Meteor.user().bank_account;
        return numeral(bank_account).format('$0,0');
    },
    formatted_win_value: function() {
        var win = this.odds * Session.get('bet_amount');
        return '+' + win;
    },
    is_user_bankrupt: function() {
        return Meteor.user().bank_account <= 0;
    },
    number_bets: function() {
        var s = Meteor.user().user_stats;
        return (s.total_number_of_bets_placed - s.total_number_of_bets_resolved);
    },
    value_bets: function() {
        return Meteor.user().user_stats.money_on_the_table;
    }
});



/*****************************************************************************/
/* Game: LeaderboardPreview Helpers */
/*****************************************************************************/

Template.LeaderboardPreview.helpers({
    getUserLeaderboard: function() {
        var maxUsersInLeaderBoard = Session.get('maxUsersInLeaderBoard') || 3;
        var t = Meteor.users.find({},{sort: {bank_account: -1}, limit: maxUsersInLeaderBoard})
        
        var amIinTop10 = false;
        t.forEach(function(y) {amIinTop10 |= (y._id == Meteor.userId());});
        Session.set('LeaderboardAmIinTop10', amIinTop10);
                return t;
    },
    highlightMyselfOnTable: function() {
        return (this._id == Meteor.userId());
    },
    getPositionsInLeaderboard: function() {
        var self = this;
        var index = 0;
        var t = Meteor.users.find({},{sort: {bank_account: -1}});
       var found = false;
        t.forEach(function(y) {
            if (!found) {
                index++;
                found = (y._id == self._id);
            }
        });
        return index;
    }
});




/*****************************************************************************/
/* Game: Collection Hooks */
/*****************************************************************************/


function onStatusChange(){
    // console.log('status changed');
    setTimeout(function(){
        $('.status_message').addClass('text-warning');
    }, 300);
    setTimeout(function() {
        $('.status_message').removeClass('text-warning');
    }, 2500);
    setTimeout(function() {
        $('.status_message').addClass('text-muted');
    }, 5000);
}

function onBankUp(amount){
    
    // console.log('bank went up');
    App.track("Bank went up", {amount:amount});
    $('.bet-user-bank').addClass('success');
    $('.bet-user-bank span').addClass('text-success');
    setTimeout(function() {
        $('.bet-user-bank').removeClass('success');
        $('.bet-user-bank span').removeClass('text-success');
    }, 1000);
}

function onBankDown(amount){
    App.track("Bank went down", {amount:amount});
    $('.bet-user-bank').addClass('danger');
    $('.bet-user-bank span').addClass('text-danger');
    setTimeout(function() {
        $('.bet-user-bank').removeClass('danger');
        $('.bet-user-bank span').removeClass('text-danger');
    }, 1000);
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
        if (fieldNames.filter(function(f) {
                return (f == "bank_account");
            }).length > 0) {

            // up or down will be based on the modifier
            if ((modifier && modifier.$inc && modifier.$inc.bank_account)
                // || (modifier && modifier.$inc && modifier.$set.bank_account)
            ) {
                if ((modifier.$inc && modifier.$inc.bank_account > 0)
                    // || (modifier.$set && modifier.$set.bank_account > ?)
                ) {
                    onBankUp(modifier.$inc.bank_account)
                } else {
                    onBankDown(modifier.$inc.bank_account)
                }
            }
        }
    }
});


/*****************************************************************************/
/* Game: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileGame.created = function() {
    // Set the session variable for the bet size
    setInterval(function() {
        // This will run every 5000 ms and update the session
        if (Meteor.user().messages_queue.shift()) {
            onStatusChange()
            var message = Meteor.user().messages_queue.shift().text
            Session.set('current_status_message', message)
            Meteor.users.update({
                _id: Meteor.userId()
            }, {
                $pop: {
                    messages_queue: -1
                }
            })
        } else {
            Session.set('current_status_message', "")
        }
    }, 7500);

    Tracker.autorun(function() {
        if (Meteor.user() && !Meteor.loggingIn()) {
            var bet_amount = Meteor.user().profile.bet_amount || 50;
            Session.setDefault('bet_amount', bet_amount);
        }
    });

    //$('')
    // Record the time this element was created
    App.page = {}
    App.page.rendered = new Date();
};

Template.MobileGame.rendered = function(a, b, c) {};

Template.MobileGame.destroyed = function () {
};
