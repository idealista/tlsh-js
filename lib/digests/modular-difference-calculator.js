module.exports = function (initialPosition, finalPosition, circularQueueSize) {
    var internalDistance = Math.abs(finalPosition - initialPosition);
    var externalDistance = circularQueueSize - internalDistance;

    return Math.min(internalDistance, externalDistance);
};