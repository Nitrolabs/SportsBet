/*****************************************************************************/
/* Signup: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MobileSignup.events({
  'click #signup-button':function(){
    $('#error').hide();
    var username = $("[name='username']").val();
    var email = $("[name='email']").val();
    var password = $("[name='password']").val();
    var password2 = $("[name='password2']").val();
    if (password!==password2){
      // handle non-matching passwords
      $("[name='password']").addClass('error');
      $("[name='password2']").text('');
      onError({message:'Passwords did not match'})
    } else {
      // We need to sign out the current user before another account is created
      Meteor.logout();
      Accounts.createUser({
        username:username,
        email:email,
        password:password,
      }, onCreated);
    }

    function onCreated(error){
      if (error){
        onError(error)
      } else {
        Meteor.loginWithPassword(email, password, onLogin);
      }
    }

    function onLogin(error){
      if (error){
        onError(error)
      } else {
        Router.go('mobile.landing');
      }
    }

    function onError(error){
      console.log(error)
      $('#error').show().css({visibility:'visible'});
      $('#error .message').text(error.reason);
    }
  }
});

// We should sign the current user out if they 
Template.MobileLanding.created = function () {
};