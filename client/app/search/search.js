Meteor.startup(function(){
	Session.set('isFriend'); 		   // button friend
	Session.set('thereAreInvitation');  // button Pending
	Session.set('isSendingForMe');  // button Pending
	Session.set('isSendingForFriend'); // button accept
})

Template.search.events({
	'click #createInvitation': function(){
		Meteor.call('createInvitation',this._id,function(err,result){
			if (err) console.log('Error= ',err);
		})
	}
})

Template.search.helpers({
	isFriend: function(){
		Session.set('isFriend',false);
		return Session.get('isFriend');
	},

	thereAreInvitation: function(){
		var friend= Meteor.users.findOne({'_id':this._id},
						  { 
						  	invitations:
						  				{ 
						  					$elemMatch:{'whoSendInvitationId':Meteor.userId(),'readInvitation':false} 
						  				} 
						  });

		var me= Meteor.users.findOne({'_id':Meteor.userId()},
						  { 
						  	invitations:
						  				{ 
						  					$elemMatch:{'whoSendInvitationId':this._id,'readInvitation':false} 
						  				} 
						  });

		if (typeof (friend.invitations) != "undefined")
		{
			if (friend.invitations[0].readInvitation==false)
			{
				Session.set('thereAreInvitation',true);
			}
			
		}
	
		
		if (typeof (me.invitations) != "undefined")
		{
			if (me.invitations[0].readInvitation == false)
			{
				Session.set('thereAreInvitation',true);
			} 
		}

	
		return Session.get('thereAreInvitation')
	},

	isSendingForMe: function(){
		var friend= Meteor.users.findOne({'_id':this._id},
						  { 
						  	invitations:
						  				{ 
						  					$elemMatch:{'whoSendInvitationId':Meteor.userId(),'acceptInvitation':false} 
						  				} 
						  });

		

		if (typeof (friend.invitations) != "undefined") {
			if ((friend.invitations[0].readInvitation)==false)
				Session.set('isSendingForMe',true);
			else
				Session.set('isSendingForMe',false);
		}
		else
			Session.set('isSendingForMe',false);

		console.log('isSendingForMe ',Session.get('isSendingForMe'));
		return Session.get('isSendingForMe');
	},

	isSendingForFriend: function(){

		var me= Meteor.users.findOne({'_id':Meteor.userId()},
						  { 
						  	invitations:
						  				{ 
						  					$elemMatch:{'whoSendInvitationId':this._id,'acceptInvitation':false} 
						  				} 
						  });
		if (typeof (me.invitations) != "undefined") {
			if ((me.invitations[0].readInvitation)==false) 
				Session.set('isSendingForFriend',true);
			else
				Session.set('isSendingForFriend',false);
		}
		else
			Session.set('isSendingForFriend',false);

		console.log('isSendingForFriend ',Session.get('isSendingForFriend'));
		return Session.get('isSendingForFriend');
	}

})