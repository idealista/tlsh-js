var tlsh = tlsh || {};

tlsh.InsufficientComplexityError = function(message) {
  this.name = 'InsufficientComplexityError';
  this.message = message;
  this.stack = (new Error()).stack;
};

tlsh.InsufficientComplexityError.prototype = Object.create(Error.prototype);
tlsh.InsufficientComplexityError.prototype.constructor = tlsh.InsufficientComplexityError;