var tlsh = tlsh || {};

tlsh.hash = function(data){
    var processedBuckets = tlsh.ProcessBuckets(data);    

    if (processedBuckets.isProcessedDataTooSimple()) {
        throw new tlsh.InsufficientComplexityError("Input data hasn't enough complexity");
    }

    return processedBuckets.buildDigest().toString();
};