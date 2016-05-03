var tlsh = tlsh || {};

tlsh.CalculateBitPairsMappedValue = (function(){
    
    var BIT_PAIRS_DIFF_TABLE_SIZE = 256;

    var BIT_PAIRS_DIFF_TABLE = generateDefaultBitPairsTable();

    function generateDefaultBitPairsTable() {
        var result = new Array(BIT_PAIRS_DIFF_TABLE_SIZE);

        for (var i = 0; i < result.length; i++) {
            result[i] = new Array(BIT_PAIRS_DIFF_TABLE_SIZE);   
        }

        for (i = 0; i < BIT_PAIRS_DIFF_TABLE_SIZE; i++) {
            for (var j = 0; j < BIT_PAIRS_DIFF_TABLE_SIZE; j++) {
                var x = i;
                var y = j;
                var diff = 0;

                for (var z = 0; z < 4; z++) {
                    var d = Math.abs(x % 4 - y % 4);
                    
                    if(d == 3){
                        diff += d * 2;
                    } else {
                        diff += d;
                    }

                    if (z < 3) {
                        x = Math.floor(x / 4);
                        y = Math.floor(y / 4);
                    }
                }

                result[i][j] = diff;
            }
        } 

        return result;
    }    

    var getValue = function(row, column){
        return BIT_PAIRS_DIFF_TABLE[row][column];
    };

    return getValue;
})();