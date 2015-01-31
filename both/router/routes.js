/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

// Mobile routes
Router.route('/login/facebook', {name: 'mobile.facebook.login'});
Router.route('/login', {name: 'mobile.login'});
Router.route('/signup', {name: 'mobile.signup'});
Router.route('/logout', {name: 'mobile.logout'});

// Mobile Game views
Router.route('/', {name: 'mobile.landing', layoutTemplate:'MobileLayout'});
Router.route('/game/:_id', {name: 'mobile.game', layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/history/', {name: 'history',layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/activebets/', {name: 'activebets',layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/leaderboard/', {name: 'leaderboard',layoutTemplate:'MobileLayout'});
Router.route('/game/:_id/chat/', {name: 'chat',layoutTemplate:'MobileLayout'});

// Desktop routes
Router.route('/admin', {name: 'main.admin'});
Router.route('/admin/games_mgmt', {name: 'games.mgmt'});
Router.route('/admin/users_view', {name: 'admin.users.view'});
