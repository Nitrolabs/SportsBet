/*****************************************************************************/
/* Logout: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileLogout.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.MobileLogout.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Logout: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileLogout.created = function () {
  Meteor.logout();
};

Template.MobileLogout.rendered = function () {
};

Template.MobileLogout.destroyed = function () {
};