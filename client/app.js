/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
  track: function (key, meta, newUser) {
    meta = meta || {};

    Deps.autorun(function (c) {
      if (!Meteor.loggingIn()) {
        var user = Deps.nonreactive(function () { return Meteor.user(); });
        var email = "?";
        var full_name;
        var userId;
        var bank_account;
        var user_stats = {};
        var rand_num = Session.get("session_rand_num");
        if (!rand_num) {
            rand_num = Math.random().toString().substr(2);
            Session.set("session_rand_num", rand_num);
        }

          if (user) {
            
            if (user.emails && user.emails[0]) email = user.emails[0].address;
            if (user.services && user.services.facebook && user.services.facebook.email) email = user.services.facebook.email;
            
            full_name = user.profile ? user.profile.name : "?";
            userId = user._id;
            bank_account = user.bank_account;
            user_stats = user.user_stats;
        }
        else {
            email = 'anonymous';
            full_name = 'anonymous';
        }

        
        _.extend(meta, {
          email: email,
          full_name: full_name,
          path: location.pathname,
          bank_account: bank_account,
          user_stats: user_stats,
          rand_num: rand_num,
        });


          // Check that a mixpanel object actually exists
        if (mixpanel && mixpanel !== undefined && mixpanel.track !== undefined) {

            if (userId) {
                if (newUser) {
                    mixpanel.alias(userId);

                }
                else {
                    mixpanel.identify(userId);

                }

                mixpanel.people.set({
                    "$email": email,
                    "$name": full_name
                });
            }

            mixpanel.track(key, meta);
            // console.log("mixpanel track -- key=" + key);
            // console.log(meta);
        }
        else {
            console.log("mixpanel track -- key=" + key);
            console.log(meta);
        }

        c.stop();
      }
    });
  }
});

App.helpers = {
    
    getServerNow: function () {
        var serverTimeDiff = Session.get("server_now_diff");
        if (serverTimeDiff) {
            return new Date(Date.now() + serverTimeDiff);
        }
        else {
            var isSync;
            var serverTime;
            Tracker.nonreactive(function() {
                isSync = TimeSync.isSynced();
                serverTime = TimeSync.serverTime();
            });
            
            if (isSync) {
                console.log(serverTime);
                serverTimeDiff = serverTime - Date.now();
                Session.set("server_now_diff", serverTimeDiff);
                return new Date(serverTime);
            }
            console.err("Time Diff isn't synced...")
            return new Date(Date.now());
        }
        
    },
    getMyStats: function() {
        return UserStats.findOne({game_id:Session.get('user_current_game_id'), user_id: Meteor.userId()}) || {};
    },
    addTwoNumbers: function(a,b) {return Math.floor(a+b);},
    
    numberFormatBy: function(num, format_str) {
        return numeral(num).format(format_str);
    },
    notEmptyString: function(str) {
        return str && str !== "" && str.trim() !== "";
    },
    addIndexesToArray: function(arr) {
    
       return _.map(arr, function(x, index) {return _.extend(x, {index_for_ref: index})})   
    },
    
    isEq: function (v1, v2) {
        return (v1===v2);
    },

    getSessionValue: function(name) {
        return Session.get(name);
    },
    
    prettifyDate: function(timestamp) {
        if (!timestamp || timestamp == undefined)
            return "";

        var d = (new Date(timestamp));
        var day = (new Date(timestamp)).setHours(0,0,0,0);
        var today = new Date(Date.now()).setHours(0,0,0,0);

        if (day ===  today)
            return "Today at " + moment(d).format('h:mm:ss a');
        else
            return moment(d).format('ddd MM/DD, h:mm a');
    },
    
    isUsingFacebook: function() {var u = Meteor.user(); return u && u.services && u.services.facebook;},
    isFacebookLinkError: function() {return Session.get('ErrorLinkWithFacebook');},
    getGameName: function() {var g = Games.findOne(Session.get('user_current_game_id')); return (g && g.short_title) || "";},
    getCurrentGame: function() {var g = Games.findOne(Session.get('user_current_game_id')); return (g) || {};},
    
    setSessionVarWithExpire: function(name, value, expire, next_value) {
        Session.set(name,value);
        setTimeout(function(){ Session.set(name,next_value); }, expire);
    },
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});

initMixpanel = function() {
    var settings = Meteor.settings;
    var mixpanelToken = settings && settings.public.mixpanel;

    if (!mixpanelToken)
      throw new Error('No mixpanel token found in settings.json');
    else
      mixpanel.init(mixpanelToken);
};
initMixpanel();

Deps.autorun(function () {
    
    var game_id = Session.get("user_current_game_id");
    var game = Games.findOne(game_id);
  	var bets = Bets.find({game_id: game_id});
  	var myPrevBets = UserBets.find(
  	    {user_id: Meteor.userId()}, 
  	    {fields: {bet_id: 1}}
  	    ).fetch();
  	myPrevBets = _.map(myPrevBets, function(x) {return x.bet_id});
  	var first_bet = Bets.findOne({_id: {$nin: myPrevBets}, status: "ACTIVE", game_id: game_id});

    Session.set("first_available_bet", first_bet ? first_bet._id : null);
  	
  	if (first_bet && first_bet._id !== Session.get("last_dismissed_bet_id")) {
  	    Session.set("show_active_bet_popup", true);
  	}
  	else {
  	    Session.set("show_active_bet_popup", false)
  	}

});

