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
    
    Meteor.setInterval(function() {
        var now = new Date();
        var x = Bets.update({status: "ACTIVE", auto_close_at: {$lt:now}}, {$set: {status: "CLOSED", closed_at: now}});
        // console.log(x)
        
    }, 2000);

    var twit = new Twitter({
      consumer_key: 'aO0JAZTGNqew5ezm4dlRQUwPq',
      consumer_secret: '3QaL4xix1qlrLEq38I70J6KFlNLDEcsXRXGPh2AK7IFgZIQIJE',
      access_token_key: '2190711745-FsSpHKIYr5MbmGvqc07x0tNvSuLH67P7T0BM8jG',
      access_token_secret: 'eIW2qI23NNqcaJhpFw7rfBQrvQCowU63CBUUIoDOYQk42'
    });

    var allTwitterHashtags = [];
    var allTwitterUserIds = [];
    // Get all game twitter ids
    Games.find().forEach(function (g) {
        
        if (g.tweeter_hashtags && g.tweeter_hashtags.length > 0)
            allTwitterHashtags = _.union(allTwitterHashtags, g.tweeter_hashtags);
        
        if (g.tweeter_user_handles && g.tweeter_user_handles.length > 0)
            allTwitterUserIds = _.union(allTwitterUserIds, g.tweeter_user_handles);
    });
    
    var hashtagsToTrack = allTwitterHashtags.join(",");
    var userIdsToFollow = allTwitterUserIds.join(",");
    
    console.log(hashtagsToTrack);
    console.log(userIdsToFollow);
    
    TwitterFeed.remove({'user.name': {$nin: ["zzzz"]}});
    // twit.stream('statuses/filter', {
    //     'track': hashtagsToTrack,
    //     'follow': userIdsToFollow,
    // }, function(stream) {
    //     stream.on('data', function(data) {
    //         if (TwitterFeed.find().count() < 100) {
    //         var assaf_data = {
    //             type: "track #NBA",
    //             created_at: data.created_at, 
    //             twitter_id: data.id,
    //             text: data.text,
    //             user: {id: data.user.id, name: data.user.name, image_url: data.user.profile_image_url},
    //         }
            
    //         TwitterFeed.insert(assaf_data);
    //         console.log('tweet :)');
    //         }
    //         // console.log(assaf_data)
    //         // TweetStream.emit('tweet', data);
    //     });
    // });
    
    
  }
  
//   if (!Meteor.users.findOne("superuser"))
);

Accounts.validateNewUser(function(user) {
    
    console.log("validateNewUser");
    // console.log(this);
    // var clientIP = this.connection.clientAddress;
    // console.log(clientIP);
    if (this.userId) {console.log(this.userId)}
    // var x = Meteor.users.findOne({last_ip: clientIP});
    // // if (x) 
    // {
    //     console.log(x ? "yes" : "no")
    // }
    
    return true;
    
    
});

// Add properties to our new users
Accounts.onCreateUser(function(options, user) {
    // console.log(this);
    // var clientIP = this.connection.clientAddress;
    console.log(this.userId)
    console.log('+onCreateUser+')
    // console.log(clientIP)
    console.log(options);
    console.log('---')
    console.log(user);
    console.log('***');
    if (options && options.profile && options.profile.guest) {
        user.guest = options.profile.guest;
        user.profile = {name:user.username};
    }
    else {
        user.profile = options.profile || {name:user.username};
    }
    
    user.bet_amount = 50;  
    user.bank_account = 1000;
    user.bank_diamonds = 0;
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
    user.is_admin = true; //(Meteor.users.find().count() == 0); // TODO: set only some users as admins!
    
    return user;
});