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
    }
});

Chats.attachSchema(schema);