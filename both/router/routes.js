/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

// Mobile routes
Router.route('/', {name: 'mobile.landing', layoutTemplate:'MobileLayout'});
Router.route('/game/:_id', {name: 'mobile.game', layoutTemplate:'MobileLayout'});
Router.route('/login', {name: 'mobile.login'});
Router.route('/signup', {name: 'mobile.signup'});

// Desktop routes
Router.route('/admin', {name: 'main.admin'});