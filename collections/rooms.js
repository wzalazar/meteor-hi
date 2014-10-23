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

Schema.Rooms= new SimpleSchema({
    name:{
        type: String   
    },
    dateCreate: {
        type: Date
    },
    users:{
        type:[Object]
    },
    "users.$.userId":{
        type: String
    },
    messages:{
    	type: [Schema.Messages],
        optional: true
    }
})

Rooms = new Meteor.Collection("rooms");
Rooms.attachSchema(Schema.Rooms);