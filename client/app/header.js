Meteor.startup(function(){
	Session.set('NotificationCount','0');
	Meteor.subscribe('me');
	Meteor.subscribe('allUsersOutMe');
})

Template.header.helpers({
	invitationsCount: function(){
		var me= Meteor.users.findOne({'_id':Meteor.userId()});
		var count= 0;
		_.each(me.invitations,function(invitation){
			if (invitation.readInvitation==false) count++;
		})
		Session.set('NotificationCount',count);
		return Session.get('NotificationCount');
	},
	pendingInvitations:function(){
		var me= Meteor.users.findOne({ '_id':Meteor.userId() });
		var invitations= [];
		_.each(me.invitations,function(invitation){
			if (invitation.readInvitation==false) invitations.push(invitation);
		})
		return invitations;
	},
	currentUserId:function(){
		return Meteor.userId();
	}
})

Template.header.events({
	'click #acceptInvitation':function(event){
		event.preventDefault();
		Meteor.call('acceptInvitation',this.whoSendInvitationId,function(err,result){

		})
	},

	'click #readInvitation': function(event){
		event.preventDefault();
		Meteor.call('readInvitation',this.whoSendInvitationId,function(err,result){

		})
	}
})