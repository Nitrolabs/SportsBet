/*****************************************************************************/
/* Set the ROOT_URL to koding for facebook-login  */
/*****************************************************************************/
if (Meteor.settings.public.root_url){
	Meteor.absoluteUrl.defaultOptions.rootUrl = Meteor.settings.public.root_url
}


/*****************************************************************************/
/* App: The Global Application Namespace */
/*****************************************************************************/
App = {};