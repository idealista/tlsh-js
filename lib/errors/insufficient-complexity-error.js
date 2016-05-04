var InsufficientComplexityError = function(message) {
  this.name = 'InsufficientComplexityError';
  this.message = message;
  this.stack = (new Error()).stack;
};

InsufficientComplexityError.prototype = Object.create(Error.prototype);
InsufficientComplexityError.prototype.constructor = InsufficientComplexityError;