// basic 2D scenegraph and rendering engine
// for 2D canvas context
// this will be built up as needed for my demos on tinkering.ee

// universal math funtcions
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

// universal vector math classobjects and functions needed for 2D computations
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

var Mat3 = function(){
	this.data = new Float32Array([
		1,0,0, 0,1,0, 0,0,1
	]);
};

// coordinate space is homogeneous like in OpenGL
// final pixel coordinates will be computed from
// viewMatrix passed to Drawable.Draw() from Renderer

var twodee = {
};

twodee.Transform = function(){
	this.position = new Vec2(0,0);
	this.rotation = 0;
	this.scale = new Vec2(1,1);
	this.parent = null;
	this.children = [];
	this.localToWorld = new Mat3();
	this.matricesNeedUpdate = true;
};
twodee.Transform.prototype.SetParent = function( parent ){
	this.parent = parent;
	this.parent.children.push( this );
};
twodee.Transform.prototype.Update = function(){};
twodee.Transform.prototype.UpdateMatrices = function(){
	// todo
};

twodee.Renderable = function(){
	this.transform = new twodee.Transform();
};
twodee.Renderable.prototype.Update = function(){
	
};
twodee.Renderable.prototype.Draw = function( ctx ){
	// all drawing of this object using ctx and transform
};

twodee.Scene = function(){
	this.objects = [];
};
twodee.Scene.prototype.Add = function( obj ){
	this.objects.push( obj );
};
twodee.Scene.prototype.Update = function(){
	for(var i = 0; i < this.objects.length; i++){
		this.objects[i].Update();
	}
};

twodee.Renderer = function( canvas ){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.fillScreen = true;
	this.view = {
		position : new Vec2(0,0),
		scale : new Vec2(1,1),
		matrix : new Mat3()
	};
	this.clearColor = "grey";
	
	var self = this;
	window.addEventListener("resize", function(){
		if(self.fillScreen == true){
			self.SetSize(
				window.innerWidth,
				window.innerHeight
			);
		}
	});
}
twodee.Renderer.prototype.SetSize = function(w,h){
	this.canvas.width = w;
	this.canvas.height = h;
};
twodee.Renderer.prototype.Render = function( scene ){
	this.ctx.beginPath();
	this.ctx.rect( 0,0,this.canvas.width, this.canvas.height );
	this.ctx.fillStyle = this.clearColor;
	this.ctx.fill();
	
	for(var i = 0; i < scene.objects.length; i++){
		scene.objects[i].Draw();
	}
	
};

// RENDERABLES
twodee.BezierCurve = function(){
	this.controlPoints = [
		new Vec2(-1, 0), new Vec2(-1, 1),
		new Vec2( 1, 1), new Vec2( 1, 0)
	];
	this.bakedPoints = [];
	this.needsBake = true;
};
twodee.BezierCurve.prototype = Object.create( twodee.Renderable.prototype );
twodee.BezierCurve.prototype.Bake = function(){
	this.bakedPoints = [];
	this.needsBake = false;
};
twodee.BezierCurve.prototype.constructor = twodee.BezierCurve;