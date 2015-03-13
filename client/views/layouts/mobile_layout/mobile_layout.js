Template.newBetsAlert.events({
    'click #close_new_bet_popup':function() {
        Session.set("last_dismissed_bet_id", Session.get("first_available_bet"));
        App.track("Auto redirect dismissed");
    },
    'click #popup_new_available_bet': function(e,t) {
        // console.log(this);
        // console.log(t);
        // console.log(e);
    }
});

Template.newBetsAlert.created = function () {
    // console.log("newBetsAlert created")
};

Template.newBetsAlert.rendered = function () {
    // console.log("newBetsAlert rendered")
};

Template.newBetsAlert.destroyed = function () {
    // console.log("newBetsAlert destroyed")
};

Deps.autorun(function () {
    
    if (Session.get("show_active_bet_popup") && Session.get("pageToShowNewBetPopup")) {
        // console.log("inside if")
        setTimeout(function() {
            // console.log("inside timeout")
            if (Session.get("show_active_bet_popup") && Session.get("pageToShowNewBetPopup")) {
                App.track("Auto redirect to bet");
                Router.go('mobile.game', {_id: Session.get("user_current_game_id")});
            }
        },3500)
    }
    
});

Deps.autorun(function () {
    if (Meteor.user() && !Meteor.loggingIn()) {
           var last_bank_account = Session.get("last_bank_account_main_screen");
           var curr_bank_account = Meteor.user().bank_account;
           if (last_bank_account != curr_bank_account) {
                   
               if ((last_bank_account < curr_bank_account) && (last_bank_account !== undefined) && (last_bank_account !== null)){
                     App.helpers.setSessionVarWithExpire("show_boom_splash", Math.floor(curr_bank_account - last_bank_account), 5000, null);
               }
               
               Session.set("last_bank_account_main_screen", Meteor.user().bank_account);
           }
       }
});

Template.boomSplash.helpers({
  isShowSplash: function() {
      return Session.get("show_boom_splash") ? "visible" : "";
  },
  
  isAnimateTada: function() {
      return Session.get("show_boom_splash") ? "tada" : "";
  },
  
  
});