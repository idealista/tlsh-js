var tlsh = tlsh || {};

tlsh.DigestBuilder = function() {
    
    var MOD_VALUE = 256;

    var LOG_1_1 = 0.095310180;

    var LOG_1_3 = 0.26236426;

    var LOG_1_5 = 0.4054651;

    var checksum;

    var lValue;

    var q;

    var body;

    var Ranges = {
        LOW: 656,
        MID: 3199
    };

    var withChecksum = function(checksum){
        this.checksum = new tlsh.Checksum(checksum);
        return this;
    };

    var withLength = function(length){
        this.lValue = new tlsh.LValue(calculateLValue(length));
        return this;
    };

    var withQuartiles = function(quartiles){
        this.q = new tlsh.fromQValues(quartiles.getQ1Ratio(), quartiles.getQ2Ratio());
        return this;
    };

    var withBody = function(bodyData){
        this.body = new tlsh.Body(bodyData);
        return this;
    };

    var build = function(){
        return new tlsh.Digest(this.checksum, this.lValue, this.q, this.body);
    };

    var calculateLValue = function(length) {
        if(length <= Ranges.LOW) {
            return Math.floor(Math.log(length) / LOG_1_5) % MOD_VALUE;
        } 

        if(length <= Ranges.MID) {
            return Math.floor(Math.log(length) / LOG_1_3 - 8.72777) % MOD_VALUE;
        } 
            
        return Math.floor(Math.log(length) / LOG_1_1 - 62.5472) % MOD_VALUE;
    };

    return {
        withChecksum : withChecksum,
        withLength : withLength,
        withQuartiles : withQuartiles,
        withBody : withBody,
        build: build
    };
};