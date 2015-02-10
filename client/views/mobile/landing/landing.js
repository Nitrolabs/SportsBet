/*****************************************************************************/
/* Landing: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileLanding.events({
  
   'click .button-game-select': function (e, tmpl) {
    //   console.log(this);
       var game_id = this._id;
       Meteor.call('/app/game/participate', game_id, function(error, resp) {
           if (error) 
                console.error(error);
           else {
               if (resp) {
                    console.log("Join game " + game_id);
                    App.track("Participate in Game", {game_id: game_id});
               }
           }
       });
   }
});

Template.MobileLanding.helpers({
  // The game that is most important right now
  // TODO: Decide on a strategy to order or games.
  // Note: Even at this prototype stage we really need to handle games, because
  // they are fundemental to the /mobile/game/game_id/ page.
  featured_game:function(){
    var soon = new Date();
    soon.setHours(soon.getHours()+24);
    var not_over = new Date();
    not_over.setHours(not_over.getHours()-5);
    
    return Games.findOne({status: "ACTIVE", start_datetime: {$gte:not_over, $lte:soon}}, {sort: {start_datetime: 1}});
  },

  // Other games that are being played right now
  active_games:function(){
    // ASSAF: This is a bit nasty, can you come up with a better way to do this??
    var games;
    var now = new Date();
    var featured = Template.MobileLanding.__helpers[" featured_game"]();
    if (featured){
      games = Games.find({
        _id: {$ne:featured._id}, 
        status: "ACTIVE",
        start_datetime: {$lte:now}
      });
    } else {
      games = Games.find({
        start_datetime: {$lte:now},
        status: "ACTIVE"
      });
    }
    return games;
  },

  // Games that will be played in the future
  upcoming_games:function(){
    var games;
    var now = new Date();
    var featured = Template.MobileLanding.__helpers[" featured_game"]();
    if (featured){
      games = Games.find({
        _id: {$ne:featured._id}, 
        status: "ACTIVE",
        start_datetime: {$gte:now}
      });
    } else {
      games = Games.find({
        start_datetime: {$gte:now},
        status: "ACTIVE"
      });
    }
    return games;
  }
});

/*****************************************************************************/
/* Landing: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileLanding.created = function () {
};

Template.MobileLanding.rendered = function () {
};

Template.MobileLanding.destroyed = function () {
};