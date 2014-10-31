Schema = {};

Schema.UserFriend= new SimpleSchema({
    friendId:{
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
    dateAdd: {
        type: Date
    },
    accept: {
        type: Boolean
    }
})

Schema.UserInvitation = new SimpleSchema({
    whoSendInvitationId: {
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
    dateSendInvitation: {
        type: [Date]
    },
    readInvitation: {
        type: Boolean
    },
    acceptInvitation: {
        type: Boolean
    }
})

Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    country: {
        type: Schema.UserCountry,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        optional:true
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: [String],
        optional: true,
        blackbox: true
    },
    invitations: {
        type: [Schema.UserInvitation],
        optional: true,
    },
    friends: {
        type: [Schema.UserFriend],
        optional: true,
    }
});

Meteor.users.attachSchema(Schema.User);