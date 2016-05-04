module.exports = function (data) {
    var result = ((data & 0xF0) >> 4) & 0x0F;
    result |= ((data & 0x0F) << 4) & 0xF0;

    return result;
};