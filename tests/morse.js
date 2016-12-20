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
    describe(".morseStream",function() {
        it("should handle single character",function(){
            let accum=[];
            for(let x of Morse.morseStream(".-")){
                accum.push(x);
            }
            expect(accum).to.eql([".-"]);
        });
        it("should handle multiple characters",function(){
            let accum=[];
            for(let x of Morse.morseStream(".-.. ..- .-")){
                accum.push(x);
            }
            expect(accum).to.eql([".-..", "..-", ".-"]);
        });
        it("should handle trailing and leading whitespace correctly",function(){
            let accum=[];
            for(let x of Morse.morseStream("  .-.. ..- .-   ")){
                accum.push(x);
            }
            expect(accum).to.eql([".-..", "..-", ".-"]);
        });
    });
    describe(".decode",function() {
        it("should decode .- as 'A'",function(){
            expect(Morse.decode(".-")).to.eql("A");
        });
        it("should decode '.-.. ..- .-' as 'LUA'",function(){
            expect(Morse.decode(".-.. ..- .-")).to.eql("LUA");
        });
        it("should decode '   .-.. ..- .-    ' as 'LUA' without regard for leading and trailing whitespace",function(){
            expect(Morse.decode("   .-.. ..- .-    ")).to.eql("LUA");
        });
        it("should decode '...---...' as 'SOS'",function(){
            expect(Morse.decode("...---...")).to.eql("SOS");
        });
    });
});