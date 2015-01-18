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

    // Add properties to our new users
    Accounts.onCreateUser(function(options, user) {
        if (options.profile)
            user.profile = options.profile;
        else
            user.profile = {};    
        user.profile.message_queue = [];
        user.profile.bet_amount = 10;
        user.bank_account = 100;
        return user;
    });
  }
);