/*****************************************************************************/
/* Game: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Game.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Game.helpers({
  bets: function () {
       return Bets.find(); 
  }
});

/*****************************************************************************/
/* Game: Lifecycle Hooks */
/*****************************************************************************/
Template.Game.created = function () {
};

Template.Game.rendered = function () {
};

Template.Game.destroyed = function () {
};