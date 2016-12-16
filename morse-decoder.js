'use strict';
let alphabet = require('./morse-alphabet');

let MorseDecoder = {
    decode: function(plaintext){
        let buffer="";
        for(let character of plaintext){
            buffer+=alphabet[character] || '';
        }
        return buffer;
    }
};



module.exports = MorseDecoder;