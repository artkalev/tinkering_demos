function BezierInterpolate( p0, p1, p2, p3, t ){
	return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * ((1 - t) * (1 - t)) * t * p1 + 3 * (1 - t) * (t * t) * p2 + (t * t * t) * p3;
}