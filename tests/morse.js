'use strict';
let expect = require("chai").expect;

let Morse = require("../morse");

describe("Morse",function(){
    describe(".encode",function() {
        it("should encode the 'a' character",function(){
            expect(Morse.encode("a")).to.eql(".-");
        });
        it("should encode 'lua' as a word",function(){
            expect(Morse.encode("lua")).to.eql(".-.. ..- .-");
        });
        it("should encode 'trailing commas' as two words",function(){
            expect(Morse.encode("trailing commas")).to.eql("- .-. .- .. .-.. .. -. --.   -.-. --- -- -- .- ...");
        });
        it("should treat 'MiXeDcAsE' case insensitively",function(){
            expect(Morse.encode("MiXeDcAsE")).to.eql("-- .. -..- . -.. -.-. .- ... .");
        });
        it("should ignore unknown characters",function(){
            expect(Morse.encode("!@!$#$%#$%#^")).to.eql("");
        });
    });
});