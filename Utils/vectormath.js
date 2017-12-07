// common Vector and Matrix math
// accumulating here as needed by demos
// might actually be a usable library at some point :)

// universal function that can be applied to 
// vectors represented with simple js array.

function Vec2(x,y){
	this.data = new Float32Array([x,y]);
}
Object.defineProperty(Vec2, "x", {
	get : function(){return this.data[0];},
	set : function(v){this.data[0] = v;}
});
Object.defineProperty(Vec2, "y", {
	get : function(){return this.data[1];},
	set : function(v){this.data[1] = v;}
});
Vec2.prototype.Add = function( other ){
	this.data[0] += other.data[0];
	this.data[1] += other.data[1];
	return this;
};
Vec2.prototype.Sub = function( other ){
	this.data[0] -= other.data[0];
	this.data[1] -= other.data[1];
	return this;
};
Vec2.prototype.Mul = function( other ){
	this.data[0] *= other.data[0];
	this.data[1] *= other.data[1];
	return this;
};
Vec2.prototype.Div = function( other ){
	this.data[0] /= other.data[0];
	this.data[1] /= other.data[1];
	return this;
};
Vec2.prototype.AddScalar = function( other ){
	this.data[0] += other;
	this.data[1] += other;
	return this;
};
Vec2.prototype.SubScalar = function( other ){
	this.data[0] -= other;
	this.data[1] -= other;
	return this;
};
Vec2.prototype.MulScalar = function( other ){
	this.data[0] *= other;
	this.data[1] *= other;
	return this;
};
Vec2.prototype.DivScalar = function( other ){
	this.data[0] /= other;
	this.data[1] /= other;
	return this;
};
Vec2.prototype.MagnitudeSqr = function(){
	return this.data[0]*this.data[0] + this.data[1]*this.data[1];
};
Vec2.prototype.Magnitude = function(){
	return Math.sqrt( this.MagnitudeSqr() );
};
Vec2.prototype.Normalize = function( other ){
	var m = this.Magnitude();
	this.data[0] /= m;
	this.data[1] /= m;
	return this;
};