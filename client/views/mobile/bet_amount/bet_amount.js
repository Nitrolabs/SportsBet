/*****************************************************************************/
/* BetAmount: Event Handlers and Helpersss .js*/
/*****************************************************************************/
const STEEPNESS = 1.6;



Template.BetAmount.events({
  'click #bet-amount-range':function(a){
    $('#bet-amount-ui').remove();
    $('#bet-amount-button').removeAttr('disabled');
  },
  'change #bet-amount-range':function(a){
    $('#bet-amount-ui').remove();
    $('#bet-amount-button').removeAttr('disabled');
  },
  'input #bet-amount-range':function(event){
    var percent = event.target.value;
    var bank = Meteor.user().bank_account;
    var money = bank * Math.pow(STEEPNESS,percent/10) / Math.pow(STEEPNESS,10);
    money = step(money,10,2);
    money = step(money,20,5);
    money = step(money,60,10);
    money = step(money,150,20);
    money = step(money,200,50);
    money = Math.round(money)
    Session.set('bet_amount',money);
  }
});

Template.BetAmount.helpers({
    formatted_bet_amount:function(){
        var bet_amount = Session.get('bet_amount');
        return numeral(bet_amount).format('$0,0');
    }
});

/*****************************************************************************/
/* BetAmount: Lifecycle Hooks */
/*****************************************************************************/
Template.BetAmount.created = function () {
};

Template.BetAmount.rendered = function () {
  // Work out where the slider should be (roughly)
  var money = Session.get('bet_amount');
  var bank = Meteor.user().bank_account;
  var exponent = money/bank * Math.pow(STEEPNESS,10)
  var percent = 10*Math.log(exponent)/Math.log(STEEPNESS);
  $('input').get(0).value = percent;
};

Template.BetAmount.destroyed = function () {
};


// Return the positive component of n
function subplus(n){
  return 0.5*(n+Math.abs(n));
}


// Step (round) numbers bigger than min
function step(n,min,step){
  return n - subplus(n-min)%step;
}

