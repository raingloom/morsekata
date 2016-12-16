'use strict';
let expect = require("chai").expect;

let Morse = require("../morse");

describe("Morse",function(){
    describe(".decode",function() {
        it("should decode the 'a' character",function(){
            expect(Morse.decode("a")).to.eql(".-");
        });
        it("should decode 'lua' as a word",function(){
            expect(Morse.decode("lua")).to.eql(".-.. ..- .-");
        });
        it("should decode 'trailing commas' as two words",function(){
            expect(Morse.decode("trailing commas")).to.eql("- .-. .- .. .-.. .. -. --.   -.-. --- -- -- .- ...");
        });
        it("should treat 'MiXeDcAsE' case insensitively",function(){
            expect(Morse.decode("MiXeDcAsE")).to.eql("-- .. -..- . -.. -.-. .- ... .");
        });
        it("should ignore unknown characters",function(){
            expect(Morse.decode("!@!$#$%#$%#^")).to.eql("");
        });
    });
});