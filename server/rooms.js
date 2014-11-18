Meteor.publish('rooms', function() {
    return Rooms.find({'users.userId':{$in:[this.userId]}});
});