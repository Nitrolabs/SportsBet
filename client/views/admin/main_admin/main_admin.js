/*****************************************************************************/
/* MainAdmin: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MainAdmin.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
   
   'click [name=filterByStatus]': function(e,tmpl) {
       Session.set("bets_filter_type", e.currentTarget.getAttribute('data-filter-string'))
   },
   
   'click [name=selectActiveBet]': function (e, tmpl) {

        var new_active_bet_id = this._id;
        
        Session.set('admin_active_bet', new_active_bet_id);
   },
   
   'click [name=newBetButton]' : function(e,tmpl) {
       
        Session.set('admin_active_bet', null);
        // $('#bet_form')[0].reset();
        
        var idx = e.currentTarget.getAttribute('data-sel-idx');

        var currTime = moment().format('h:mm:ss');
        
        
        var preset_data = [
/*BLANK       */ {option1_text: "", option2_text: "",option3_text: "",option4_text: "",title:"",question:""},
// /*NEXT PLAY   */ {option1_text: "Touchdown", option2_text: "Intercept", option3_text: "Field Goal",option4_text: "Neither",title:"Next Play",question:"What's going to be the next play?", odds1:5,odds2:2,odds3:4,odds4:2},
// /*QTR RES     */ {option1_text: "Home Team", option2_text: "Away Team", option3_text: "",option4_text: "",title:"Next Q Res",question:"Who is going to win this quarter?", odds1:5,odds2:2},
// /*FINAL SCORE */ {option1_text: "Over 100", option2_text: "Under 100", option3_text: "Field Goal",option4_text: "Neither",title:"Final Score",question:"What's going to be the final score?", odds1:5,odds2:2,odds3:4,odds4:2},
/* Next Drive # of Plays */ 
// {
// title:"Next Drive # of Plays",
// question:"How many offensive plays will be run on this drive?",
// option1_text: "<4",   odds1: 1.8,
// option2_text: "4-6",  odds2: 2,
// option3_text: "7-9", odds3: 2.5,
// option4_text: "10+",    odds4: 6
// },

// /* Next Drive Result */ 
// {
// title:"Next Drive Result",
// question:"What will be the result of the upcoming drive?",
// option1_text: "Touchdown",   odds1: 3,
// option2_text: "Field Goal",  odds2: 2,
// option3_text: "Punt", odds3: 1.8,
// option4_text: "Turnover",    odds4: 5
// },



// /* Kickoff Position */ 
// {
// title:"Kickoff Position",
// question:"Where will the next drive begin?",
// option1_text: "Inside 20.5 yard line",   odds1: 1.5,
// option2_text: "Beyond 20.5 yard line",  odds2: 2.5,
// option3_text: "", 
// option4_text: ""
// },


// /* Score on Drive  */ 
// {
// title:"Score on Drive",
// question:"Will there be points scored on this drive?",
// option1_text: "Yes",   odds1: 4,
// option2_text: "No",  odds2: 1.5,
// option3_text: "", 
// option4_text: ""
// },


// /* Points Scored in Quarter */ 
// {
// title:"Points Scored in Quarter",
// question:"How many total points will be scored in this quarter?",
// option1_text: "0-6",   odds1: 3,
// option2_text: "7-13",  odds2: 2.5,
// option3_text: "14-20", odds3: 3.5,
// option4_text: "21+",    odds4: 4
// }

