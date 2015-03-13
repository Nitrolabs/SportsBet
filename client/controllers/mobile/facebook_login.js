MobileFacebookLoginController = RouteController.extend({
  waitOn: function () {
      Meteor.subscribe('publish_featured_game');
  },

  onBeforeAction: function (route) {
    Tracker.autorun(function(){
      if (Meteor.userId() || Meteor.loggingIn())  {
        var next = Session.get('next_page')||'mobile.landing';
        Router.go(next);
      }
    });
    this.next();
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});

MobileFacebookLoginSportsController = MobileFacebookLoginController;
MobileFacebookLoginGambleController = MobileFacebookLoginController;
MobileFacebookLoginCompetitionController = MobileFacebookLoginController;