// basic 2D scenegraph and rendering engine
// for 2D canvas context
// this will be built up as needed for my demos on tinkering.ee

///////////////////////////////////
////  UNIVERSAL MATH FUNCTIONS ////
///////////////////////////////////

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

////////////////////////
//// 2D VECTOR MATH ////
////////////////////////

class Vec2{
	constructor(x,y){
		this.data = new Float32Array([x,y]);
	}

    Add( other ){
		this.data[0] += other.data[0];
		this.data[1] += other.data[1];
		return this;
	}

	Sub( other ){
		this.data[0] -= other.data[0];
		this.data[1] -= other.data[1];
		return this;
	}

	Mul( other ){
		this.data[0] *= other.data[0];
		this.data[1] *= other.data[1];
		return this;
	}
	Div( other ){
		this.data[0] /= other.data[0];
		this.data[1] /= other.data[1];
		return this;
	}
	AddScalar( other ){
		this.data[0] += other;
		this.data[1] += other;
		return this;
	}
	SubScalar( other ){
		this.data[0] -= other;
		this.data[1] -= other;
		return this;
	}
	MulScalar( other ){
		this.data[0] *= other;
		this.data[1] *= other;
		return this;
	}
	DivScalar( other ){
		this.data[0] /= other;
		this.data[1] /= other;
		return this;
	}
	MagnitudeSqr(){
		return this.data[0]*this.data[0] + this.data[1]*this.data[1];
	}
	Magnitude(){
		return Math.sqrt( this.MagnitudeSqr() );
	}
	Normalize( other ){
		var m = this.Magnitude();
		this.data[0] /= m;
		this.data[1] /= m;
		return this;
	}
}

class Mat3{
	constructor(){
		this.data = new Float32Array([
			1,0,0, 0,1,0, 0,0,1
		]);
	}
}

///////////////////////
//// TWODEE ENGINE ////
///////////////////////

var twodee = {};

twodee.Transform = class Transform{
	constructor(){
		this.position = new Vec2(0,0);
		this.rotation = 0;
		this.scale = new Vec2(1,1);
		this.parent = null;
		this.children = [];
		this.localToWorld = new Mat3();
		this.matricesNeedUpdate = true;
	}
	SetParent( parent ){
		this.parent = parent;
		this.parent.children.push( this );
	}
	Update(){}
	UpdateMatrices(){
		// todo
	}
};

twodee.Renderable = class Renderable{
	constructor(){
		this.transform = new twodee.Transform();
	}
	Update(){}
	Draw( ctx ){
		
	}
};

twodee.Scene = class Scene{
	constructor(){
		this.objects = [];
	}
	Add(obj){
		this.objects.push(obj);
	}
	Update(){
		for(var i = 0; i < this.objects.length; i++){
			this.objects[i].Update();
		}
	}
};

twodee.Renderer = class Renderer{
	constructor(){
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
	SetSize(w,h){
		this.canvas.width = w;
		this.canvas.height = h;
	}
	Render( scene ){
		this.ctx.beginPath();
		this.ctx.rect( 0,0,this.canvas.width, this.canvas.height );
		this.ctx.fillStyle = this.clearColor;
		this.ctx.fill();
		
		for(var i = 0; i < scene.objects.length; i++){
			scene.objects[i].Draw();
		}

	}
};

twodee.BezierCurve = class BezierCurve extends twodee.Renderable{
	constructor(){
		super();
		this.controlPoints = [
			new Vec2(-1, 0), new Vec2(-1, 1),
			new Vec2( 1, 1), new Vec2( 1, 0)
		];
		this.bakedPoints = [];
		this.needsBake = true;
	}
};