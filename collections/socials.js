Schema = {};

Schema.Socials= new SimpleSchema({
    service: {
    	type: String,
    	autoform: {
            options: function(){
                var optionsSocial= [
                    {label: "Facebook", value: 'facebook'},
                    {label: "Google", value: 'google'},
                    {label: "Twitter", value: 'twitter'}
                ];
                return optionsSocial;
            }
    	}
    },
    appIdLocalhost: {
    	type: String,
    	optional: false
    },
    secretLocalhost: {
    	type: String,
    	optional: false
    },
    urlProduction: {
        type: String,
        optional: false
    },
    appIdProduction: {
        type: String,
        optional: false
    },
    secretProduction: {
        type: String,
        optional: false
    },
    upDateConfiguration: {
        type: Boolean
    }
})

Socials = new Meteor.Collection("socials");
Socials.attachSchema(Schema.Socials);



 var optionsSocial= [
                    {label: "Facebook", value: 'facebook'},
                    {label: "Google", value: 'google'},
                    {label: "Twitter", value: 'twitter'}
                ];
              
                var socials= _.map(Socials.find().fetch(), function(social){ 
                  return { "label": social.service,"value": social.service }
                });
                _.each(socials,function(social){
                    optionsSocial = _.without(optionsSocial, _.findWhere(optionsSocial, {value: social.value}));
                })