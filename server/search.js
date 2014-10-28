Meteor.methods({
    createInvitation: function(userId){
    	var invitation= {
    		whoSendInvitationId: this.userId,
    		dateSendInvitation: new Date(),
    		readInvitation: false,
    		acceptInvitation: false
    	}
        Meteor.users.update(this.userId,{ $push : { 'invitations' : invitation } });
    }
});