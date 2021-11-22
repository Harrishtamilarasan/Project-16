//Game States
var PLAY=1;
var WIN=0;
var END=0;
var gameState=1;

var knife,fruit ,bomb,fruitGroup,bombGroup, score,r,randomFruit,scene, position,gameOver,gameWin;
var knifeImage,bombImage,fruit1,fruit2,fruit3,fruit4,gameOverImage,gameWinImage,sceneImg;
var gameOverSound,gameWinSound ,knifeSwoosh;

function preload(){
  
  knifeImage = loadImage("Blade.png");
  bombImage = loadAnimation("bomb.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  gameWinImage= loadImage ("you win.png")

  gameOverSound = loadSound("gameover2.wav")
  gameWinSound = loadSound("game win.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  sceneImg = loadImage("background.jpg")
}



function setup() {
  createCanvas(600, 600);
  
 

  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.3
   //set collider for sword
  knife.debug = true
   knife.setCollider("circle",0,0,90);

   gameOver = createSprite(250,280);
   gameOver.addImage(gameOverImage);
   gameOver.scale = 0.3;
   gameOver.visible = false;

   gameWin = createSprite(270,280)
   gameWin.addImage(gameWinImage)
   gameWin.scale = 0.5
   gameWin.visible = false

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  bombGroup=createGroup();
  
}

function draw() {
  background("darkred");

  

 
  
  if(gameState===PLAY){
    


    //Call fruits and Monster function
    fruits();
    Bomb();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    knife.visible = true;

    gameOver.visible=false;
    gameWin.visible=false;
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
       knifeSwooshSound.play();
      
       score=score+2;
      

    }
    else
    {
      // Go to end state if sword touching enemy
      if(bombGroup.isTouching(knife)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        bombGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        bombGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.visible = false;

       
        gameOver.visible = true;
       gameWin.visible= false;
        score = 0
      }
    }
  }
 
  if (keyDown("R")){
    gameState = PLAY
  }

  if (score == 20 ){
    gameState= WIN;


    fruitGroup.destroyEach();
    bombGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);

    knife.visible = false
    gameWin.visible = true

  

  }

 

 
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Bomb(){
  if(World.frameCount%200===0){
    bomb=createSprite(400,200,20,20);
    bomb.x =0;
    bomb.addAnimation("moving", bombImage);
    bomb.scale = 0.2
    bomb.y=Math.round(random(100,550));
    bomb.velocityX=(8+(score/10));
    bomb.setLifetime=50;
    
    bombGroup.add(bomb);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //Increase the velocity of fruit after score 4 

       fruit.velocityX= (7+(score/4));
      // fruit.velocityY= (7+(score));
      // fruit.velocity= (7+(score/4));
      // fruit.velocityX= (7);
     
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}