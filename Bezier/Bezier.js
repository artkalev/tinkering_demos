// Bezier implementation based on function given here:
// https://en.wikipedia.org/wiki/B%C3%A9zier_curve

// Bezier interpolation through 3 values at 't'
function QuadraticBezier( p0, p1, p2, t ){
	return (1-t) * ((1-t)*p0 + t*p1) + t*((1-t)*p1 + t * p2);
}

// Bezier interpolation through 4 values at 't'
// essentially Combines 2 QuadraticBeziers
function CubicBezier( p0, p1, p2, p3, t ){
	return (1-t)*(1-t)*(1-t)*p0 + 3*(1-t)*(1-t)*t*p1 + 3*(1-t)*t*t*p2 + t*t*t*p3;
}