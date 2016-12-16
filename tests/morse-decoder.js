'use strict'
let expect = require("chai").expect;

let MorseDecoder = require("../morse-decoder");

describe("MorseDecoder",function(){
    it("should decode the 'a' character",function(){
        expect(MorseDecoder.decode("a")).to.eql(".-");
    });
    it("should decode 'lua' as a word",function(){
        expect(MorseDecoder.decode("lua")).to.eql(".-.. ..- .-");
    });
    it("should decode 'trailing commas' as two words",function(){
        expect(MorseDecoder.decode("trailing commas")).to.eql("- .-. .- .. .-.. .. -. --.   -.-. --- -- -- .- ...");
    });
    it("should treat 'MiXeDcAsE' case insensitively",function(){
        expect(MorseDecoder.decode("MiXeDcAsE")).to.eql("-- .. -..- . -.. -.-. .- ... .");
    });
    it("should ignore unknown characters",function(){
        expect(MorseDecoder.decode("!@!$#$%#$%#^")).to.eql("");
    });
});