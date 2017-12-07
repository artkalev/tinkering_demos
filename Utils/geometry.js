// needs :
// 	Utils/vectormath.js
//	Bezier/bezier.js

function ControlPoint( position, handleIn, handleOut ){
	this.position = position || new Vec2(0,0);
	this.handleIn = handleIn || new Vec2(-1,0);
	this.handleOut = handleOut || new Vec2(1,0);
};

function BezierCurve2D(){
	this.controlPoints = [ 
		new ControlPoint( new Vec2(-1,0), new Vec2(0, 1), new Vec2(0,-1) ),
		new ControlPoint( new Vec2( 1,0), new Vec2(0,-1), new Vec2(0, 1) )
	];
	this.bakeDensity = 64;
	this.bakedPoints = [];
};
BezierCurve2D.prototype.Bake = function(){
	// todo
	// calculate and store interpolated points
	// between control points
};

function BezierPath2D(){
	this.controlPoints = [
		new Vec2(-1,0), new Vec2( -1, 1),
		new Vec2( 1,0), new Vec2(  1,-1)
	];
	this.bakeDensity = 64;
	this.bakedPoints = [];
};
BezierCurve2D.prototype.Bake = function(){
	// todo
	// calculate and store interpolated points
	// between control points
};