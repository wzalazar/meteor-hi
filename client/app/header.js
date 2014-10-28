Meteor.startup(function(){
	Session.set('NotificationCount','0');
	Meteor.subscribe('me');
})

Template.header.helpers({
	invitations: function(){
		var me= Meteor.users.find(Meteor.userId());
		return me.invitations;
	},
	invitationsCount: function(){
		var me= Meteor.users.findOne({'_id':Meteor.userId()});
		var count= 0;
		_.each(me.invitations,function(invitation){
			console.log(invitation);
			if (invitation.readInvitation==false) count++;
		})
		Session.set('NotificationCount',count);
		return Session.get('NotificationCount');
	},
	pendingInvitations:function(){
		var me= Meteor.users.findOne({'_id':Meteor.userId()});
		return me.invitations;
	},
	currentUserId:function(){
		return Meteor.userId();
	}
})