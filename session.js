'use strict';

let id = 0;

let Session = {
    ByName: {},
    ByToken: {},
    generate: function() {
        //TODO: use some kind of UUID library?
        let ret = id;
        id++;
        return String(ret);
    },
    generateFor: function(name) {
        Session.setToken(name,Session.generate());
    },
    checkToken: function(name, token) {
        return Session.ByName[name] === token;
    },
    reset: function() {
        id = 0;
    },
    setToken: function(name, token) {
        Session.ByName[name] = token;
        Session.ByToken[token] = name;
    },
    getToken: function(name) {
        return Session.ByName[name];
    },
    getName: function(token) {
        return Session.ByToken[token];
    },
    hasUser: function(token) {
        return Session.getName(token) !== undefined;
    },
};

module.exports = Session;