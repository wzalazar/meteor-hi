Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    onRuningTemplate: 'loading',
    templateNameConverter: 'camelCase', // or 'none' or 'upperCamelCase' or function (input)
    waitOn: function() {

    }
});


Router.map(function() {
    this.route('website', {
        path: '/'
    });

    this.route('dashboard', {
        path: '/dashboard',
        waitOn: function() {
        },
        data: function() {
        }
    });

    this.route('chat', {
        path: '/chat',
        layoutTemplate: 'dashboard',
        yieldTemplates: {
            'chatAside': {
                to: 'content'
            }
        },
        waitOn: function() {
            return [
               
            ];
        },
        data: function() {
            return {
                
            }
        },
        onRun: function() {
            
        }
    });

    this.route('search', {
        path: '/search',
        layoutTemplate: 'dashboard',
        yieldTemplates: {
            'search': {
                to: 'content'
            }
        },
        waitOn: function() {
            return [
                Meteor.subscribe('allUsersOutMe')
            ];
        },
        data: function() {
            return {
                users: function() {
                    return Meteor.users.find({
                        _id: {
                            $ne: Meteor.userId()
                        }
                    });
                }
            }
        }
    });

});

var mustBeSignedIn = function(pause) {
    AccountsEntry.signInRequired(this);
};

Router.onBeforeAction(mustBeSignedIn, {
     except: ['entrySignIn','entrySignUp','entryForgotPassword','website']
});

