'use strict';
let alphabet = require('./morse-alphabet');

let MorseDecoder = {
    decode: function(plaintext){
        let buffer=[];
        for(let character of plaintext){
            buffer.push(alphabet[character] || "");
        }
        return buffer.join(" ");
    }
};



module.exports = MorseDecoder;