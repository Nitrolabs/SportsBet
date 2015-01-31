/*****************************************************************************/
/* Chat: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Chat.events({
   'click #send-message':function(){
      
      var message = $(); // MAX: complete based on screen
      
      if (message) {
          var gid = Session.get(active_game_for_chat) || "0";
          Chats.insert({user_id: Meteor.userId(), message: message, submitted_at: new Date(), game_id: gid});
      }
   }


});

Template.Chat.helpers({
   messages:function(){
        return Chats.find({}, {sort: {submitted_at: -1}});
   },
   getUserName:function(){
       return Users.findOne(this.user_id).profile.name; 
   },
   getAvatar:function(){
       return Users.findOne(this.user_id).profile.image.normal;
   }
});




/*****************************************************************************/
/* Chat: Lifecycle Hooks */
/*****************************************************************************/
Template.Chat.created = function () {
};

Template.Chat.rendered = function () {
};

Template.Chat.destroyed = function () {
};