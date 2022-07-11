/*var x, y;
var vx = 0, vy = 0;
var accel = 0.1;
var ms = 10;

var tl = 10

var trailx = [];
var traily = [];
*/

var FPS = 60;
var balls = [];

var MainMap;
var W = 1200;
var H = 1200;

function setup()
{
	
	createCanvas(W, H);
	background(51);
	rectMode(CENTER);
	angleMode(DEGREES);
	frameRate(FPS);
	
	MainMap = new Map();
	console.log(MainMap);
	
	balls.push(new Ball(LEFT_ARROW, 
					RIGHT_ARROW,
					createVector(random(0, width),random(0, height)), 
					createVector(0, maxSpeed).rotate(random(0,360)), 
					[0, 255, 0]));
					

	balls.push(new Ball(65, //A
					68, 	  //D
					createVector(random(0, width),random(0, height)), 
					createVector(0, maxSpeed).rotate(random(0,360)), 
					[255, 0, 0]));

	balls.push(new Ball(100, //num4
					102, 	   //num6
					createVector(random(0, width),random(0, height)), 
					createVector(0, maxSpeed).rotate(random(0,360)), 
					[0, 0, 255]));

	balls.push(new Ball(188, //<
					190, 	   //>
					createVector(random(0, width),random(0, height)), 
					createVector(0, maxSpeed).rotate(random(0,360)), 
					[255, 255, 255]));/**/
}

function draw()
{
	background(51);
/*
	let g1 = createGraphics(W, H);
	let g2 = createGraphics(W, H);
	
	//g1.background(51);
	g1.ellipse(W*3/4, H*3/4, 100, 100);
	
	g2.background(51);
	g2.ellipse(W/4, H/4, 100, 100);
	g2.clear();
	
	image(g1, 0, 0);
	image(g2, 0, 0);
	
	noLoop();
	*/
	
	if(frameCount  < 3*FPS)
	{
		var countDown = Math.ceil(3 - frameCount / FPS);
		
		textSize(80 - frameCount % FPS);
		fill(255);
		noStroke();
		
		text(countDown, width/2, height/2);
		return;
	}

	if(frameCount  < 4*FPS)
	{
		for (var i = 0; i < balls.length; i++) {
			balls[i].draw();
			line(balls[i].position.x, balls[i].position.y, balls[i].position.x + balls[i].speed.x*10, balls[i].position.y + balls[i].speed.y*10);
		}
		return;
	}

	for (var i = 0; i < balls.length; i++)
		MainMap.add(balls[i].update());
	
	for (var i = 0; i < balls.length; i++)
	{
		let c = MainMap.collision(balls[i]);
		
		if(c != undefined)
		{
			if(c == balls[i].colour)
				balls[i].score--;
			else
				for (var j = 0; j < balls.length; j++)
					if(balls[j].colour == c)
					{
						balls[j].score++;
						break;
					}
		}
	}
		
	
	
	MainMap.draw();

	for (var i = 0; i < balls.length; i++) {
		balls[i].draw();
		//balls[i].drawui();
	}

	/*fill(255);
	ellipse(200, 200, ballRadius, ballRadius);*/
	/*fill(255);
	noStroke();

	if(keyIsDown(LEFT_ARROW))
		vx-=accel;

	if(keyIsDown(RIGHT_ARROW))
		vx+=accel;

	if(keyIsDown(UP_ARROW))
		vy-=accel;

	if(keyIsDown(DOWN_ARROW))
		vy+=accel;

	vx = constrain(vx, -ms, ms);
	vy = constrain(vy, -ms, ms);

	for(var i = 0; i < tl-1; i++)
	{
		trailx[i] = trailx[i+1];
		traily[i] = traily[i+1];

		fill(255*i/(tl+1));
		ellipse(trailx[i], traily[i], 8, 8);
	}

	trailx[9] = x;
	traily[9] = y;

	fill(255*10/11);
	ellipse(trailx[9], traily[9], 8, 8);

	x+=vx;
	y+=vy;

	if(x < 0)
	{
		x = -x;
		vx = -vx;
	}
	
	if(y < 0)
	{
		y = -y;
		vy = -vy;
	}

	if(x > width)
	{
		x = -x + 2*width;
		vx = -vx;
	}

	if(y > height)
	{
		y = -y + 2*height;
		vy = -vy;
	}	
	
	fill(255);
	ellipse(x, y, 8, 8);*/
}

function mousePressed()
{
	//MainMap.add(new Trail(createVector(mouseX, mouseY), [255, 0, 0]))
}