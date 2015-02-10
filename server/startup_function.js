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
  
//   if (!Meteor.users.findOne("superuser"))
);

// Add properties to our new users
Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {name:user.username};
    user.bet_amount = 50;  
    user.bank_account = 1000;
    user.messages_queue = [];
    user.user_stats = {money_on_the_table: 0, total_number_of_bets_placed: 0, total_number_of_bets_resolved: 0, 
                       total_wins_in_a_row:0, total_number_of_bets_won:0, bets_won_percentage: 0, potential_winnings: 0};
    // Set up the profile picture
    var url = "/images/profile.png";
    if (user.services && user.services.facebook){
        id = user.services.facebook.id;
        url = "http://graph.facebook.com/"+id+"/picture";
    }
    
    
    user.profile.image = {};
    user.profile.image.small = url+"?type=small";
    user.profile.image.normal = url+"?type=normal";
    user.profile.image.large = url+"?type=large";
    
    console.log("Users Count: " + Meteor.users.find().count());
    user.is_admin = (Meteor.users.find().count() == 0);
    
    return user;
});