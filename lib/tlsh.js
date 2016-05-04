var processBuckets = require('./buckets/bucket-processor');

module.exports = function(data){
    var processedBuckets = processBuckets(data);    

    if (processedBuckets.isProcessedDataTooSimple()) {
        throw new InsufficientComplexityError("Input data hasn't enough complexity");
    }

    return processedBuckets.buildDigest().toString();
};