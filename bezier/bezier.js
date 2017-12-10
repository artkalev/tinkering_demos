/////////////////////////////////////////
//// Bezier interpolation functions  ////
/////////////////////////////////////////
//   Kalev Mölder artkalev@gmail.com   //
/////////////////////////////////////////

// linear interpolation function.
// this is simply here to aid visualisation
// and develop better understanding for whats going on below
//
//                ---- P1
//            --T-
//        ----
// P0 ----
//
function LinearInterpolate( p0,p1, t ){
	return (1-t)*p0 + t*p1;
}

// interpolate value through 3 points at "t"
//
//          P1
//        -  -  -
//     -           T
//    -             -
// P0 -             - P1
//
function QuadraticBezierInterpolate(p0,p1,p2,t){
	return (1 - t) * ((1 - t) * p0 + t * p1) + t * ((1 - t) * p1 + t * p2);
}

// interpolate value through 4 points at "t"
// this is essentially 2 quadratic interpolations combined
//
//    P1            P2
//            -
//       -         -
//     -             T
//    -               -
// P0 -               - P3
//
function CubicBezierInterpolate(p0,p1,p2,p3,t){
	return (1-t)*(1-t)*(1-t)*p0 + 3*(1-t)*(1-t)*t*p1 + 3*(1-t)*t*t*p2 + t*t*t*p3;
}