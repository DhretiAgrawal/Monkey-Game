//Global Variables
var backgroundimage,background1,score=0;
var monkey,monkey_running;
var ground;
var bananaimage,bananagroup,obstaclegroup,obstacleimage;

function preload(){
  
  backgroundimage=loadImage("jungle2.jpg");
 
  monkey_running=loadAnimation("Monkey_03.png", "Monkey_02.png", "Monkey_01.png", "Monkey_10.png", "Monkey_09.png", "Monkey_08.png", "Monkey_07.png", "Monkey_06.png","Monkey_05.png","Monkey_04.png");
             
  bananaimage=loadImage("Banana.png");
  
  obstacleimage=loadImage("stone.png");
  
}

function setup() {
  
  createCanvas(600,300);
 
  background1=createSprite(200,200,10,10);
  background1.addImage("background",backgroundimage);
  background1.velocityX=-5;
  background1.x=background1.width/2;
  background1.scale=1.2;
  
  monkey=createSprite(50,250,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
 
  ground=createSprite(50,300,800,10);
  ground.visible=false;
  
  bananagroup = new Group();
  obstaclegroup = new Group();
  
}

function draw(){
   
   background(255);

   switch(score){
    case 10:monkey.scale=0.12;
            break;
    case 20:monkey.scale=0.14;
            break;
    case 30:monkey.scale=0.16;
            break;
    case 40:monkey.scale=0.18;
            break;
    default:break;               
  }
  
  if (background1.x<0){
     background1.x=background1.width/2;
   }

   if(bananagroup.isTouching(monkey)){
     bananagroup.destroyEach();
     score=score+2;
   }

   if(monkey.isTouching(obstaclegroup)){ 
      obstaclegroup.destroyEach();
      monkey.scale=0.1;
      score=score-10;
  }
  
 
  if(keyDown("space")){
    monkey.velocityY=-7; 
  }
  
  if(frameCount%80===0){
    fruit();
  }
  
  if(frameCount%300===0){
    obstacles();
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
   drawSprites();
  
   text("Score: "+ score, 300,50);
  
}

function fruit(){
  var banana=createSprite(600,250,10,10);
  banana.y=random(120,200);
  banana.addImage(bananaimage);
  banana.scale=0.05;
  banana.velocityX=-7;
  banana.lifetime=100;
  bananagroup.add(banana);
}  

function obstacles(){
  var obstacle=createSprite(600,280,10,10);
  obstacle.addImage(obstacleimage);
  obstacle.scale=0.09;
  obstacle.velocityX=-7;
  obstacle.lifetime=100;
  obstaclegroup.add(obstacle);
}