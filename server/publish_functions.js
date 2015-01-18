Meteor.publish(null, function() {
    // TODO: protect if it is not an admit - return only me Meteor.publish(null, function() {
    //return Meteor.users.find({_id: this.userId}, {fields: {secrets: 0}});
    return Meteor.users.find({}, {fields: {secrets: 0}});
});