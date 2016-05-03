var tlsh = tlsh || {};

tlsh.Q = function (value){
    this.getQLo = function(){
        return value & 0x0F;
    };

    this.getQHi = function(){
        return (value & 0xF0) >> 4; 
    };

    this.calculateDifference = function(other){
        var RANGE_QRATIO = 16;
        
        var diff = 0;

        var q1diff = tlsh.ModularDifferenceCalculator(this.getQLo(), other.getQLo(), RANGE_QRATIO);

        if(q1diff <= 1){
            diff += q1diff;
        }  else {
            diff += (q1diff - 1) * 12;
        }

        var q2diff = tlsh.ModularDifferenceCalculator(this.getQHi(), other.getQHi(), RANGE_QRATIO);

        if (q2diff <= 1) {
            diff += q2diff;
        } else {
            diff += (q2diff - 1) * 12;
        }
        
        return diff;
    };

    this.getValue = function(){
        return value;
    };
};

tlsh.fromQValues = function(QLo, QHi){
    var calculateValue = function(QLo, QHi){
        return (((0 & 0xF0) | (QLo & 0x0F)) & 0x0F) | ((QHi & 0x0F) << 4);
    };

    return new tlsh.Q(calculateValue(QLo, QHi));
};