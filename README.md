# JavaScript port of TLSH (Trend Micro Locality Sensitive Hash)

[![Build Status](https://travis-ci.org/idealista-tech/tlsh-js.svg?branch=master)](https://travis-ci.org/idealista-tech/tlsh-js)

TLSH is a fuzzy matching library designed by [Trend Micro](http://www.trendmicro.com) (Hosted in [GitHub](https://github.com/trendmicro/tlsh)) 

Given a byte stream with a minimum length of 512 characters (and a minimum amount of randomness), TLSH generates a hash value which can be used for similarity comparisons. Similar objects will have similar hash values which allows for the detection of similar objects by comparing their hash values. Note that the byte stream should have a sufficient amount of complexity. For example, a byte stream of identical bytes will not generate a hash value.

The computed hash is 70 hexadecimal characters long. The first 6 characters are used to capture the information about the file as a whole (length, ...), while the last 64 characters are used to capture information about incremental parts of the file.

## How it's used

With TLSH mainly you can calculate a hash using supported Strings and compute the difference between two resultant hashes.

### How-To calculate a Hash

To compute a Hash using TLSH, you should do the following:

```javascript
// Quote extracted from 'The UNIX-HATERS Handbook'
var str = "The best documentation is the UNIX source. After all, this is what the " +
            "system uses for documentation when it decides what to do next! The " +
            "manuals paraphrase the source code, often having been written at " +
            "different times and by different people than who wrote the code. " +
            "Think of them as guidelines. Sometimes they are more like wishes... " +
            "Nonetheless, it is all too common to turn to the source and find " +
            "options and behaviors that are not documented in the manual. Sometimes " +
            "you find options described in the manual that are unimplemented " +
            "and ignored by the source.";

var hash = hash(str);   
```

The resultant hash will be _6FF02BEF718027B0160B4391212923ED7F1A463D563B1549B86CF62973B197AD2731F8_ as is described in the TLSH unit tests.

### Requirements

The input data must contain:

* At least 512 characters. 
* A certain amount of randomness.

to generate a hash value. In other case an **InsufficientComplexityError** will be thrown.

### How-To compute difference between two hashes

1. You should to create two digests using the Digest Hash Builder with hashes as inputs:

```javascript
var digest1 = new DigestHashBuilder().withHash("09F05A198CC69A5A4F0F9380A9EE93F2B927CF42089EA74276DC5F0BB2D34E68114448").build();
var digest2 = new DigestHashBuilder().withHash("301124198C869A5A4F0F9380A9AE92F2B9278F42089EA34272885F0FB2D34E6911444C").build();
```

2. You can compute the difference using one Digest against the other one

```javascript
// Should be equals to digest1.calculateDifference(digest2, true);
digest2.calculateDifference(digest1, true);
```

The computed difference should be _121_ as is described in Digest unit tests.

**Note:** Computing the difference using a digest against itself should return no difference.

#### How to measure the difference?

* A difference of 0 means the objects are almost identical.
* A difference of 200 or higher means the objects are **very** different.

#### Ignoring the input data length

The difference should be calculated using the file length component or removing it (giving _false_ as second parameter). If an input with a repeating pattern is compared to an input with only a single instance of the pattern, then the difference will be increased if the length is included. Giving a false value to the second parameter, the input data length will be removed from consideration.

## Requirements

The library has been tested with _Node.js v4.4.3_, _npm 2.15.1_ and _grunt v0.4.5_. Newer versions should work but could also present issues.

## Design choices

We have adopted the original Trend Locality Sensitive Hashing design choices to build this JavaScript port.

## TODO

* Complete Data Tests using input data and resulting digests from Trend Micro official repository.

## License 

Read [LICENSE.txt](LICENSE.txt) attached to the project