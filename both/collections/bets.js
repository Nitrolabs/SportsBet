Bets = new Mongo.Collection("bets");



var schema = new SimpleSchema({
    game_id: {
        type: String,
        label: "Game ID",
        max: 50
    },
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    question: {
        type: String,
        label: "Question",
        max: 300
    },
    status: {
        type: String,
        label: "Author",
        // One of HIDDEN,ACTIVE,CLOSED,RESOLVED
    },
    submitted_at: {
        type: Date,
        label: "Submitted at",
        optional: true
    },
    activated_at: {
        type: Date,
        label: "Activated at",
        optional: true
    },
    closed_at: {
        type: Date,
        label: "Closed at",
        optional: true
    },
    resolved_at: {
        type: Date,
        label: "Resolved at",
        optional: true
    },
    status_update:{
        type:String,
        optional:true,
        max:400,
        label:"The result message display to user"
    },
    actual_result:{
        type:Number,
        optional:true,
        label:"The index of the winning outcome",
        min:0,
        max:3
    },
    outcomes:{
        type:[Object],
        label:"An array of possble outcomes",
        optional:true
    },
    "outcomes.$.text": {
        type: String
    },
    "outcomes.$.odds": {
        type: Number,
        decimal: true,
    }

});

Bets.attachSchema(schema);