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
   
   'click #newBetButton' : function(e,tmpl) {
       
        Session.set('admin_active_bet', null);
        $('#bet_form')[0].reset();
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
        //     {
                
        //         title: new_bet.title,
        //         question: new_bet.question,
            
        //         status: new_bet.status,
                
        //         activated_at: new_bet.activated_at,
            
        //         closed_at: new_bet.closed_at,
                    
        //         resolved_at: new_bet.resolved_at,
                    
        //         status_update: new_bet.status_update,
                    
        //         actual_result: new_bet.actual_result
                    
        //         outcomes: new_bet.outcomes
        //     }
        // );
        
   },
   
   'click #resolveBet': function(e,tmpl) {

        e.preventDefault();
        
        var new_bet = extractBetDataFromAdminForm();
        
        new_bet.resolved_at = new Date();
        new_bet.status = "RESOLVED";
        
        Bets.update(
            Session.get('admin_active_bet'), 
            {$set: new_bet}
        );
   }
   
   
});

var extractBetDataFromAdminForm = function() {
    
    var curr_bet_data = Bets.findOne(Session.get('admin_active_bet'));
    
       var betDataFromForm = 
       {
            game_id: Session.get('admin_active_game'),
    
            title: $('#bet_title').val(),
            question: $('#active_bet_question').val(),
        
            status: curr_bet_data && curr_bet_data.status, // TODO: One of HIDDEN,ACTIVE,CLOSED,RESOLVED
            
            submitted_at: curr_bet_data && curr_bet_data.submitted_at,
        
            activated_at: curr_bet_data && curr_bet_data.activated_at,
        
            closed_at: curr_bet_data && curr_bet_data.closed_at,
                
            resolved_at: curr_bet_data && curr_bet_data.resolved_at,
                
            status_update: $('#status_update').val(),
                
            actual_result: $('#actual_result').val(),
                
            outcomes: 
            [
                {text: $('#option1_text').val(), odds: $('#option1_odds').val()},
                {text: $('#option2_text').val(), odds: $('#option2_odds').val()},
                {text: $('#option3_text').val(), odds: $('#option3_odds').val()},
                {text: $('#option4_text').val(), odds: $('#option4_odds').val()}
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

