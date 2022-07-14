const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gun,gunA;
var diamond, diamondA;
var zombie1, zombie2, zombie3;
var zombie1A, zombie2A, zombie3A, ZombieDead;
var lazerBeam1, lazerBeam2;
var bullet, bulletImg;

var bulletGroup;
var zombie1Group, zombie2Group, zombie3Group;

var deadZombie1, deadZombie2, deadZombie3;

var score = 0;
var gameState = 1;
var life = 3;



function preload(){
backgroundImg = loadImage("Assets/Smokebackground.gif");
zombie1A = loadAnimation("assets/Zombie1.gif","assets/Zombie2.gif","assets/Zombie3.gif");
zombie2A = loadAnimation("assets/Zombie4.gif","assets/Zombie5.gif","assets/Zombie6.gif");
zombie3A = loadAnimation("assets/Zombie7.gif","assets/Zombie8.gif","assets/Zombie9.gif");
gunA = loadImage("assets/Gun.png");
diamondA = loadImage("assets/Diamond.png.png");
bulletImg = loadImage("assets/bullet.png");
ZombieDead = loadImage("assets/zombieDead.gif");

}

function setup(){
 createCanvas (windowWidth,windowHeight);

 gun = createSprite(70,200,20,20);
 gun.addImage(gunA);
 gun.scale = 0.5;
 

 diamond = createSprite(200,200,20,20);
 diamond.addImage(diamondA);
 diamond.scale = 0.3;

 lazerBeam1 = createSprite(200,100,10,150);
 
 lazerBeam2 = createSprite(200,400,10,350);

bulletGroup = createGroup();
zombie1Group = createGroup();
zombie2Group = createGroup();
zombie3Group = createGroup();

heading = createElement("h1");
scoreboard = createElement("h1");

}


function draw(){
    background(189);
    image(backgroundImg, 0, 0, width, height);

    heading.html("Life:"+ life);
    heading.style('colour:red');
    heading.position(150,20);

    scoreboard.html("Score:"+ score);
    scoreboard.style('colour:red')
    scoreboard.position(350,20);

  /*  if (keyDown("DOWN_ARROW")){

        gun.velocityY = 3;
        gun.y = mouseY;
    }*/

    if (gameState===1){

        gun.y = mouseY;

        if (keyDown("space")){
            shootBullet()

        if (zombie1Group.collide(bulletGroup)){
            zombie1Collision()
        }

        if (zombie2Group.collide(bulletGroup)){
            zombie2Collision()
        }

        if (zombie3Group.collide(bulletGroup)){
            zombie3Collision()
        }

        if (zombie1Group.collide(lazerBeam1)||zombie1Group.collide(lazerBeam2)||zombie1Group.collide(diamond)){
            zombie1Victory()

        }

        if (zombie2Group.collide(lazerBeam1)||zombie2Group.collide(lazerBeam2)||zombie2Group.collide(diamond)){

            zombie2Victory()
        }

       

        if (zombie3Group.collide(lazerBeam1)||zombie3Group.collide(lazerBeam2)||zombie3Group.collide(diamond)){

            zombie3Victory()
        }

        

        }

    }

    

    zombie1Collision()
    zombie2Collision()
    zombie3Collision()  
  
    zombies()

    gameOver()
    win()

    drawSprites();
}

function zombies(){

    if (frameCount % 120 === 0){

        zombie1 = createSprite(windowWidth-60,200,20,20);
        zombie1.y = Math.round(random(10,500));
        zombie1.addAnimation("running",zombie1A);
        zombie1.velocityX = -2;
        zombie1Group.add(zombie1);

    }

    if (frameCount % 160 === 0){

        zombie2 = createSprite(windowWidth-60,200,20,20);
        zombie2.y = Math.round(random(10,500));
        zombie2.addAnimation("running",zombie2A);
        zombie2.velocityX = -4;
        zombie2Group.add(zombie2);
    }

    if (frameCount % 200 === 0){

        zombie3 = createSprite(windowWidth-60,200,20,20);
        zombie3.y = Math.round(random(10,500));
        zombie3.addAnimation("running",zombie3A);
        zombie3.velocityX = -6;
        zombie3Group.add(zombie3);
    }

    



}

