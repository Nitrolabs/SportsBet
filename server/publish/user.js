


Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
  	username:1,
  	emails:1,
    roles:1,
    profile:1,
    bank_account:1,
  }});
});

