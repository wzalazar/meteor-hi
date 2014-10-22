Messages = new Meteor.Collection("messages");

Schema = {};

Schema.Messages= new SimpleSchema({
    whoSendMessageId: {
        type: String,
        autoform:{
        	options: function(){
        		var users= _.map(Meteor.users.find().fetch(), function(user){ 
                      return { "label": user.emails[0].address,"value": user._id }
				});
                return users;
        	}
        }
    },
    chatRoomId: {
        type: String
    },
    message: {
        type: String
    },
    dateCreateMessage: {
        type: Date
    },
    readMessage:{
        type:[Object]
    },
    "readMessage.$.userId":{
        type: String
    },
    "readMessage.$.read":{
        type: String
    }
})

Messages.attachSchema(Schema.Messages);