// {title:"Next FT",question:"What will happen during these free throws?", option1_text: "Make both", option2_text: "Miss both", option3_text: "Just 1st",option4_text: "Just 2nd",odds1:3,odds2:8,odds3:5,odds4:5},
// {title:"Buzzer beater",question:"Will there be a buzzer beater this quarter? (FG w/ <1.0 sec)", option1_text: "Yes", option2_text: "No", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
// {title:"Lebron dunk",question:"Will Lebrow throw down a dunk this quarter?", option1_text: "Yes", option2_text: "No", option3_text: "",option4_text: "",odds1:4,odds2:2,odds3:1,odds4:1},
// {title:"Bosh QTR",question:"How many points will Bosh score this quarter?", option1_text: "0-3", option2_text: "4-7", option3_text: "8-11",option4_text: "12+",odds1:4,odds2:2,odds3:3,odds4:8},
// {title:"Beer choice",question:"What will be the next beer commercial?", option1_text: "Domestic", option2_text: "Import", option3_text: "",option4_text: "",odds1:2,odds2:6,odds3:1,odds4:1},
// {title:"Beer specific",question:"What will be the next beer commercial?", option1_text: "Budweiser", option2_text: "Coors", option3_text: "Miller",option4_text: "Other",odds1:3,odds2:3,odds3:7,odds4:4},
// {title:"Love 3 QTR",question:"Will Kevin Love score a three this quarter?", option1_text: "Yes", option2_text: "No", option3_text: "",option4_text: "",odds1:3,odds2:3,odds3:1,odds4:1},
// {title:"Replay",question:"Replay: Whose ball is it?", option1_text: "Cavs", option2_text: "Heat", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
// {title:"After 2min mark",question:"What will be the next point after the 2:00 mark?", option1_text: "1-pointer", option2_text: "2-pointer", option3_text: "3-pointer",option4_text: "No points",odds1:3,odds2:3,odds3:1,odds4:1},

// {title:"Nastic score half",question:"How many points will Nastic score this half?", option1_text: "0-3 pts", option2_text: "4-6 pts", option3_text: "7-9 pts",option4_text: "10+ pts",odds1:5,odds2:3,odds3:4,odds4:6},
// {title:"3-pt brown half",question:"How many three pointers will Anthony Brown make this half?", option1_text: "0", option2_text: "1", option3_text: "2",option4_text: "3+ ",odds1:4,odds2:3,odds3:4,odds4:5},
// {title:"Technical foul half",question:"Will there be a technical foul this half?", option1_text: "Yes", option2_text: "No", option3_text: "",option4_text: "",odds1:10,odds2:2,odds3:1,odds4:1},
// {title:"Randle % half",question:"What will Chasson Randle's shooting percentage be this half?", option1_text: "<25%", option2_text: "25-37%", option3_text: "38%-50%",option4_text: "50%+",odds1:5,odds2:3,odds3:3,odds4:4},
// {title:"airball half",question:"Will there be an air ball in this half?", option1_text: "Yes", option2_text: "No", option3_text: "",option4_text: "",odds1:4,odds2:1.5,odds3:1,odds4:1},
// {title:"Brown total stats half",question:"Anthony Brown (Pts+Rebs+Assists) in half", option1_text: "Over 12.8", option2_text: "Under 12.8", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
// {title:"Nastic total stats half",question:"Stefan Nastic (Pts + Rebs + Assists) in half", option1_text: "Over 10.7", option2_text: "Under 10.7", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
// {title:"Play after 14 min",question:"What will be the result of the first play after the 14 minute mark?", option1_text: "Made shot", option2_text: "Free throws", option3_text: "Missed Shot",option4_text: "Turnover",odds1:3,odds2:5,odds3:2,odds4:2},
// {title:"Scores first after TO",question:"Who scores first out of the timeout?", option1_text: "Stanford", option2_text: "Oregon", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
// {title:"FREE THROWS",question:"What will happen during these free throws", option1_text: "Make both", option2_text: "Miss both", option3_text: "1st only",option4_text: "2nd only",odds1:2,odds2:8,odds3:5,odds4:5},
// {title:"Stanford next shot",question:"What will be the result of Stanford's next shot?", option1_text: "2-pointer", option2_text: "3-pointer", option3_text: "Free throws",option4_text: "Missed shot",odds1:3,odds2:5,odds3:6,odds4:2},
// {title:"Oregon next shot",question:"What will be the result of Oregon's next shot?", option1_text: "2-pointer", option2_text: "3-pointer", option3_text: "Free throws",option4_text: "Missed shot",odds1:3,odds2:5,odds3:6,odds4:2},
// {title:"Event first",question:"What will happen first?", option1_text: "Turnover", option2_text: "Foul", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},

