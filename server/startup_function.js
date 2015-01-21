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
    user.profile = options.profile || {name:user.username};
    user.bet_amount = 10;  
    user.bank_account = 100;
    user.messages_queue = [];
    // Set up the profile picture
    var url = "/images/profile.png";
    if (user.services && user.services.facebook){
        id = user.service.facebook.id;
        url = "http://graph.facebook.com/"+fbid+"/picture";
    }
    user.profile.image = {};
    user.profile.image.small = url+"?type=small";
    user.profile.image.normal = url+"?type=normal";
    user.profile.image.large = url+"?type=large";
    return user;
});