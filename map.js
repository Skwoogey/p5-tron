//var ballsToIgnore = 2*Math.ceil(ballRadius/maxSpeed);

function Trail(npos, ncolour)
{
	this.position = npos;
	this.colour = ncolour;
	this.frame = frameCount;

	this.collision = function(Sball)
	{
		if(this.position.dist(Sball.position) < ballRadius)
		{
			if(this.colour != Sball.colour || frameCount - this.frame > ballsToIgnore)
			{
				Sball.lost = true;
				Sball.lostTime = frameCount;
				
				return true;
			}	
			
		}
		
		return false;
	}

	this.draw = function()
	{
		fill(this.colour);
		stroke(this.colour);
		ellipse(this.position.x, this.position.y, ballRadius, ballRadius);
	}
}

function Map()
{
	this.map = [];
	console.log(Math.ceil(width/ballDiametr));
	console.log(Math.ceil(height/ballDiametr));
	for (var i = 0; i < Math.ceil(width/ballDiametr) + 1; i++)
	{
		this.map.push([]);
		for (var j = 0; j < Math.ceil(height/ballDiametr) + 1; j++) {
			this.map[i][j] = [];
		}
	}
	
	this.clear = function(colour)
	{
		for (var i = 0; i < this.map.length; i++)
		{
			for (var j = 0; j < this.map[i].length; j++)
			{
				for (var n = 0; n < this.map[i][j].length; n++)
				{
					if(this.map[i][j][n].colour == colour)
					{
						this.map[i][j].splice(n, 1);
						n--;
					}
				}
			}
		}
	}

	this.add = function(tr)
	{
		if(tr != undefined)
		{
			if(tr.length == 3)
			{
				this.clear(tr);
				return;
			}
			
			this.map[Math.floor(tr.position.x / ballDiametr)][Math.floor(tr.position.y / ballDiametr)].push(tr);
		}
			
	}

	this.collision = function(Sball)
	{
		if(Sball.lost)
			return;
		
		var x = Math.floor(Sball.position.x / ballDiametr);
		var y = Math.floor(Sball.position.y / ballDiametr);
		//console.log(x, y);
		
		for (var n = 0; n < this.map[x][y].length; n++)
		{
			if(this.map[x][y][n].collision(Sball))
			{
				let c = this.map[x][y][n].colour;
				this.clear(c);
				return c;
			}
		}

		/*
		for (var i = x-1; i <= x+1; i++)
		{
			for (var j = y-1; j <= y+1; j++)
			{
				if(this.map[i] != undefined && this.map[i][j] != undefined)
				for (var n = 0; n < this.map[i][j].length; n++)
				{
					if(this.map[i][j][n].collision(Sball))
					{
						let c = this.map[i][j][n].colour;
						this.clear(c);
						return c;
					}
				}
			}
		}
		*/
	}

	this.draw = function()
	{
		for (var i = 0; i < this.map.length; i++)
		{
			for (var j = 0; j < this.map[i].length; j++)
			{
				for (var n = 0; n < this.map[i][j].length; n++)
				{
					this.map[i][j][n].draw();
				}
			}
		}
	}
}