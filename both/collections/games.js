Games = new Mongo.Collection("games")


var schema = new SimpleSchema({
    title: {
        type: String,
        label: "Game Title",
        max: 200
    },
    start_datetime: {
        type: Date,
        label: "Time when the game starts",
        optional: false
    }
});

Games.attachSchema(schema);