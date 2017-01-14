'use strict';

const NE = require('node-exceptions');

let Session = require("./session");

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
            throw Users.InvalidUserError('user.name is missing or is not a string',user);
        }
    },
    validateUser: function(user) {
        return typeof(user.name)==='string' &&
        (
            typeof(user.realname)==='undefined' ||
            typeof(user.realname)==='string'
        );
    },
    setToken: function(name, token) {
        Users.Registry[name].token = token;
    },
    getToken: function(name, token) {
        return Users.Registry[name].token;
    },
    generateTokenForUser: function(name) {
        Users.setToken(name,Session.generate());
    },
};

Users.InvalidUserError = class extends NE.RuntimeException {};


module.exports = Users;