Games.deny({
  insert: function (userId, doc) {
      console.log("games allow");
      var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
    // return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
  },

  remove: function (userId, doc) {
    var u = Meteor.users.findOne(userId);
    return !(userId && u && u.is_admin);
  }
});

Bets.deny({
  insert: function (userId, doc) {
      var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
    // return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
  },

  remove: function (userId, doc) {
    var u = Meteor.users.findOne(userId);
    return !(userId && u && u.is_admin);
  }
});

UserBets.deny({
  insert: function (userId, doc) {
      var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
    // return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
  },

  remove: function (userId, doc) {
    var u = Meteor.users.findOne(userId);
    return !(userId && u && u.is_admin);
  }
});

Chats.deny({
  insert: function (userId, doc) {
    //   var u = Meteor.users.findOne(userId);
      return !(userId && (userId == doc.user_id));
    // return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
  },

  remove: function (userId, doc) {
    var u = Meteor.users.findOne(userId);
    return !(userId && u && u.is_admin);
  }
});

Meteor.users.deny({
    insert: function (userId, doc) {
    //   var u = Meteor.users.findOne(userId);
    console.log(doc);
      return (doc && doc.is_admin);
    // return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    var u = Meteor.users.findOne(userId);
      return !(userId && u && u.is_admin);
  },

  remove: function (userId, doc) {
    var u = Meteor.users.findOne(userId);
    return !(userId && u && u.is_admin);
  }
});
