var calculateModularDifference = require('./modular-difference-calculator');

var LValue = function (value){

    var RANGE_LVALUE = 256;

    this.calculateDifference = function(other){
        var ldiff = calculateModularDifference(value, other.getValue(), RANGE_LVALUE);

        if(ldiff === 0){
            return 0;
        }

        if(ldiff === 1){
            return 1;
        }

        return ldiff * 12;
    };

    this.getValue = function(){
        return value;
    };
};

module.exports = LValue;