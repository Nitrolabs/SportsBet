/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.onBeforeAction(function() {

    var prev_page_name = Session.get('prevPageName') || "";
    var new_page_name = this.route.getName();
    
    if (prev_page_name == "mobile.game") {
        Session.set("last_dismissed_bet_id", Session.get("user_current_bet_id"));
    }
    
    if (_.include(['activebets', 'history', 'leaderboard', 'chat'], new_page_name)) {
        Session.set('pageToShowNewBetPopup', true);
    }
    else //if (_.include(['mobile.game'], new_page_name)) 
    {
        Session.set('pageToShowNewBetPopup', false);
    }
    
    Session.set('prevPageName', new_page_name)
    
    if (new_page_name !== prev_page_name)
        App.track("Page View",{new_page_name: new_page_name});
    
    this.next();
});

// Mobile routes
Router.route('/login/facebook', {name: 'mobile.facebook.login'});
Router.route('/login', {name: 'mobile.login'});
Router.route('/signup', {name: 'mobile.signup'});
Router.route('/logout', {name: 'mobile.logout'});

// Mobile Game views
Router.route('/', {name: 'mobile.landing', layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/', {name: 'mobile.game', layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/history/', {name: 'history',layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/activebets/', {name: 'activebets',layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/leaderboard/', {name: 'leaderboard',layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/chat/', {name: 'chat',layoutTemplate:'MobileLayout'});

// Desktop routes
Router.route('/admin', {name: 'main.admin'});
Router.route('/admin/games_mgmt', {name: 'games.mgmt'});
Router.route('/admin/users_view', {name: 'admin.users.view'});
