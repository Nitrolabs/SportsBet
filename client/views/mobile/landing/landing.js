/*****************************************************************************/
/* Landing: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileLanding.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.MobileLanding.helpers({
  // The game that is most important right now
  // TODO: Decide on a strategy to order or games.
  // Note: Even at this prototype stage we really need to handle games, because
  // they are fundemental to the /mobile/game/game_id/ page.
  featured_game:function(){
    var now = new Date();
    return Games.findOne({start_datetime:{$lte:now}});
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
        start_datetime: {$lte:now}
      });
    } else {
      games = Games.find({
        start_datetime: {$lte:now}
      });
    }
    return games;
  },

  // Games that will be played in the future
  upcoming_games:function(){
    var now = new Date();
    window.alert(Meteor.userId())
    return Games.find({start_datetime:{$gte:now}});
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