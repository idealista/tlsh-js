var tlsh = tlsh || {};

tlsh.ModularDifferenceCalculator = (function() {

    var calculate = function (initialPosition, finalPosition, circularQueueSize) {
        var internalDistance = Math.abs(finalPosition - initialPosition);
        var externalDistance = circularQueueSize - internalDistance;
        return Math.min(internalDistance, externalDistance);
    };

    return calculate;
})();