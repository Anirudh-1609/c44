const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var gameState="onSling"
var bgimg,score=0;
var enemyarr=[];
    function preload() {
  //  backgroundImg = loadImage("sprites/bacg.png");
  getbackgroundImage();
}

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(displayWidth/2,height,displayWidth,20);
   // platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    arrow1= new Bird(displayWidth/20,displayHeight/2);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(arrow1.body,{x:200, y:50});
}

function draw(){
    if (bgimg)
    background(bgimg);
    fill(255);
    text("score"+score,width-300,50);
    Engine.update(engine);
    //strokeWeight(4);
    
    ground.display();
   
   spawnEnemies();
    


    arrow1.display();
    //platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
if(gameState=== "onSling")
    Matter.Body.setPosition(arrow1.body, {x: mouseX , y: mouseY});
    
}


function mouseReleased(){
    gameState="launched";
    slingshot.fly();
}

function keyPressed(){
    if(keyCode === 32 && arrow1.body.speed<1){
        gameState="onSling";
        slingshot.attach(arrow1.body);
        bird.trajectory=[];
        Matter.Body.setPosition(arrow1.body, {x: 200 , y: 50});

       }
       if(keyCode === 32 &&(arrow1.body.position.x<0 || arrow1.body.position.x>1200 || arrow1.body.position.y<0)){
        gameState="onSling";
        slingshot.attach(arrow1.body);
        bird.trajectory=[];
        Matter.Body.setPosition(arrow1.body, {x: 200 , y: 50});

       }
}
async function getbackgroundImage(){
    var response=await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responsejson=await response.json();
    var datetime=responsejson.datetime;
    var hour=datetime.slice(11,13);
    if (hour>=06 && hour<=18){
        bg="sprites/bacg.png";
    }
    else{
        bg="sprites/bacg.png";
    }
    bgimg=loadImage(bg);
  

}
function spawnEnemies(){
    if(World.frameCount%200===0){
        var r=Math.round(random(200,displayHeight-200));
        enemy=new Pig(displayWidth,r);
        enemyarr.push(enemy);
        enemy.velocity.x=-3;
    }
}