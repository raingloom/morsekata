'use strict';

let id = 0;

let Session = {
    Data: {},
    generate: function() {
        let ret = id;
        id++;
        return ret;
    },
    reset: function() {
        id = 0;
    },
    setToken: function(name, token) {
        Session.Data[name].token = token;
    },
    getToken: function(name, token) {
        return Session.Data[name].token;
    },
    generateTokenForUser: function(name) {
        Session.setToken(name,Session.generate());
    },
    checkToken: function(name, token) {
        return Session.Data[name] === token;
    },
};

module.exports = Session;