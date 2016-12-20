'use strict';
let alphabet = require('./morse-alphabet');
//create reverse lookups
for(let k in alphabet ){
    alphabet[alphabet[k]] = k;
}

let Morse = {
    encode: function(plaintext){
        let buffer=[];
        for(let character of plaintext.trim()){
            character=character.toLowerCase();
            let morseCharacter = alphabet[character];
            if (morseCharacter !== undefined)
            {
                buffer.push(morseCharacter);
            }
        }
        return buffer.join(" ");
    },
    morseStream: function(morsetext){
        return {
            [Symbol.iterator]: function*(){
                let buffer=[];
                for(let character of morsetext.trim()){
                    //make sure triple space is decoded correctly
                    if(character===' ' && buffer.length>0){
                        yield buffer.join('');
                        buffer=[];
                    } else {
                        buffer.push(character);
                    }
                }
                if(buffer.length>0){
                    yield buffer.join('');
                }
            }
        };
    },
    decodeSingle: function(character){
        return alphabet[character];
    },
    decode: function(morsetext){
        let buffer=[];
        for(let character of Morse.morseStream(morsetext)){
            buffer.push(Morse.decodeSingle(character));
        }
        return buffer.join('').toUpperCase();
    },
};



module.exports = Morse;