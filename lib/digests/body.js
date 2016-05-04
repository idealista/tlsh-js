var calculateBitPairsMappedValue = require('./bit-pairs-table');

var Body = function (value){
    var hDistance = function(other){
        var diff = 0;

        for (var i = 0; i < value.length; i++) {
            diff += calculateBitPairsMappedValue(value[i], other.getValue(i));
        }
        
        return diff;
    };

    this.calculateDifference = function(other) {
        return hDistance(other);
    };

    this.getValue = function(index){
        return value[index];
    };
};

module.exports = Body;
