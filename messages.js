'use strict';

let Messages = {
    Data: {},
    createInbox: function(name) {
        Messages.Data = {};
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
};

module.exports = Messages;