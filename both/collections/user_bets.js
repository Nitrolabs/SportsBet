UserBets = new Mongo.Collection("user_bets");



var schema = new SimpleSchema({
    game_id: {
        type: String,
        label: "Game ID",
        optional: true,
        max:50
    },
    user_id: {
        type: String,
        label: "User that submitted this bet",
        max:50
    },
    bet_id: {
        type: String,
        label: "Bet that this realates to",
        max:50,
    },
    wager: {
        type: Number,
        label: "Chips bet on this option",
        min:0
    },
    answer: {
        type: Number,
        label: "Index of the selected answer (1-4) or 0 if skipped",
        max: 300
    },
    skipped:{
        type:Boolean,
        label:"True if this question was skipped",
    },
    was_result_displayed:{
        type:Boolean,
        label:"true if the result status message has been seen"
    },
    submitted_at: {
        type: Date,
        label: "Date when this bet was submitted",
        optional: true
    },
    resolved_at: {
        type: Date,
        label: "Date when this bet was resolved",
        optional: true
    }
});

UserBets.attachSchema(schema);