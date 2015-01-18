/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
    
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