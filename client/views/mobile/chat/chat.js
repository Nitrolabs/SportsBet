/*****************************************************************************/
/* Chat: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Chat.events({
   'click #send-message':function(){
      // ASSAF: Insert message into db

   }


});

Template.Chat.helpers({
   messages:function(){
    // ASSAF: RETURN ALL MESSAGE History
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