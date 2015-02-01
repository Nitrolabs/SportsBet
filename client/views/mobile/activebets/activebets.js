/*****************************************************************************/
/* Activebets: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Activebets.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Activebets.helpers({
  bets:function(){
    // Assaf: Return a list of bets
    return [{
        _id: "poJ6zZ9n5L9cfg86h",
        game_id: "T8Jpep6T4r9PgTMNj",
        outcomes: [1,2,3,4],
        question: "Do you think the last play in the game will be ...",
        status: "HIDDEN",
        status_update: "Wow did you see that touch down",
        submitted_at: "Sat Jan 31 2015 11:49:33 GMT-0800 (PST)",
        title: "Last Play",

        user_answer: "Touch Down", //XXX Added field to be populated
        correct_answer: "Field Goal", //XXX Added field to be populated
        is_correct: true //XXX Added field to be populated if the bet was correct
      }]
    },
});

/*****************************************************************************/
/* Activebets: Lifecycle Hooks */
/*****************************************************************************/
Template.Activebets.created = function () {
};

Template.Activebets.rendered = function () {
};

Template.Activebets.destroyed = function () {
};