UserStats = new Mongo.Collection("user_stats");

var schema = new SimpleSchema({
    user_id: {
        type: String,
        label: "User ID",
        max: 50
    },
    game_id: {
        type: String,
        label: "Game ID",
        max: 50
    },
    user_name: {
        type: String,
        label: "user name for easy access",
        optional: true
    },
    user_img: {
        type: String,
        label: "user image for easy access",
        optional: true
    },
    
    
    bank_account: {
        type: Number,
        decimal: true,
        label: "Available currency for this game"
    },
    
    
    user_stats: {
        type: Object,
        optional: true,
        label: "User stats, for this game"
    },
    "user_stats.money_on_the_table": {
        type: Number,
        decimal: true,
        optional: true,
        label: "Total money on the table"
    },
    "user_stats.total_number_of_bets_placed": {
        type: Number,
        optional: true,
        label: "Total # of bets placed"
    },
    "user_stats.total_number_of_bets_resolved": {
        type: Number,
        optional: true,
        label: "Total # of bets resolved"
    },
    "user_stats.total_wins_in_a_row": {
        type: Number,
        optional: true,
        label: "total number of wins in a row"
    },
    "user_stats.total_number_of_bets_won": {
        type: Number,
        optional: true,
        label: "Total # of bets won"
    },
    "user_stats.bets_won_percentage": {
        type: Number,
        decimal: true,
        optional: true,
        label: "User available currency"
    },
    "user_stats.potential_winnings": {
        type: Number,
        decimal: true,
        optional: true,
        label:"Potentail winnings in best case - win all pending bets"
    }
});

UserStats.attachSchema(schema);