function shootBullet(){

    bullet = createSprite(70,width/2,20,20);
    bullet.y = gun.y-20;
    bullet.addImage(bulletImg);
    bullet.scale = 0.12;
    bullet.velocityX = 25;
    bulletGroup.add(bullet);


}

/*function Dead(){

    if (bulletGroup.isTouching(zombie1Group)){

        score = score + 5;
        zombie1.changeAnimation("running",ZombieDead);
        zombie1.remove();
        bullet.remove();
    }

     if (bulletGroup.isTouching(zombie2Group)){

        score = score + 10;
        zombie2.changeAnimation("running",ZombieDead);
        zombie2.remove();
        bullet.remove();
    }

     if (bulletGroup.isTouching(zombie3Group)){

        score = score + 15;
        zombie3.changeAnimation("running",ZombieDead);
        zombie3.remove();
        bullet.remove();
    }*/

    

     

    
    
//}

/*function zombieDead(){

    if (bulletGroup.collide(zombie1Group)){

        score = score + 5;
        zombie1.velocityX = 0;
        zombie1.changeAnimation("running",ZombieDead);
        zombie1.remove() 
    }
}*/

function zombie1Collision() {

if (zombie1Group.isTouching(bulletGroup)){

    deadZombie1 = createSprite(bullet.x,bullet.y,50,50);
    deadZombie1.addImage(ZombieDead);
    deadZombie1.scale = 1;
    deadZombie1.life = 40;
    bulletGroup.destroyEach();
    zombie1Group.destroyEach();
    score = score + 5;

}



}

function zombie2Collision() {

    if(zombie2Group.isTouching(bulletGroup)){

        deadZombie2 = createSprite(bullet.x,bullet.y,50,50);
        deadZombie2.addImage(ZombieDead);
        deadZombie2.scale = 1;
        deadZombie2.life = 40;
        bulletGroup.destroyEach();
        zombie2Group.destroyEach();
        score = score + 10;

    }

   
    
    }
    
    function zombie3Collision() {

        if(zombie3Group.isTouching(bulletGroup)){
    
            deadZombie3 = createSprite(bullet.x,bullet.y,50,50);
            deadZombie3.addImage(ZombieDead);
            deadZombie3.scale = 1;
            deadZombie3.life = 40;
            bulletGroup.destroyEach();
            zombie3Group.destroyEach();
            score = score + 15;
    
        }
    
       
        
        }

   function gameOver(){

    if (life === 0){
        gameState = 2;

        swal({

            title: `Game Over`,
        //text: "Oops you lost the game....!!!",
        text: "Your Score is " + score

        })


    }


   }     

   function win(){

    if (score === 250){

        swal({
            title: `Level Complete!`,
            //text: "You Won! The diamond is safe now!",
            text: "Your Score is " + score

        })
       


    }

   }

    function zombie1Victory(){

    if (zombie1Group.isTouching(lazerBeam1)||zombie1Group.isTouching(lazerBeam2)||zombie1Group.isTouching(diamond)){

        zombie1Group.destroyEach()
        life = life - 1
    }
   }

   function zombie2Victory(){

    if (zombie2Group.isTouching(lazerBeam1)||zombie2Group.isTouching(lazerBeam2)||zombie2Group.isTouching(diamond)){

        zombie2Group.destroyEach()
        life = life - 1
    }
   }

   function zombie3Victory(){

    if (zombie3Group.isTouching(lazerBeam1)||zombie3Group.isTouching(lazerBeam2)||zombie3Group.isTouching(diamond)){

        zombie3Group.destroyEach()
        life = life - 1
    }
   }
