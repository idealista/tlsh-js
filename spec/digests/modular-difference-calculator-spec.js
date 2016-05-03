'use strict';

describe("ModuleDifferenceCalculator", function(){
    var data;

    beforeAll(function(done) {
        data = [
            [3, 4, 16, 1], 
            [3, 10, 16, 7], 
            [3, 15, 16, 4]
        ];

        done();
    });

    it('should check each item defined for modular difference calculator test', function() {
        data.forEach(function(item) {
            var initialPosition = item[0];
            var finalPosition = item[1];
            var circularQueueSize = item[2];

            var expected = item[3];

            expect(tlsh.ModularDifferenceCalculator(initialPosition, finalPosition, circularQueueSize)).toBe(expected);
        });
    });

});
