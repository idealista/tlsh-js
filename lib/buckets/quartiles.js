var Quartiles = function (data){
    if(data.length < ARRAY_SAMPLE_SIZE) throw new Error();

    var ARRAY_SAMPLE_SIZE = 128;
    
    var Q_RATIO_MODULE = 16;

    var sampleArray = data.slice(0, ARRAY_SAMPLE_SIZE).sort(function(a, b) {
        return (a - b);
    });

    this.getQ1Ratio = function() {
        return Math.floor(this.getFirst() * 100 / this.getThird()) % Q_RATIO_MODULE;
    };

    this.getQ2Ratio = function() {
        return Math.floor(this.getSecond() * 100 / this.getThird()) % Q_RATIO_MODULE;
    };

    this.getFirst = function(){
        return sampleArray[ARRAY_SAMPLE_SIZE / 4 - 1];
    };

    this.getSecond = function(){
        return sampleArray[ARRAY_SAMPLE_SIZE / 2 - 1];
    };

    this.getThird = function() {
        return sampleArray[ARRAY_SAMPLE_SIZE - (ARRAY_SAMPLE_SIZE / 4) - 1];
    };
};

module.exports = Quartiles;