{title:"After Timeout",question:"What will be the result of the first play out of the timeout?", option1_text: "Made shot", option2_text: "Missed shot", option3_text: "Free-throws",option4_text: "Turnover",odds1:3,odds2:3,odds3:6,odds4:8},
{title:"Next 3-pointer",question:"What team will make the next 3 pointer?", option1_text: "Oregon", option2_text: "Utah", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
{title:"Next score",question:"What team will score next?", option1_text: "Oregon", option2_text: "Utah", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
{title:"Free throws",question:"What will be the result of these free throws?", option1_text: "Make both", option2_text: "Miss both", option3_text: "Make 1st only",option4_text: "Make 2nd only",odds1:2,odds2:5,odds3:4,odds4:4},
{title:"Oregon next points",question:"Who will score the next point for Oregon?", option1_text: "Young", option2_text: "Cook", option3_text: "Brooks",option4_text: "Other",odds1:3,odds2:4,odds3:5,odds4:3},
{title:"Utah next point",question:"Who will score the next point for Utah?", option1_text: "Wright", option2_text: "Loveridge", option3_text: "Taylor",option4_text: "Other",odds1:3,odds2:4,odds3:5,odds4:3},
{title:"After X min mark",question:"What will be the next point after the X min mark?", option1_text: "1-pointer", option2_text: "2-pointer", option3_text: "3-pointer",option4_text: "No points",odds1:5,odds2:2,odds3:3,odds4:8},
{title:"Next dunk",question:"What team will make the next dunk?", option1_text: "Oregon", option2_text: "Utah", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},
{title:"Last second shot",question:"Will there be a last second shot (FG w/ <5.0 sec left)?", option1_text: "Yes", option2_text: "No", option3_text: "",option4_text: "",odds1:5,odds2:1.5,odds3:1,odds4:1},
{title:"Foul out of TO",question:"Will there be a foul in the first possession out of the timeout?", option1_text: "Yes", option2_text: "No", option3_text: "",option4_text: "",odds1:4,odds2:1.5,odds3:1,odds4:1},
{title:"Next foul",question:"What team will commit the next foul?", option1_text: "Oregon", option2_text: "Utah", option3_text: "",option4_text: "",odds1:2,odds2:2,odds3:1,odds4:1},

          
        ];
        $('#bet_title').val(preset_data[idx].title + " " + currTime);
        $('#active_bet_question').val(preset_data[idx].question);
        $('#option1_text').val(preset_data[idx].option1_text);
        $('#option2_text').val(preset_data[idx].option2_text);
        $('#option3_text').val(preset_data[idx].option3_text);
        $('#option4_text').val(preset_data[idx].option4_text);
        $('#option1_odds').val(preset_data[idx].odds1 || ""); 
        $('#option2_odds').val(preset_data[idx].odds2 || ""); 
        $('#option3_odds').val(preset_data[idx].odds3 || ""); 
        $('#option4_odds').val(preset_data[idx].odds4 || "");
        $('#status_update').val(""),
        $('#actual_result').val("")
   },
   
   'click #createNewBet' : function(e,tmpl) {
        e.preventDefault();
        
        console.log('click create new bet');
        
        var new_bet = extractBetDataFromAdminForm();
        new_bet.status = "HIDDEN";
        new_bet.submitted_at = new Date();
        
        console.log(new_bet);
        
        var new_bet_id = Bets.insert(new_bet);
        console.log(new_bet_id);
        
        Session.set('admin_active_bet', new_bet_id);
        
        App.track("Admin - create new bet", new_bet);
    
   },
   
   'click #saveBet, click #activateBet, click #closeBet': function(e,tmpl) {
       
        e.preventDefault();
        
        var new_bet = extractBetDataFromAdminForm();
        
        if (e.target.id == "saveBet") {
            // Nothing special to do
            App.track("Admin - save bet", new_bet);
        }
        else if (e.target.id == "activateBet") {
            
            new_bet.activated_at = new Date();
            new_bet.status = "ACTIVE";
            
            var y = $("input[name='auto_close_options']:checked").attr('data-auto-close-time');
            
            if (1*y == -1) {
                y = $('#custom_close_time').val() || 0;
            }
                
            if (1*y!==0) {
                
                new_bet.auto_close_at = new Date(App.helpers.getServerNow().getTime() + 1000*y);
            }
            App.track("Admin - activate bet", new_bet);
        }
        else if (e.target.id == "closeBet") {
            new_bet.closed_at = new Date();
            new_bet.status = "CLOSED";
            App.track("Admin - close bet", new_bet);
        }
        
        Bets.update(
            Session.get('admin_active_bet'), 
            {$set: new_bet}
            );
        
        
        
   },
   
   'click #resolveBet': function(e,tmpl) {

        e.preventDefault();
        
        var new_bet = extractBetDataFromAdminForm();
        var bet_id = Session.get('admin_active_bet');
        
        if (new_bet.actual_result === "" || (!(new_bet.actual_result >= 0 && new_bet.actual_result <= 4))) {
            alert("Actual Result must be 0,1,2,3,4")
            return;
        }
        
        Meteor.call('/admin/bet/resolve', bet_id, new_bet, function (error, result) {
            if (error) {
                alert(error);
                console.error(error);
            }
            else {
                App.track("Admin - resolve bet", new_bet);
            }
        });
   }
   
   
});

