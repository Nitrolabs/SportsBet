Chats = new Mongo.Collection("chats")


var schema = new SimpleSchema({
    message: {
        type: String,
        label: "Message",
        max: 500
    },
    submitted_at: {
        type: Date,
        label: "Time when the chat submitted",
        optional: false
    },
    user_id: {
        type: String,
        label: "User id of the user who sent the message",
        optional: false
    },
    game_id: {
        type: String,
        label: "Game ID",
        optional: false
    }
});

Chats.attachSchema(schema);