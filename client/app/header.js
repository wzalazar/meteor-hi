Meteor.startup(function(){
	Session.set('NotificationCount','0');
})

Template.header.helpers({
	inviations: function(){
		Meteor.susbribe('me');
		var me= Meteor.users.find(Meoteor.userId());
		Session.set('NotificationCount',(me.invitations).count());
		return me.invitations;
	},
	inviationsCount: function(){
		return Session.get('NotificationCount');
	}
})