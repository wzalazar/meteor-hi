Template.search.events({
	'click #createInvitation': function(){
		Meteor.call('createInvitation',this._id,function(err,result){
			if (err) console.log('Error= ',err);
		})
	}
})

Template.search.helpers({
	isInvitationPending: function(){
		var invitations= Meteor.users.find({'_id':this._id},
						  { 
						  	invitations:
						  				{ 
						  					$elemMatch:{'whoSendInvitationId':Meteor.userId(),'acceptInvitation':false} 
						  				} 
						  }).count();
		return invitations;
	}
})