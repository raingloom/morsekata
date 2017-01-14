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
        if(! Users.validateUser(user)) {
            throw new Users.InvalidUserError('user object is in incorrent format',user);
        }
        if(typeof(Users.Registry[user.name]) === 'undefined') {
            Users.Registry[user.name] = user;
        } else {
            throw new Users.InvalidUserError('user already exists',user);
        }
    },
    validateUser: function(user) {
        return typeof(user.name) === 'string' &&
        (typeof(user.fullname) === 'undefined' ||
        typeof(user.fullname) === 'string');
    },
};

Users.InvalidUserError = class extends NE.RuntimeException {};


module.exports = Users;