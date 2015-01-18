Meteor.startup(function ()
  {
    Accounts.loginServiceConfiguration.remove({
        service: "facebook"
    });

    Accounts.loginServiceConfiguration.insert({
        service: "facebook",
        appId: Meteor.settings.private.facebookAppId,
        secret: Meteor.settings.private.facebookSecret
    });
  }
);

// Add properties to our new users
Accounts.onCreateUser(function(options, user) {

    user.profile = options.profile || {};

    user.bet_amount = 10;  
    user.bank_account = 100;
    user.messages_queue = [];

    return user;

});

