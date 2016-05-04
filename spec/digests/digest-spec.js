'use strict';

var DigestHashBuilder = require('../../lib/digests/digest-hash-builder');
var expect = require('expect.js');

describe("Digest", function(){
    it('should check each item defined for modular difference calculator test', function() {
        var digest1 = new DigestHashBuilder().withHash("09F05A198CC69A5A4F0F9380A9EE93F2B927CF42089EA74276DC5F0BB2D34E68114448").build();
        var digest2 = new DigestHashBuilder().withHash("301124198C869A5A4F0F9380A9AE92F2B9278F42089EA34272885F0FB2D34E6911444C").build();
        
        expect(digest1.calculateDifference(digest1, true)).to.be(0);
        expect(digest1.calculateDifference(digest2, true)).to.be(121);
        expect(digest1.calculateDifference(digest2, false)).to.be(97);
    });

    it('should return zero differences using same tlsh instance without distance length', function() {
        var digest1 = new DigestHashBuilder().withHash("09F05A198CC69A5A4F0F9380A9EE93F2B927CF42089EA74276DC5F0BB2D34E68114448").build();
        
        expect(digest1.calculateDifference(digest1)).to.be(0);
        expect(digest1.calculateDifference(digest1, true)).to.be(0);
    });

    it('should return zero differences using same hashes', function() {
        var digest1 = new DigestHashBuilder().withHash("09F05A198CC69A5A4F0F9380A9EE93F2B927CF42089EA74276DC5F0BB2D34E68114448").build();
        var digest2 = new DigestHashBuilder().withHash("09F05A198CC69A5A4F0F9380A9EE93F2B927CF42089EA74276DC5F0BB2D34E68114448").build();
        
        expect(digest1.calculateDifference(digest2)).to.be(0);
        expect(digest1.calculateDifference(digest2, true)).to.be(0);
    });

    it('should return same differences using hashes with same distance byte', function() {
        var digest1 = new DigestHashBuilder().withHash("CBF0C0EFB28027B0260F4391212923ECBF1D42396637114DB85CF62436B187AD2731F8").build();
        var digest2 = new DigestHashBuilder().withHash("BEF08BEFB28027B0260B4391212922E8BF1D42396637114DB85CF62436B187AD2721B8").build();

        expect(digest1.calculateDifference(digest2, true)).to.be(digest1.calculateDifference(digest2));
    });

    it('should return not equals differences using hashes with different distance byte', function() {
        var digest1 = new DigestHashBuilder().withHash("09F05A198CC69A5A4F0F9380A9EE93F2B927CF42089EA74276DC5F0BB2D34E68114448").build();
        var digest2 = new DigestHashBuilder().withHash("301124198C869A5A4F0F9380A9AE92F2B9278F42089EA34272885F0FB2D34E6911444C").build();

        expect(digest1.calculateDifference(digest2, true)).not.to.be(digest1.calculateDifference(digest2, false));
    });
});
