'use strict';

let Users = {
    Registry: {},
    clearRegistry: function() {
        Users.Registry = {};
    },
    getUser: function(name){
        return Users.Registry[name];
    },
    addUser: function(user) {
        //TODO: umm. do i copy this? do i keep it as a reference? sigh. I want Rust :C
        if(Users.validateUser(user)) {
            Users.Registry[user.name] = user;
        } else {
            throw Users.invalidUserError('user.name is missing or is not a string',user);
        }
    },
    validateUser: function(user) {
        return typeof(user.name)==='string' &&
        (
            typeof(user.realname)==='undefined' ||
            typeof(user.realname)==='string'
        );
    },
};

Users.invalidUserError = function


module.exports = Users;