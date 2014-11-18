Meteor.autorun(function(){
	Meteor.subscribe('rooms');
})

Template.chatAside.helpers({
	rooms:function(){
		var rooms= Rooms.find();
		return rooms;
	}
})

Template.chatAside.events({

})