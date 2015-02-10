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
