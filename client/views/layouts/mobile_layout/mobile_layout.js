Template.newBetsAlert.events({
    'click #close_new_bet_popup':function() {
        Session.set("last_dismissed_bet_id", Session.get("first_available_bet"));
    },
    'click #popup_new_available_bet': function(e,t) {
        // console.log(this);
        // console.log(t);
        // console.log(e);
    }
});