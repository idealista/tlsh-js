var tlsh = tlsh || {};

tlsh.DigestHashBuilder = function() {
    
    var CODE_SIZE = 32;

    var checksum;

    var lValue;

    var q;

    var body;

    var withHash = function(hash){
        var digestData = fromHex(hash);
        var i = 0;

        withChecksumData(digestData[i++]);
        withLValueData(digestData[i++]);
        withQData(digestData[i++]);
        withBodyData(getBodyData(digestData, i));

        return this;
    };

    var build = function() {
        return new tlsh.Digest(checksum, lValue, q, body);
    };

    var fromHex = function(str){
        var result = new Array(str.length / 2);

        for (var i = 0; i < str.length; i += 2) {
            result[i / 2] = parseInt(str.substring(i, i + 2), 16);
        }

        return result;
    };

    var withChecksumData = function(data){
        checksum = new tlsh.Checksum([swap(data)]);
    };

    var withLValueData = function(data){
        lValue = new tlsh.LValue([swap(data)]);
    };

    var withQData = function(data){
        q = new tlsh.Q([swap(data)]);
    };

    var withBodyData = function(data){
        var bodyData = new Array(data.length);
        
        for(var j = 0; j < data.length; j++) {
            bodyData[j] = (data[data.length - 1 - j]);
        }
        
        body = new tlsh.Body(bodyData);
    };

    var getBodyData = function(data, from){
        return data.slice(from, data.length);
    };

    var swap = function(data) {
        return tlsh.SwapByte(data);
    };

    return {
        withHash: withHash,
        build: build
    };
};