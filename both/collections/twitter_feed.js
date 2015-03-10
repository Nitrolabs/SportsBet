TwitterFeed = new Mongo.Collection("twitter_feed");




// var schema = new SimpleSchema({
//     users_in_bet: {
//         type: [Object],
//         optional: true
//     },
//     "users_in_bet.$.selection": {
//         type: Number,
//         optional:true,
//         label:"Bet Selection"
//     },
//     "users_in_bet.$.userid": {
//         type: String,
//         optional:true,
//         label:"User ID"
//     },
//     game_id: {
//         type: String,
//         label: "Game ID",
//         max: 50
//     },
//     title: {
//         type: String,
//         label: "Title",
//         max: 200
//     },
//     question: {
//         type: String,
//         label: "Question",
//         max: 300
//     },
//     status: {
//         type: String,
//         label: "Author",
//         // One of HIDDEN,ACTIVE,CLOSED,RESOLVED
//     },
//     submitted_at: {
//         type: Date,
//         label: "Submitted at",
//         optional: true
//     },
//     activated_at: {
//         type: Date,
//         label: "Activated at",
//         optional: true
//     },
//     closed_at: {
//         type: Date,
//         label: "Closed at",
//         optional: true
//     },
//     resolved_at: {
//         type: Date,
//         label: "Resolved at",
//         optional: true
//     },
//     status_update:{
//         type:String,
//         optional:true,
//         max:400,
//         label:"The result message display to user"
//     },
//     actual_result:{
//         type:Number,
//         optional:true,
//         label:"The index of the winning outcome",
//         min:0,
//         max:4
//     },
//     outcomes:{
//         type:[Object],
//         label:"An array of possble outcomes",
//         optional:true
//     },
//     "outcomes.$.text": {
//         type: String,
//         optional:true
//     },
//     "outcomes.$.odds": {
//         type: Number,
//         decimal: true,
//         optional:true,
//     },
//     statistics: {
//         type: Object,
//         optional: true,
//         blackbox: true
//     }

// });

// TwitterFeed.attachSchema(schema);