Games = new Mongo.Collection("games")


var schema = new SimpleSchema({
    title: {
        type: String,
        label: "Game Title",
        max: 200
    },
    short_title: {
        type: String,
        label: "Short Game Title",
        max: 200
    },
    start_datetime: {
        type: Date,
        label: "Time when the game starts",
        optional: false
    },
    status: {
        type: String,
        label: "Status of the game: one of ACTIVE, INACTIVE, COMPLETED",
        optional: true
    },
    tweeter_hashtags: {
        type: [String],
        label: "Tweeter #",
        optional:true
    },
    tweeter_user_handles: {
        type: [String],
        label: "Tweeter @",
        optional: true
        
    },
    tweets: {
        type: [String],
        label: "Tweets",
        optional: true
    }
});

Games.attachSchema(schema);