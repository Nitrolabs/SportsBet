/*****************************************************************************/
/* NewUser: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileNewUser.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.MobileNewUser.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* NewUser: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileNewUser.created = function () {
    
    if(Meteor.loggingIn() || Meteor.userId()) {
        Router.go('mobile.landing');
    }
    else {
        
        Meteor.call('getNextGuestUserId', "next_guest_id", 4, function (error, t) {
            if (error)
                console.error(error);
            else {
                alert(t);
                console.log(t);
                // Create new user
                Accounts.createUser({
                    username: "Guest_" + t,
                    email: t + "@guest.com",
                    password: "temp" + t,
                }, onCreated);
            
                function onCreated(error){
                  if (error){
                    onError(error)
                  } else {
                    App.track("Guest User Created", {}, true);
                    App.track("Guest User Login after Signup");
                    console.log("here")  ;
                    // Find active game
                    var soon = new Date();
                    soon.setHours(soon.getHours()+24);
                    var not_over = new Date();
                    not_over.setHours(not_over.getHours()-5);
                    
                    var g = Games.findOne({status: "ACTIVE", start_datetime: {$gte:not_over, $lte:soon}}, {sort: {start_datetime: 1}});
                    if (g) {
                        console.log("I found a game!")  ;
                        Session.set("user_current_game_id", g._id);
                        Router.go('mobile.game', {_id: g._id});
                    }
                    else {
                        console.log("I didn't find a game")  ;
                        Router.go('mobile.landing');
                    }
                  }     
                }
            
                function onError(error){
                  console.error(error)
                  App.track("Error Guest User Signup", {error:error});
                //   $('#error').show().css({visibility:'visible'});
                //   $('#error .message').text(error.reason);
                }
        }
    });
    }
};

Template.MobileNewUser.rendered = function () {
};

Template.MobileNewUser.destroyed = function () {
};