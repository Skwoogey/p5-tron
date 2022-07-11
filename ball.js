var maxSpeed = 5;
var ballRadius = 8;
var ballsToIgnore = 2*Math.ceil(ballRadius/maxSpeed);
var ballDiametr = ballRadius*2;
var angleSpeed = 8;

function Ball(nleft, nright, nposition, nspeed, ncolour)
{
	this.lost = false;
	this.lostTime;
	this.beginTime = 0;
	this.score = 0;
	this.graphics = createGraphics(W, H);

	this.speed = nspeed;
	this.position = nposition;
	this.colour = ncolour;

	this.left = nleft;
	this.right = nright;

	this.update = function()
	{
		if(this.lost)
		{
			if(frameCount - this.lostTime > FPS)
			{
				this.position = createVector(random(0, width),random(0, height));
				this.speed.rotate(random(0, 360));
				
				this.beginTime = frameCount;
				this.lost = false;
				return this.colour;
			}
			else
			{
				this.drawui();
				return;
			}
		}
		
		if(frameCount - this.beginTime < FPS)
		{
			this.draw();
			line(this.position.x, this.position.y, this.position.x + this.speed.x*10, this.position.y + this.speed.y*10);
			return;
		}

		let tr = new Trail(createVector(this.position.x, this.position.y), this.colour);

		if(keyIsDown(this.left))
			this.speed.rotate(-angleSpeed)

		if(keyIsDown(this.right))
			this.speed.rotate(angleSpeed)

		this.position.add(this.speed);

		if(this.position.x < 0)
		{
			this.position.x = -this.position.x;
			this.speed.x = -this.speed.x;
		}
		
		if(this.position.y < 0)
		{
			this.position.y = -this.position.y;
			this.speed.y = -this.speed.y;
		}

		if(this.position.x > width)
		{
			this.position.x = -this.position.x + 2*width;
			this.speed.x = -this.speed.x;
		}

		if(this.position.y > height)
		{
			this.position.y = -this.position.y + 2*height;
			this.speed.y = -this.speed.y;
		}
		
		return tr;
	}

	this.collision = function(Sball)
	{
		if(this == Sball || Sball.lost)
			return;

		for(var i = 0; i < this.path.length; i++)
		{
			if(this.path[i].dist(Sball.position) < ballRadius)
			{
				Sball.lost = true;
				Sball.lostTime = frameCount;
				
				this.score++;
				return;
			}
		}
	}

	this.draw = function()
	{
		stroke(this.colour)
		fill(255);
		
		ellipse(this.position.x, this.position.y, ballRadius, ballRadius);
		
		
		if(!this.lost)
		{
			fill(this.colour[0], this.colour[1], this.colour[2]);
			textSize(30);
			stroke(255);
			text(this.score, this.position.x - 50, this.position.y);
		}
			
	}

	this.drawui = function()
	{
		if(this.lost && (frameCount - this.lostTime < 30))
		{
			textSize(50);
			stroke(0, map(frameCount - this.lostTime, 0, 30, 255, 0));
			fill(this.colour[0], this.colour[1], this.colour[2], map(frameCount - this.lostTime, 0, 30, 255, 0));
			text("ded", this.position.x - 50, this.position.y - frameCount + this.lostTime);
		}
	}
}