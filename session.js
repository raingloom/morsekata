'use strict';

let id = 0;

let Session = {
    Data: {},
    generate: function() {
        let ret = id;
        id++;
        return String(ret);
    },
    reset: function() {
        id = 0;
    },
    setToken: function(name, token) {
        Session.Data[name] = token;
    },
    getToken: function(name) {
        return Session.Data[name];
    },
    generateFor: function(name) {
        Session.setToken(name,Session.generate());
    },
    checkToken: function(name, token) {
        return Session.Data[name] === token;
    },
};

module.exports = Session;