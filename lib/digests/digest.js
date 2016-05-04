var composeString = require('./digest-string-composer');

var Digest = function (checksum, lValue, q, body){

    this.getLValue = function(){
        return lValue;
    };

    this.getQ = function(){
        return q;
    };

    this.getChecksum = function(){
        return checksum;
    };

    this.getBody = function(){
        return body;
    };

    this.calculateDifference = function(other, lengthDiff){
        var difference = 0;

        if(lengthDiff){
            difference += lValue.calculateDifference(other.getLValue());
        }

        difference += q.calculateDifference(other.getQ());
        difference += checksum.calculateDifference(other.getChecksum());
        difference += body.calculateDifference(other.getBody());

        return difference;
    };

    this.toString = function(){
        return composeString(this);
    };
};

module.exports = Digest;