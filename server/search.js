Meteor.methods({
    createInvitation: function(userId){
    	var invitation= {
    		whoSendInvitationId: this.userId,
    		dateSendInvitation: new Date(),
    		readInvitation: false,
    		acceptInvitation: false
    	}
        Meteor.users.update(userId,{ $push : { 'invitations' : invitation } });
    }
});