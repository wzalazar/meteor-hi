Meteor.publish('allMyInvitations', function() {
    var users= Meteor.users.find({ 'invitations.whoSendInvitationId':this.userId },{ 
                                fields: {
                                    'services.facebook.name':1,
                                    'services.facebook.picture':1,
                                    'services.twitter.screenName':1,
                                    'services.twitter.profile_image_url':1,
                                    'services.google.name':1,
                                    'services.google.picture':1,
                                    'username':1,
                                    'invitations.whoSendInvitationId':1,
                                    'invitations.readInvitation':1
                                }
                             });



   /**********************************************/
   /*
   /* I should delete the invitation that not me
   /*
   /***********************************************/


    return users;
});


Meteor.methods({
    createInvitation: function(friendId){
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
    		friendId:friendId,
		    dateAdd: new Date(),
		    accept: false
    	}

    	/*******************************/
    	/*
    	/* Create friend for the friend's collection
    	/*
    	/*******************************/

    	var me= {
    		friendId: this.userId,
		    dateAdd: new Date(),
		    accept: false
    	}

    	var count= Meteor.users.find({'_id':friendId,'invitations.whoSendInvitationId':this.userId}).count();
        if (count == 0){
	        Meteor.users.update(friendId,{ $push : { 'invitations' : invitation } });

	        /*******************************/
	    	/*
	    	/* Add friend for my collection
	    	/*
	    	/*******************************/

	        	Meteor.users.update(this.userId,{ $push : { 'friends' : friend } });


            /*******************************/
            /*
            /* Add me for the friend's collection
            /*
            /*******************************/

                Meteor.users.update(friendId,{ $push : { 'friends' : me } });
	    }
	    else{
	    	var date= new Date();
    		Meteor.users.update({'_id':friendId,'invitations.whoSendInvitationId':this.userId},
    							{ $addToSet: { 'invitations.$.dateSendInvitation' : date } } );

            Meteor.users.update({'_id':friendId,'invitations.whoSendInvitationId':this.userId},
                                { $set: { 'invitations.$.readInvitation' : false } } );
	    }
    },

    acceptInvitation:function(whoSendInvitationId){

    		Meteor.users.update({'_id':this.userId,'friends.friendId':whoSendInvitationId},
    						{$set:{'friends.$.accept':true}},{multi: true})

            Meteor.users.update({'_id':this.userId,'invitations.whoSendInvitationId':whoSendInvitationId},
                            {$set:{'invitations.$.acceptInvitation':true,'invitations.$.readInvitation':true}});
    	
    },

    readInvitation: function(whoSendInvitationId){

            Meteor.users.update({'_id':this.userId,'invitations.whoSendInvitationId':whoSendInvitationId},
                            {$set:{'invitations.$.acceptInvitation':false,'invitations.$.readInvitation':true}});

    }
});