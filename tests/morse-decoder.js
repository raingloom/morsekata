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
});