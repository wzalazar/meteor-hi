Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    onRuningTemplate: 'loading',
    routeControllerNameConverter: "camelCase",
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

});

var mustBeSignedIn = function(pause) {
    AccountsEntry.signInRequired(this);
};

Router.onBeforeAction(mustBeSignedIn, {
     except: ['entrySignIn','entrySignUp','entryForgotPassword','website']
});

