Tracker.autorun(function(){
	Session.set('isFriend',false); 		   // button friend
	Session.set('thereAreInvitation',false);  // button Pending
	Session.set('isSendingForMe',false);  // button Pending
	Session.set('isSendingForFriend',false); // button accept
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
		var isFriend = false;

		var me= Meteor.users.findOne({'_id':Meteor.userId()},
							  { 
							  	friends:
							  				{ 
							  					$elemMatch:{'friendId':this._id} 
							  				} 
							  });

		_.each(me.friends,function(friend){
			if (friend.friendId == this._id && friend.accept == true)
				isFriend = true;
		},this);
		
		return isFriend;
	},

	thereAreInvitation: function(){
		try{
			var thereAreInvitationMe= false;
			var thereAreInvitationFriend= false;
			

			/* I see if there are invitations sending for me */

			var friend= Meteor.users.findOne({'_id':this._id},
							  { 
							  	invitations:
							  				{ 
							  					$elemMatch:{'whoSendInvitationId':Meteor.userId()} 
							  				} 
							  });

			/* I see if there are invitations sending for my friend */

			var me= Meteor.users.findOne({'_id':Meteor.userId()},
							  { 
							  	invitations:
							  				{ 
							  					$elemMatch:{'whoSendInvitationId':this._id} 
							  				} 
							  });
			
			console.log(friend);
			if (typeof (friend.invitations) != "undefined")
			{
				_.each(friend.invitations,function(invitation){
					if (invitation.whoSendInvitationId == Meteor.userId() && invitation.readInvitation==false){
						thereAreInvitationFriend= true;
					}
				},this);
			}
		
			
			if (typeof (me.invitations) != "undefined")
			{
				_.each(me.invitations,function(invitation){
					if (invitation.whoSendInvitationId == this._id && invitation.readInvitation==false){
						thereAreInvitationMe= true;
					}
				},this);
			}

			if (thereAreInvitationFriend== true || thereAreInvitationMe== true){
				return true;
			}
			else{
				return false;
			}
		}
		catch(err){
			console.log(err);
		}
		
	},

	isSendingForMe: function(){
		try{
			var isSendingForMe= false;
			var friend= Meteor.users.findOne({'_id':this._id},
							  { 
							  	invitations:
							  				{ 
							  					$elemMatch:{'whoSendInvitationId':Meteor.userId()} 
							  				} 
							  });

			

			if (typeof (friend.invitations) != "undefined") {
				_.each(friend.invitations,function(invitation){
					if (invitation.whoSendInvitationId == Meteor.userId() && invitation.readInvitation==false){
						isSendingForMe= true;
					}
				},this);
			}

			return isSendingForMe;
		}
		catch(err){
			console.log('Error isSendingForMe');
		}
		return true;
	},

	isSendingForFriend: function(){
		try{
			var isSendingForFriend= false;
			var me= Meteor.users.findOne({'_id':Meteor.userId()},
							  { 
							  	invitations:
							  				{ 
							  					$elemMatch:{'whoSendInvitationId':this._id} 
							  				} 
							  });

			if (typeof (me.invitations) != "undefined") {
				_.each(me.invitations,function(invitation){
					if (invitation.whoSendInvitationId == this._id && invitation.readInvitation==false){
						isSendingForFriend= true;
					}
				},this);
			}
			return isSendingForFriend;
		}
		catch(err){
			console.log('Error isSendingForFriend');
		}

	}

})