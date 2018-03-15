//setup canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set the starting point 
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColor = "green";
var paddleColor = "black";
//define the paddleon the canvas 
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
//control variables 
var rightPressed = false;
var leftPressed = false;
//Bricks variables 
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//variable for the score 
var score = 0;
//game sounds 
var WINNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAME_SOUND = new Audio('sounds/gameover.wav');
//variable for the lives
var lives = 3;
//hold bricks in a two dimenional array 
var bricks = [];
for (c=0; c<brickColumnCount; c++)
{
	bricks[c] = [];

	for (r=0; r<brickRowCount; r++)
	{
		bricks[c][r] = { x: 0, y: 0, status: 1};
	}
}

// this function draws the bricks 
function drawBricks()
{
	for(c=0; c<brickColumnCount; c++)
	{
		for(r=0; r<brickRowCount; r++)
		{
			if(bricks[c][r].status == 1)
		
		{
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
		}
	}
}
//this function allows us to draw the ball on the canvas 
function drawBall() 
{
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}

//drawing the paddle function 
function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = paddleColor;
	ctx.fill();
	ctx.closePath();
	
}

//function to draw on the canvas 
function draw()	{
	//clear the canvas 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//draws the ball
	drawBall();
	//draws the paddle 
	drawPaddle();
	//collisiondetectionetection
	collisionDetection();
	//creates and updates the score display
	drawScore();
	//draws the bricks
	drawBricks();
	//draw lives
	
	
	if (rightPressed && paddleX < canvas.width-paddleWidth) 
	{
		paddleX += 7;
	}
	else if (leftPressed && paddleX > 0)
	{
		paddleX -= 7;
	}
	//bouncing the ball off 3 walls - if it drops off bottom - Game over
	x+= dx;
	y+= dy;
	
	if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) 
	{
		dx =-dx;
		ballColor = "yellow";
	}
	if (y + dy < ballRadius) 
	{
		dy =-dy;
		ballColor = "black";
	}
	else if (y + dy > canvas.height-ballRadius)
	{
		if(x > paddleX && x < paddleX + paddleWidth)
		{
			dy = -dy;
		}
		else 
		{
			lives--;
			if(!lives)
			{
				GAME_SOUND.play();
				alert("GAME OVER");
				document.location.reload();
			}
			else
			{
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth/2);
			}
		}
	}

	
}
	



//monitors documents for events that will effect the movement of the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//define functions that will handle the keydown or keyup events 
function keyDownHandler(e)
{
	if (e.keyCode == 39)
	{
		rightPressed = true;
	}
	else if (e.keyCode == 37)
	{
		leftPressed = true;
	}
}

function keyUpHandler(e)
{
	if (e.keyCode == 39)
	{
		rightPressed = false;
	}
	else if (e.keyCode == 37)
	{
		leftPressed = false;
	}
}
//this function detects when the ball hits the bricks 
function collisionDetection()
{
	for(c=0; c<brickColumnCount; c++)
	{
		for(r=0; r<brickRowCount; r++)
		{
			var b = bricks[c][r];
			if(b.status == 1)
			{
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight)
			
			{
				dy = -dy;
				b.status = 0;
				score++;
				SCORE_SOUND.play();
				if(score == brickRowCount*brickColumnCount)
				if(score == brickRowCount*brickColumnCount)
				{
					WINNING_SOUND.play();
					alert("YOU WIN, CONGRATULATIONS!");
					document.location.reload();
				}
				
				
					
				
			}
			}
		}
	}
}
//this functions creates and updates the score display
function drawScore()
{
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;
}

//this function draws the lives 









setInterval(draw,10);