/*****************************************************************************/
/* Prizes: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Prizes.events({
});

Template.Prizes.helpers({
  calculateNewBankAllocation: function() {
      return 1000 + Meteor.user().bank_diamonds * 100;
  },
  multiplyNum: function(a,b) {
      return a*b;
  }
});

/*****************************************************************************/
/* Prizes: Lifecycle Hooks */
/*****************************************************************************/
Template.Prizes.created = function () {
};

Template.Prizes.rendered = function () {
};

Template.Prizes.destroyed = function () {
};