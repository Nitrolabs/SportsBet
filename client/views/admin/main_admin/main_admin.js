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
   }
});

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
     return Bets.findOne(Session.get('admin_active_bet'));
   },
   
   getOutcomeData: function(index, category) {
       console.log(this);
       return this.outcomes[index][category];
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

