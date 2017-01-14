'use strict';

let id = 0;

let Session = {
    generate: function() {
        let ret = id;
        id++;
        return ret;
    },
    reset: function() {
        id = 0;
    },
};

module.exports = Session;