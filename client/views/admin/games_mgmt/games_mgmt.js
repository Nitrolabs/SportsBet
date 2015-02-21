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
   },
   
   'click #complete_game_btn': function(e,tmpl) {
       e.preventDefault();
       var id = Session.get('admin_active_game');
       var g = Games.findOne(id);
        
        if (g.status !== "ACTIVE") {
            var answer = prompt(g.title + "\nis already resolved.\n\nType REDO to give diamonds again (*duplicate warning!*)", "NO");
            if (answer !== "REDO") return;
        }
        
        var answer = prompt("Are you sure you want to finalize game\n" + g.title + "?\n\nIf so, type YES", "NO");
        if (answer !== "YES") return;
            
        var unresolvedBets = Bets.find({game_id:id, status: {$nin: ["RESOLVED"]}}).count();
        if (unresolvedBets > 0) {
            answer = prompt("Warning! Game\n" + g.title + "?\n still has unresolved bets!\n\nTo finish anyway, type FINISH", "NO");
            if (answer !== "FINISH") return;
        }
        
        var total_num_users = UserStats.find({game_id: id}).count();
        var topQuartile =     UserStats.find({game_id: id},{sort: {bank_account: -1}, limit: Math.floor((total_num_users + 3)/4)})
        
        topQuartile.forEach(function (s) {
            Meteor.users.update(s.user_id, {$inc: {bank_diamonds:1}})
            console.log(s.user_id);
        });
        
        Games.update(id, {$set: {status: "COMPLETED"}});
        
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