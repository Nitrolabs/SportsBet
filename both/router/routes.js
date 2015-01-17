/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

/*
 *  Example:
 *  Router.route('/', {name: 'home'});
*/
Router.route('/', {name: 'mobile.landing', layoutTemplate:'MobileLayout'});
Router.route('/game/:_id', {name: 'mobile.game', layoutTemplate:'MobileLayout'});
Router.route('/admin', {name: 'main.admin'});