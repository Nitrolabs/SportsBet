/*****************************************************************************/
/* Chat: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Chat.events({
    "submit #message_form": function(event) {
        var message = $("#send_message").val(); // MAX: complete based on screen
        if (message) {
            var gid = Session.get("active_game_for_chat") || "0";
            Chats.insert({
                user_id: Meteor.userId(),
                message: message,
                submitted_at: new Date(),
                game_id: gid
            });
            App.track("Chat msg sent", {msg:message});
        }
        $("#send_message").val("")
        return false
    }


});

Template.Chat.helpers({
    messages: function() {
        return Chats.find({}, {
            sort: {
                submitted_at: -1
            }
        });
    }, 
    getUserName: function() {
        return Meteor.users.findOne(this.user_id).profile.name;
    },
    getAvatar: function() {
        return Meteor.users.findOne(this.user_id).profile.image.normal;
    }
});




/*****************************************************************************/
/* Chat: Lifecycle Hooks */
/*****************************************************************************/
Template.Chat.created = function() {};

Template.Chat.rendered = function() {};

Template.Chat.destroyed = function() {};