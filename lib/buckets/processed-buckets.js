var DigestBuilder = require('./digest-builder');

var ProcessedBuckets = function (checksum, bucketArray, processedDataLength, quartiles){
    
    var MINIMUM_HASH_INPUT_LENGTH = 512;
    var CODE_SIZE = 32;

    var isPositiveBucket = function(index){
        return bucketArray[index] > 0;
    };

    var hasMinimumNonZeroBuckets = function(){
        var nonzero = 0;

        for(var i=0; i < (CODE_SIZE*4); i++) {
            if (isPositiveBucket(i)) {
              nonzero++;
            }
        }

        return nonzero > (CODE_SIZE * 2);
    };

    var hasMinimumAmountOfDataProcessed = function(){
        return processedDataLength >= MINIMUM_HASH_INPUT_LENGTH;
    };

    var calculateBody = function(){
        var body = new Array(CODE_SIZE);
                
        for (var i = 0; i < CODE_SIZE; i++) {
            var h = 0;
            
            for (var j = 0; j < 4; j++) {
                var k1 = bucketArray[4 * i + j];
                
                if (quartiles.getThird() < k1) {
                    h += 3 << (j * 2);
                } else if (quartiles.getSecond() < k1) {
                    h += 2 << (j * 2);
                } else if (quartiles.getFirst() < k1) {
                    h += 1 << (j * 2);
                }
            }
            
            body[i] = h;
        }
        
        return body;
    };

    this.isProcessedDataTooSimple = function(){
        return !hasMinimumAmountOfDataProcessed() || !hasMinimumNonZeroBuckets();
    };

    this.buildDigest = function(){
        return new DigestBuilder()
                    .withChecksum(checksum)
                    .withLength(processedDataLength)
                    .withQuartiles(quartiles)
                    .withBody(calculateBody())
                    .build();
    };
};

module.exports = ProcessedBuckets;