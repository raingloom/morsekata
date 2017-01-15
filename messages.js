'use strict';

let Messages = {
    Data: {},
    createInbox: function(name) {
        Messages.Data[name] = [];
    },
    clearInbox: function(name) {
        Messages.Data[name] = {};
    },
    insert: function(name,message) {
        Messages.Data[name].push(message);
    },
    send: function(from,to,message) {
        Messages.insert(to,{
            from: from,
            to: to,
            message: message,
        });
    },
    getInboxContents: function(name) {
        return Messages.Data[name];
    },
    hasInbox: function(name) {
        return Messages.Data[name] !== undefined;
    },
};

module.exports = Messages;