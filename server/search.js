Meteor.methods({
    createInvitation: function(userId){
    	var invitation= {
    		whoSendInvitationId: this.userId,
    		dateSendInvitation: [new Date()],
    		readInvitation: false,
    		acceptInvitation: false
    	}

    	/*******************************/
    	/*
    	/* Create friend for my collection
    	/*
    	/*******************************/

    	var friend= {
    		friendId:userId,
		    dateAdd: new Date(),
		    accept: false
    	}

    	/*******************************/
    	/*
    	/* Create friend for the friend's collection
    	/*
    	/*******************************/

    	var friendTo= {
    		friendId: this.userId,
		    dateAdd: new Date(),
		    accept: false
    	}

    	var count= Meteor.users.find({'_id':userId,'invitations.whoSendInvitationId':this.userId}).count();
        if (count == 0){
	        Meteor.users.update(userId,{ $push : { 'invitations' : invitation } });

	        /*******************************/
	    	/*
	    	/* Add friend for my collection
	    	/*
	    	/*******************************/

	        	Meteor.users.update(userId,{ $push : { 'friends' : friendTo } });


	        /*******************************/
	    	/*
	    	/* Add friend for the friend's collection
	    	/*
	    	/*******************************/

	        	Meteor.users.update(this.userId,{ $push : { 'friends' : friend } });
	    }
	    else{
	    	var date= new Date();
    		Meteor.users.update({'_id':userId,'invitations.whoSendInvitationId':this.userId},
    							{ $addToSet: { 'invitations.$.dateSendInvitation' : date } } );
	    }
    },

    acceptInvitation:function(whoSendInvitationId){

    		Meteor.users.update({'_id':this.userId,'invitations.whoSendInvitationId':whoSendInvitationId},
    						{$set:{'invitations.$.acceptInvitation':true}});
    	
    }
});