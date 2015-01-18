/*****************************************************************************/
/* MainAdmin: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MainAdmin.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
   
   'click [name=selectActiveBet]': function (e, tmpl) {

        console.log(this)

        var new_active_bet_id = this._id;
        
        Session.set('admin_active_bet', new_active_bet_id);
        
        console.log("new_active_bet_id:" + new_active_bet_id);
   },
   
   'click [name=newBetButton]' : function(e,tmpl) {
       
        Session.set('admin_active_bet', null);
        $('#bet_form')[0].reset();
        
        var idx = e.currentTarget.getAttribute('data-sel-idx');

        var currTime = moment().format('h:mm:ss');
        
        
        var preset_data = [
/*BLANK       */ {option1_text: "", option2_text: "",option3_text: "",option4_text: "",title:"",question:""},
/*NEXT PLAY   */ {option1_text: "Touchdown", option2_text: "Intercept", option3_text: "Field Goal",option4_text: "Neither",title:"Next Play",question:"What's going to be the next play?"},
/*QTR RES     */ {option1_text: "Home Team", option2_text: "Away Team", option3_text: "",option4_text: "",title:"Next Q Res",question:"Who is going to win this quarter?"},
/*FINAL SCORE */ {option1_text: "Over 100", option2_text: "Under 100", option3_text: "Field Goal",option4_text: "Neither",title:"Final Score",question:"What's going to be the final score?"}
            
        ];
        $('#bet_title').val(preset_data[idx].title + " " + currTime);
        $('#active_bet_question').val(preset_data[idx].question);
        $('#option1_text').val(preset_data[idx].option1_text);
        $('#option2_text').val(preset_data[idx].option2_text);
        $('#option3_text').val(preset_data[idx].option3_text);
        $('#option4_text').val(preset_data[idx].option4_text);
        
   },
   
   'click #createNewBet' : function(e,tmpl) {
        e.preventDefault();
        
        console.log('click create new bet');
        
        var new_bet = extractBetDataFromAdminForm();
        new_bet.status = "HIDDEN";
        new_bet.submitted_at = new Date();
        
        console.log(new_bet);
        
        var new_bet_id = Bets.insert(new_bet);
        console.log(new_bet_id);
        
        Session.set('admin_active_bet', new_bet_id);
    
   },
   
   'click #saveBet, click #activateBet, click #closeBet': function(e,tmpl) {
       
        e.preventDefault();
        
        var new_bet = extractBetDataFromAdminForm();
        
        if (e.target.id == "saveBet") {
            // Nothing special to do
        }
        else if (e.target.id == "activateBet") {
            
            new_bet.activated_at = new Date();
            new_bet.status = "ACTIVE";
        }
        else if (e.target.id == "closeBet") {
            new_bet.closed_at = new Date();
            new_bet.status = "CLOSED";
        }
        
        Bets.update(
            Session.get('admin_active_bet'), 
            {$set: new_bet}
            );
   },
   
   'click #resolveBet': function(e,tmpl) {

        e.preventDefault();
        
        var new_bet = extractBetDataFromAdminForm();
        var bet_id = Session.get('admin_active_bet');
        
        new_bet.resolved_at = new Date();
        new_bet.status = "RESOLVED";
        
        var relevantUserBets = UserBets.find({bet_id: bet_id, skipped: false});
        
        var statistics = {
         numberOfBets: 0,
         numberOfWinners: 0,
         house_profit: 0
        }
        
        relevantUserBets.forEach(function (userBet) {
            statistics.numberOfBets++;
            var user = Meteor.users.findOne(userBet.user_id);
            
            if (userBet.answer == new_bet.actual_result) {
            
                var money_to_add = userBet.wager * new_bet.outcomes[new_bet.actual_result - 1].odds;
                // update user by adding money
                Meteor.users.update({_id: user._id}, {$inc: {bank_account: money_to_add}});
                
                statistics.numberOfWinners++;
                statistics.house_profit -= money_to_add;
            }
           statistics.house_profit += userBet.wager;
           
           // update User by adding new message to his/her queue 
            Meteor.users.update({_id: user._id}, {
                $push: {'messages_queue': {
                    mid: bet_id, 
                    text: (userBet.answer == new_bet.actual_result ? "WIN! " : "LOSE... ") + new_bet.status_update + 
                    "(" + (userBet.answer == new_bet.actual_result ? (" +$" + money_to_add) : (" -$" + userBet.wager)) + ")"}
                }});
            
            new_bet.statistics = statistics;    
            Bets.update(
                bet_id, 
                {$set: new_bet}
        );
        });
        
   }
   
   
});

var extractBetDataFromAdminForm = function() {
    
    var curr_bet_data = Bets.findOne(Session.get('admin_active_bet'));
    
       var betDataFromForm = 
       {
            game_id: Session.get('admin_active_game'),
    
            title: $('#bet_title').val(),
            question: $('#active_bet_question').val(),
        
            status: curr_bet_data && curr_bet_data.status, 
            
            submitted_at: curr_bet_data && curr_bet_data.submitted_at,
        
            activated_at: curr_bet_data && curr_bet_data.activated_at,
        
            closed_at: curr_bet_data && curr_bet_data.closed_at,
                
            resolved_at: curr_bet_data && curr_bet_data.resolved_at,
                
            status_update: $('#status_update').val(),
                
            actual_result: $('#actual_result').val(),
                
            outcomes: 
            [
                {text: $('#option1_text').val() || " ", odds: $('#option1_odds').val() || 1},
                {text: $('#option2_text').val() || " ", odds: $('#option2_odds').val() || 1},
                {text: $('#option3_text').val() || " ", odds: $('#option3_odds').val() || 1},
                {text: $('#option4_text').val() || " ", odds: $('#option4_odds').val() || 1}
            ]
        };
        
        return betDataFromForm;
   }
Template.MainAdmin.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
   
   getActiveGameName: function() {
       
       var g = Games.findOne(Session.get('admin_active_game'));
       return g && g.title;
   },
   
   betsForThisGame: function() {
     return Bets.find({game_id: Session.get('admin_active_game')}); 
   },
   
   getActiveBet: function() {
     
     var active_bet = Session.get('admin_active_bet');
     
     return active_bet ? Bets.findOne(Session.get('admin_active_bet')) : {};
   },
   
   getOutcomeData: function(index, category) {

       return this.outcomes && this.outcomes[index] && this.outcomes[index][category];
   },
   
   isNewBet: function() {
       return Session.get('admin_active_bet') == undefined || Session.get('admin_active_bet') == "";
   },
   
   getStatusLabelType: function(st) {
       if (st == "HIDDEN") return "default";
       if (st == "ACTIVE") return "success";
       if (st == "CLOSED") return "warning";
       if (st == "RESOLVED") return "info";
       return "default";
       
    }
   
});

/*****************************************************************************/
/* MainAdmin: Lifecycle Hooks */
/*****************************************************************************/
Template.MainAdmin.created = function () {
    
    setTimeout(function() {
           
           // Set some game as default if game does not exist
            var g = Games.findOne();
            if (g && !Session.get('admin_active_game')) {
                Session.set('admin_active_game', g && g._id);
            }
    
       },1000);
};

Template.MainAdmin.rendered = function () {
    
};

Template.MainAdmin.destroyed = function () {
};