var extractBetDataFromAdminForm = function() {
    
    var curr_bet_data = Bets.findOne(Session.get('admin_active_bet'));
    
       var betDataFromForm = 
       {
            game_id: Session.get('admin_active_game'),
    
            title: $('#bet_title').val(),
            question: $('#active_bet_question').val(),
        
            status: curr_bet_data && curr_bet_data.status, 
            
            submitted_at: curr_bet_data && curr_bet_data.submitted_at,
        
            activated_at: curr_bet_data && curr_bet_data.activated_at,
        
            closed_at: curr_bet_data && curr_bet_data.closed_at,
                
            resolved_at: curr_bet_data && curr_bet_data.resolved_at,
                
            status_update: $('#status_update').val(),
                
            actual_result: $('#actual_result').val(),
                
            outcomes: 
            [
                {text: $('#option1_text').val() || " ", odds: $('#option1_odds').val() || 1},
                {text: $('#option2_text').val() || " ", odds: $('#option2_odds').val() || 1},
                {text: $('#option3_text').val() || " ", odds: $('#option3_odds').val() || 1},
                {text: $('#option4_text').val() || " ", odds: $('#option4_odds').val() || 1}
            ]
        };
        
        return betDataFromForm;
   }
Template.MainAdmin.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
   
   getActiveGameName: function() {
       
       var g = Games.findOne(Session.get('admin_active_game'));
       return g && g.title;
   },
   
   betsForThisGame: function() {
       var bets_filter = {game_id: Session.get('admin_active_game')};
       
       if (Session.get("bets_filter_type") && Session.get("bets_filter_type") !== "") {
           bets_filter.status = Session.get("bets_filter_type");
       }
     return Bets.find(bets_filter, {sort: {submitted_at: -1}}); 
   },
   
   getActiveBet: function() {
     
     var active_bet = Session.get('admin_active_bet');
     
     return active_bet ? Bets.findOne(Session.get('admin_active_bet')) : {};
   },
   
   getOutcomeData: function(index, category) {

       return this.outcomes && this.outcomes[index] && this.outcomes[index][category];
   },
   
   isNewBet: function() {
       return Session.get('admin_active_bet') == undefined || Session.get('admin_active_bet') == "";
   },
   
   getStatusLabelType: function(st) {
       if (st == "HIDDEN") return "default";
       if (st == "ACTIVE") return "success";
       if (st == "CLOSED") return "warning";
       if (st == "RESOLVED") return "info";
       return "default";
       
    }
   
});

/*****************************************************************************/
/* MainAdmin: Lifecycle Hooks */
/*****************************************************************************/
Template.MainAdmin.created = function () {
    
    setTimeout(function() {
           
           // Set some game as default if game does not exist
            var g = Games.findOne();
            if (g && !Session.get('admin_active_game')) {
                Session.set('admin_active_game', g && g._id);
            }
    
       },1000);
};

Template.MainAdmin.rendered = function () {
    
};

Template.MainAdmin.destroyed = function () {
};

