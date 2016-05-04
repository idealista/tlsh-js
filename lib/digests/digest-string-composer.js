var swap = require('./byte-swapper');

var ComposeString = (function() {

    return function(digest){

        var TLSH_CHECKSUM_LEN = 1;

        var CODE_SIZE = 32;

        var toHex = function(data){
            var result = "";

            for (var i=0; i < data.length; i++) {
                if (data[i] < 16) {
                    result += '0';
                }

                result += data[i].toString(16).toUpperCase();
            }   

            return result;
        };

        var swapChecksum = function(checksum){
            var swappedChecksum = new Array(TLSH_CHECKSUM_LEN);

            for (k = 0; k < TLSH_CHECKSUM_LEN; k++) {    
                swappedChecksum[k] = swap(checksum.getValue()[k]);
            }

            return toHex(swappedChecksum);
        };

        var swapLValue = function(lValue){
            return toHex([swap(lValue.getValue())]);
        };

        var swapQ = function(q){
            return toHex([swap(q.getValue())]);
        };

        var swapBody = function(body){
            var swappedBody = new Array(CODE_SIZE);
            
            for(i=0; i < CODE_SIZE; i++ ){
                swappedBody[i] = body.getValue(CODE_SIZE - 1 - i);
            }

            return toHex(swappedBody);
        };

        var string = "";

        string += swapChecksum(digest.getChecksum());
        string += swapLValue(digest.getLValue());
        string += swapQ(digest.getQ());
        string += swapBody(digest.getBody());

        return string;
    };

})();

module.exports = ComposeString;