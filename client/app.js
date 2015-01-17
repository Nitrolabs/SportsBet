/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
    
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
            return "Today at " + dateFormat(d, "h:MM TT");
        else
            return "on " + dateFormat(d, "mm/dd/yyyy");
    }
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});