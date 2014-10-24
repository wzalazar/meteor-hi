Accounts.onCreateUser(function(options, user) {
    if (typeof(user.services.facebook) != "undefined") {
        user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }
    user.online= true;
    return user;
});


function updateSocial(service,appId,secret){
   ServiceConfiguration.configurations.remove({
      service: service
    });
    ServiceConfiguration.configurations.insert({
      service: service,
      appId: appId,
      secret: secret
    });
}


Meteor.startup(function(){
  var facebook= Socials.findOne({'service':'facebook'});
  var twitter= Socials.findOne({'service':'twitter'});
  var google= Socials.findOne({'service':'google'});

  if (facebook){
    if (facebook.upDateConfiguration){
      console.log(facebook.urlProduction);
      if(process.env.ROOT_URL == facebook.urlProduction){
        updateSocial("facebook",facebook.appIdProduction,facebook.secretProduction);
      }
      else{
        updateSocial("facebook",facebook.appIdLocalhost,facebook.secretLocalhost);
      }
    }
  }

  if (twitter){
    if (twitter.upDateConfiguration){
      if(process.env.ROOT_URL == twitter.urlProduction){
        updateSocial("twitter",twitter.appIdProduction,twitter.secretProduction);
      }
      else{
        updateSocial("twitter",twitter.appIdLocalhost,twitter.secretLocalhost);
      }
    }
  }

  if (google){
    if (google.upDateConfiguration){
      if(process.env.ROOT_URL == google.urlProduction){
        updateSocial("google",google.appIdProduction,google.secretProduction);
      }
      else{
        updateSocial("google",google.appIdLocalhost,google.secretLocalhost);
      }
    }
  }
})

 