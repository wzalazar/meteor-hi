Template.search.events({
	'click #createInvitation': function(){
		Meteor.call('createInvitation',this._id,function(err,result){
			if (err) console.log('Error= ',err);
		})
	}
})