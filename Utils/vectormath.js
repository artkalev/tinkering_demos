// common Vector and Matrix math
// accumulating here as needed by demos
// might actually be a usable library at some point :)

// universal function that can be applied to 
// vectors represented with simple js array.

function vecAdd( a, b ){
	var result = [];
	for(var i = 0; i < a.length; i++){
		result.push( a[i] + b[i] );
	}
	return result;
}

function vecSub( a, b ){
	var result = [];
	for(var i = 0; i < a.length; i++){
		result.push( a[i] - b[i] );
	}
	return result;
}

function vecMul( a, b ){
	var result = [];
	for(var i = 0; i < a.length; i++){
		result.push( a[i] * b[i] );
	}
	return result;
}

function vecDiv( a, b ){
	var result = [];
	for(var i = 0; i < a.length; i++){
		result.push( a[i] / b[i] );
	}
	return result;
}

function vecMagnitudeSqr( v ){
	var s = 0;
	for(var i = 0; i < v.length; i++){
		s += v[i] * v[i];
	}
	return s;
}

function vecMagnitude( v ){
	return Math.sqrt(v);
}

function vecNormalize( v ){
	var r = v;
	var m = vecMagnitude(v);
	for(var i = 0; i < v.length; i++){
		r[i] /= m;
	}
	return r;
}

