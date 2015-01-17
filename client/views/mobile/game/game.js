/*****************************************************************************/
/* Game: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileGame.events({
 'click .bet-option-button':function(event){
 	// ASSAF: Impliment the logic here
 	// We need to create a new user-bet, with correct bet_id and user_id
 	alert('choose option')
 	console.log(event);
 	console.log(this);
 },
 'click .bet-skip-button':function(event){
 	// ASSAF: Impliment the logic here
 	// We need to create a new user-bet, and set the skipped flag to true
 	alert('choose skipped');
 	console.log(event);
 	console.log(this);
 }
});

Template.MobileGame.helpers({
});

/*****************************************************************************/
/* Game: Lifecycle Hooks */
/*****************************************************************************/
Template.MobileGame.created = function () {
};

Template.MobileGame.rendered = function () {
};

Template.MobileGame.destroyed = function () {
};