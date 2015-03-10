Meteor.methods({
    /*
     * Example:
     *  '/app/todos/update/email': function (email) {
     *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
     *  }
     *
     */

    '/user/update/after_fb_link': function() {
         if(!this.userId) throw new Error('You must be logged in');
        
        var u = Meteor.users.findOne(this.userId);
        if (u.services && u.services.facebook) {
            u.profile.name = u.services.facebook.name;
            
            var id = u.services.facebook.id;
            var url = "http://graph.facebook.com/"+id+"/picture";
            
            u.profile.image = {};
            u.profile.image.small = url+"?type=small";
            u.profile.image.normal = url+"?type=normal";
            u.profile.image.large = url+"?type=large";
            u.emails[0].address = u.services.facebook.email;
            u.guest = "linked_to_fb";
            
            Meteor.users.update(u._id, {$set: u});
            
            // var xxx = UserStats.find({user_id: this.userId}).fetch();
            // console.log(xxx);
            var t = UserStats.update({user_id: this.userId}, {$set: {user_img: u.profile.image.small, user_name: u.profile.name}})
            // console.log(t);
        }
        
    },
    
    // 'merge_user_with': function(old_user_id) {
    //     console.log('merge_user_with')
    //     if(!this.userId) throw new Error('You must be logged in');
        
    //     var new_user_id = this.userId;
        
    //     var oldUser = Meteor.users.findOne(old_user_id);
    //     var newUser = Meteor.users.findOne(new_user_id);
        
    //     oldUser.services = newUser.services;
    //     oldUser.profile = newUser.profile;
        
    //     var url = "/images/profile.png";
    //     if (newUser.services && newUser.services.facebook){
    //         var id = newUser.services.facebook.id;
    //         url = "http://graph.facebook.com/"+id+"/picture";
    //     }
        
    //     oldUser.profile.image = {};
    //     oldUser.profile.image.small = url+"?type=small";
    //     oldUser.profile.image.normal = url+"?type=normal";
    //     oldUser.profile.image.large = url+"?type=large";
        
    //     Meteor.users.remove(new_user_id);
    //     Meteor.users.update(old_user_id, {$set: oldUser});
        
        
    //     console.log("removed " + new_user_id);
    //     console.log("updated " + old_user_id);
    // },
    '/app/game/bet/submit': function (data) {

        // Allow this function to non-users too
        if(!this.userId) throw new Error('You must be logged in');
        if(UserBets.findOne({user_id:this.userId, bet_id:data.bet_id})) throw new Error('User already bet on this');
        
        Bets.update({
            _id: data.bet_id
            }, {
                $push: {
                    users_in_bet: {selection: data.answer, userid: this.userId}
                }
            })

            Meteor.users.update(this.userId, 
            {
                $inc: {bank_account: -data.wager,
                       "user_stats.money_on_the_table": data.wager,
                       "user_stats.total_number_of_bets_placed": 1,
                        "user_stats.potential_winnings": data.wager * data.odds
                }
            });
            
            UserStats.update({user_id: this.userId, game_id: data.game_id}, {
                $inc: {bank_account: -data.wager,
                       "user_stats.money_on_the_table": data.wager,
                       "user_stats.total_number_of_bets_placed": 1,
                        "user_stats.potential_winnings": data.wager * data.odds
                }
            });
            
            
            var new_user_bet = {
                game_id: data.game_id,
                user_id: this.userId,
                bet_id: data.bet_id,
                wager: data.wager,
                answer: data.answer,
                skipped: false,
                was_result_displayed: false,
                submitted_at: new Date()
            };
            
            UserBets.insert(new_user_bet);

    },
    '/app/game/bet/skip': function (data) {
        var new_user_bet = {
            game_id: data.game_id,
            user_id: this.userId,
            bet_id: data.bet_id,
            wager: 0,
            answer: 0,
            skipped: true,
            was_result_displayed: false,
            submitted_at: new Date()
        };
        
        UserBets.insert(new_user_bet);
    },
     
    '/app/game/bank/req_credit': function() {
        if (!this.userId) return;
        Meteor.users.update(this.userId, {$set:{bank_request_more_funds:"YES"}, $inc: {bank_account: 600}});
    },
    '/app/game/participate': function(game_id) {
        
        if (!this.userId) throw new Meteor.Error(403, "You must be logged in");
        if (UserStats.findOne({game_id: game_id, user_id: this.userId})) return false;
        var u = Meteor.users.findOne(this.userId);
        
        var new_item = {
            user_id: u._id,
            game_id: game_id,
            user_name: u.profile.name,
            user_img: u.profile.image.normal,
            bank_account: 1000, //TODO ASSAF - change to default
            user_stats: {
                money_on_the_table: 0, 
                total_number_of_bets_placed: 0,
                total_number_of_bets_resolved: 0,
                total_wins_in_a_row: 0,
                total_number_of_bets_won: 0,
                bets_won_percentage: 0,
                potential_winnings: 0
            }
        };
        
        UserStats.insert(new_item);
        
        return true;
    },
    'remove_one_from_msg_queue': function() {
        if (!this.userId) return;
        Meteor.users.update(this.userId,{$pop: {messages_queue: -1}});
    },
    'get_total_number_of_players': function(game_id) {
        return UserStats.find({game_id:game_id}).count();
    },
    
    '/admin/bet/resolve': function(bet_id, new_bet) {
        
        var u = Meteor.users.findOne(this.userId);
        if (!u || !u.is_admin) throw new Meteor.Error(403, "Forbidden");
        
        new_bet.resolved_at = new Date();
        new_bet.status = "RESOLVED";
        
        var relevantUserBets = UserBets.find({bet_id: bet_id, skipped: false});
        
        var statistics = {
         numberOfBets: 0,
         numberOfWinners: 0,
         house_profit: 0
        }
        
        // Go over each of the bets that users placed
        relevantUserBets.forEach(function (userBet) {
            
            var user = Meteor.users.findOne(userBet.user_id);
            
            var money_to_add = 0;
            var didWin = (userBet.answer == new_bet.actual_result) ? 1 : 0;
            
            // If the user won, find how much money he/she should get and update the statistics
            if (didWin) {
            
                money_to_add = userBet.wager * new_bet.outcomes[new_bet.actual_result - 1].odds;
                
                statistics.numberOfWinners++;
                statistics.house_profit -= money_to_add;
            }
           statistics.house_profit += userBet.wager;
           statistics.numberOfBets++;
           
           var new_success_ratio = ((user.user_stats.total_number_of_bets_won || 0) + didWin) / ((user.user_stats.total_number_of_bets_resolved || 0) + 1);
           var updateQuery = {
             $inc: {
                bank_account: money_to_add, 
                "user_stats.total_number_of_bets_resolved": 1,
                "user_stats.money_on_the_table": -userBet.wager,
                "user_stats.total_number_of_bets_won": didWin,
                "user_stats.potential_winnings": (-userBet.wager *  new_bet.outcomes[userBet.answer - 1].odds)
             },
             $set: {"user_stats.bets_won_percentage": new_success_ratio},
             
            };
            
            if (didWin) 
                _.extend(updateQuery.$inc, {"user_stats.total_wins_in_a_row": 1});
            else
                _.extend(updateQuery.$set, {"user_stats.total_wins_in_a_row": 0});
            
            // console.log("updateQuery");        
            // console.log(updateQuery);
            
            // Update user_stats
            UserStats.update({user_id: user._id, game_id: new_bet.game_id}, updateQuery);
            
            // update User by adding new message to his/her queue
            _.extend(updateQuery, 
                {$push: {'messages_queue': {
                        mid: bet_id, 
                        text: (didWin ? "WIN! " : "LOSE... ") + new_bet.status_update + 
                        "(" + (didWin ? (" +$" + money_to_add) : (" -$" + userBet.wager)) + ")"}
                        }});
            Meteor.users.update({_id: user._id}, updateQuery);
            
            
            UserBets.update(bet_id, {$set: {resolved_at: new Date()}});
        });
        
        // Update the bet with the calculated statistics
        new_bet.statistics = statistics;    
        Bets.update(bet_id, {$set: new_bet});
    },
    
    'getNextGuestUserId': function(name, def) {
        var x = ConfigValues.findOne({name: name});
        if (!x) {
            ConfigValues.insert({name: name, value: def});
            x = ConfigValues.findOne({name: name});
        }
        ConfigValues.update(x._id, {$inc: {value: 1}});
        return x.value+1;
    },
    
    '/app/getServerTime' : function() {
        return new Date() //.now();
    },
});
