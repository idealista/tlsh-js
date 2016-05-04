var Triplet = require('./triplet');

var SlideWindow = function (){

    var SLIDING_WINDOW_SIZE = 5;

    var CHECKSUM_LENGTH = 1;

    var storage = new Array(SLIDING_WINDOW_SIZE);

    var counter = 0;

    var getValue = function(index){
        return storage[index];
    };

    var getHash = function(c1, c2, c3, salt){
        return new Triplet(c1, c2, c3, salt).getHash();
    };

    var isComplete = function(){
        return counter >= SLIDING_WINDOW_SIZE;
    };

    this.put = function(value){
        storage[this.getPivot()] = value & 0xff;
        counter++;
    };

    this.getPivot = function(){
        return counter % SLIDING_WINDOW_SIZE;
    };

    this.getTripletHashes = function(fromStartWindow){
        if(!isComplete()) return [];

        var startWindow = fromStartWindow;
        var j2 = (startWindow + 1) % SLIDING_WINDOW_SIZE;
        var j3 = (startWindow + 2) % SLIDING_WINDOW_SIZE;
        var j4 = (startWindow + 3) % SLIDING_WINDOW_SIZE;
        var endWindow = (startWindow + 4) % SLIDING_WINDOW_SIZE;

        return [
            getHash(storage[startWindow], storage[endWindow], storage[j4], 2),
            getHash(storage[startWindow], storage[endWindow], storage[j3], 3),
            getHash(storage[startWindow], storage[j4], storage[j3], 5),
            getHash(storage[startWindow], storage[j4], storage[j2], 7),
            getHash(storage[startWindow], storage[endWindow], storage[j2], 11),
            getHash(storage[startWindow], storage[j3], storage[j2], 13)
        ];
    };

    this.getChecksum = function(fromStartWindow, lastChecksum){
        if(!isComplete()) return null;
        
        var endWindow = (fromStartWindow + 4) % SLIDING_WINDOW_SIZE;
        
        var checksum = new Array(CHECKSUM_LENGTH);
        
        for (var i = 0; i < CHECKSUM_LENGTH; i++) {         
            var c1 = getValue(fromStartWindow);         
            var c2 = getValue(endWindow);           
            var c3 = 0;         
            var salt = 0;
            
            if(lastChecksum){
                c3 = lastChecksum[i];
            }
            
            if (i !== 0) {
                salt = checksum[i - 1];
            }
            
            checksum[i] = getHash(c1, c2, c3, salt);
        }
        
        return checksum;
    };
};

module.exports = SlideWindow;