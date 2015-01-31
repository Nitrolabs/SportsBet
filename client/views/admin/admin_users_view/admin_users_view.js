/*****************************************************************************/
/* AdminUsersView: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.AdminUsersView.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
   'click [name=activateUser]': function (e, tmpl) {

        var id = this._id;
//        console.log(e);
        var isActivated = e.currentTarget.checked;
        //var isActivated = tmpl.find('input').checked;

//        console.log("Click: id=" + id + " activated=" + isActivated);
        Meteor.call('activateUserByAdmin', id, isActivated, function (error, result) {
            if (error)
                alert(error);
        });
    },

    'click [name=addToUserBankAccount]': function (e, tmpl) {

        var id = this._id;

        Meteor.users.update(id, {$inc: {bank_account: 100}, $set: {bank_request_more_funds: null}});
    },

    'click #resortPosts': function(e,tmpl) {
//        console.log("Re-sort posts");
        Meteor.call('reSortPostsOrderByAdmin', function (error) {
            if (error)
                alert(error);
        });
    }
});

Template.AdminUsersView.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
   
   allUsers: function() {
        return Meteor.users.find();
    },

    getEmailAddress: function() {
        return (this && this.emails && this.emails.length > 0) ? this.emails[0].address : "?";
    },

    getUserGroupsForAdminScreen: function() {
        return (this && this.profile && this.profile.user_groups && this.profile.user_groups.length > 0) ? this.profile.user_groups[0].group_id : "?";
    },

    isActivated: function() {

        if (this.user_verified !== undefined && this.user_verified === true) {

            return "checked";
        }


        else
            return "";
    }
});

/*****************************************************************************/
/* AdminUsersView: Lifecycle Hooks */
/*****************************************************************************/
Template.AdminUsersView.created = function () {
};

Template.AdminUsersView.rendered = function () {
};

Template.AdminUsersView.destroyed = function () {
};