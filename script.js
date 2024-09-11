let mario=document.getElementById("mario");
let pipe=document.getElementById("pipe");
let mushroom=document.getElementById("mushroom");
let backgroundMusic=document.getElementById("backgroundMusic");
let jumpMusic=document.getElementById("jumpMusic");
let startBtn=document.getElementById("startBtn");
let gameContainer=document.getElementById("gameContainer");
let score=document.getElementById("score");
let rules=document.getElementById("rules");



startBtn.addEventListener("click",
  function(){
    startBtn.style.display="none";
    gameContainer.style.display="block";
    backgroundMusic.play();
    rules.style.display="none"
    startGame();
  }
);


function startGame()
{
  let marioJumping=false;
  let marioMovingRight=false;
  let marioMovingLeft=false;
  let obstacles=[pipe, mushroom];
  let gameScore=0;
  let gameContainerWidth=gameContainer.offsetWidth;
  let marioPosition=50;

  function jump()
  {
    if(!marioJumping)
    {
      marioJumping=true;
      
      jumpMusic.play();
      let startPos=32;
      let endPos=200;
      let speed=5;
      let startInterval=setInterval(
        function(){

          if(startPos<endPos)
          {
          startPos+=speed;
          mario.style.bottom=startPos+"px";
          }
          else 
          {
            clearInterval(startInterval);
            fall();

          }


        }
      ,20);
    }
  }


  function fall()
  {
    if(marioJumping)
    {
      let startPos=200;
      let endPos=32;
      
      let endInterval=setInterval(
        function()
        {
          if(startPos>endPos)
          {
            startPos-=10;
            
            mario.style.bottom=startPos+"px";

          }
          else 
          {
            clearInterval(endInterval);
            marioJumping=false;
          }
        }
      ,10);
    }
   

  }



  function moveMario(direction)
  {
    let proposedPosition=marioPosition+(direction==="right"?20:-20);
    let maxMarioPosition=gameContainerWidth-mario.offsetWidth;
    if(proposedPosition>=0&&proposedPosition<=maxMarioPosition)
    {
      marioPosition=proposedPosition;
      mario.style.left=marioPosition+
      "px";
      if(direction=== "right")
      {
        mario.classList.remove("flipped");
      }
      else{
        mario.classList.add("flipped");
      }

    }
  }

  function checkCollision(obstaclePos)
  {
    return obstaclePos<marioPosition+90&&obstaclePos>marioPosition;
  }


  function moveObstacle(obstacle)
  {

    let obstaclePos=gameContainerWidth;
    obstacle.style.left=obstaclePos+"px";
    let obstacleTimer = setInterval(function () {
      if(obstaclePos<-60)
      {
        obstacle.style.display="none";
        obstaclePos=gameContainerWidth;
        setTimeout(()=>
        {
          obstacle.style.display="block";
        
        },100)
        gameScore++;
        score.innerText="Score: "+gameScore;
      }
      else if (checkCollision(obstaclePos)&& marioJumping)
      {
        obstaclePos-=10;
      }
      else if(checkCollision(obstaclePos)&& !marioJumping)
      {
        clearInterval(obstacleTimer);
        score.innerText = "Game Over! Score: " + gameScore;
        
        
        obstacles.forEach(function (obstacle) {
        obstacle.style.animationPlayState = "paused";
      });
      if (confirm("Game Over! score is "+ gameScore))
         {
          
                location.reload();
              } else {
                location.reload();
              }
      } 
      else {
              obstaclePos -= 10; // increase speed
            }
      
            obstacle.style.left = obstaclePos + "px";
          }, Math.random() * (200 - 50) + 50);
  }








  window.addEventListener("keydown", function(event)
{
  switch(event.key)
  {
    case" ":
    jump();
    break;
    case "ArrowRight":
      marioMovingRight=true;
      break;
      case "ArrowLeft":
      marioMovingLeft=true;
      break;
  }
});



window.addEventListener("keyup", function(event)
{
  switch(event.key)
  {
    
    case "ArrowRight":
      marioMovingRight=false;
      break;
      case "ArrowLeft":
      marioMovingLeft=false;
      break;
  }
});

setInterval(function () {
      if (marioMovingRight) {
        moveMario("right");
      } else if (marioMovingLeft) {
        moveMario("left");
      }
    }, 100);


    obstacles.forEach(function (obstacle, index) {
          setTimeout(function () {
            obstacle.style.display = "block";
            moveObstacle(obstacle);
          }, index * 7000); // 2000 ms (2 seconds) delay before each obstacle starts moving
        });
        

}










