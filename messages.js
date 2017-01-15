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
        let copy = [];
        for(let msg of Messages.Data[name]) {
            copy.push({
                from: msg.from,
                to: msg.to,
                message: msg.message,
            });
        }
        return copy;
    },
    hasInbox: function(name) {
        return Messages.Data[name] !== undefined;
    },
};

module.exports = Messages;