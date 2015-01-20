/*****************************************************************************/
/* GamesMgmt: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.GamesMgmt.events({
   
   'click [name=selectGame]': function (e, tmpl) {

        var new_game_id = this._id;
        Session.set('admin_active_game', new_game_id);
   },
   
   'click [name=newGameButton]': function (e, tmpl) {

        // console.log(this)
        e.preventDefault();
        
        Session.set('admin_active_game', undefined);
   },
   
   'click #createNewGame': function (e, tmpl) {

        e.preventDefault();
        
        x = Template.GamesMgmt.__helpers[" getGameDetailsFromControlsOnScreen"]();
        
        var new_id = Games.insert(x);
        Session.set('admin_active_game', new_id);
   },
   
   'click #saveGame' : function(e,tmpl) {
       e.preventDefault();
       var x = Template.GamesMgmt.__helpers[" getGameDetailsFromControlsOnScreen"]();
       var id = Session.get('admin_active_game');
       console.log(x);
       Games.update(id, {$set: x});
   }
});

Template.GamesMgmt.helpers({
    
    getGameDetailsFromControlsOnScreen: function() {
        var title = $('#game_title').val();
        
        var d = new Date($('#game_start_datetime').val())
        d.setTime( d.getTime() + d.getTimezoneOffset()*60000 );
        
        console.log("game date/time:")
        console.log(d);
        
        var x = {title: title, start_datetime: d, status: "ACTIVE"};
        
        return x;
    },
    allGames: function() {
        return Games.find({}, {sort: {start_datetime: -1}});
    },
    
    getActiveGame: function() {
        var g_id =  Session.get('admin_active_game');
        var now = new Date(); now.setSeconds(0); now.setMilliseconds(0);
        return Games.findOne(g_id) || {title: "", start_datetime: now};
    },
    showStartDateTime: function(d) {
        if (!d) return null;
        return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().substring(0,19);
    }
});

/*****************************************************************************/
/* GamesMgmt: Lifecycle Hooks */
/*****************************************************************************/
Template.GamesMgmt.created = function () {
};

Template.GamesMgmt.rendered = function () {
};

Template.GamesMgmt.destroyed = function () {
};