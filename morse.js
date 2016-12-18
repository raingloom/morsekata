'use strict';
let alphabet = require('./morse-alphabet');

let MorseDecoder = {
    encode: function(plaintext){
        let buffer=[];
        for(let character of plaintext){
            character=character.toLowerCase();
            let morseCharacter = alphabet[character];
            if (morseCharacter !== undefined)
            {
                buffer.push(morseCharacter);
            }
        }
        return buffer.join(" ");
    }
};



module.exports = MorseDecoder;