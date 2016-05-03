var tlsh = tlsh || {};

tlsh.Checksum = function (checksumData){

    var areEquals = function (anArray, otherArray) {
        var i = anArray.length;
        
        if (i != otherArray.length) return false;
       
        while (i--) {
            if (anArray[i] !== otherArray[i]) return false;
        }

        return true;
    };

    this.calculateDifference = function(other) {
        if (!areEquals(checksumData, other.getValue())) return 1;
        return 0;
    };

    this.getValue = function(){
        return checksumData;
    };
};
