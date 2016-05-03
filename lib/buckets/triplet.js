var tlsh = tlsh || {};

tlsh.Triplet = function (c1, c2, c3, salt){
	this.c1 = c1;
	this.c2 = c2;
	this.c3 = c3;
	this.salt = salt;
};

tlsh.Triplet.prototype.getHash = function(){
	return tlsh.CalculatePearsonHash([this.salt, this.c1, this.c2, this.c3]);
};