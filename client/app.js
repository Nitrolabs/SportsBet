/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
  track: function (key, meta, newUser) {
    meta = meta || {};

    Deps.autorun(function (c) {
      if (!Meteor.loggingIn()) {
        var user = Deps.nonreactive(function () { return Meteor.user(); });
        var email;
        var full_name;
        var userId;
        var bank_account;
        var user_stats = {};

          if (user) {
            email = user.emails ? user.emails[0].address : "FB";
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
          user_stats: user_stats
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
    }
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


// HACK: Disable the left side menu and add PC support
// TODO: Decide whether we like the side menu
// TODO: Rewrite this code, and move it somewhere else
Template.mobileLayout.rendered = function(){
    IonSideMenu.snapper.settings({
        disable:'left',
        dragger: document.getElementById('side-menu-button'),
        hyperextensible: false
    });
    $(document).on('click', '#side-menu-button:not(.active)',function(){
        IonSideMenu.snapper.expand();
        $('#side-menu-button').addClass('active');
        $('.snap-drawer-right').width('256px');
    });

    $(document).on('click', '#side-menu-button.active',function(){
        IonSideMenu.snapper.close();
        $('#side-menu-button').removeClass('active');
    });
}






