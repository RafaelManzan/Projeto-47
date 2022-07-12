var life1,life2,life3,life = 3;
var life1Img,life2Img,life3Img;
var balaEsq,balaDir, bala,nave, naveImg, balas, novaBala, novaBalaImg;
var ets, et2Img, et1Img, vel = 2.2;
var estAt, estAnt;
var barreira/*, resetButton*/;
var ultimoET, ultimoET2;
var level = 1;
var municoes = 30;
var pontos = 0;
var estado = "game";

function preload() {

  naveImg = /*loadAnimation*/loadImage("/assets/Nave.png"/*,"/assets/Nave2.png","/assets/Nave3.png"*/);
  bala = loadImage("/assets/missil.png");
  et1Img = loadImage("/assets/ET.png");
  et2Img = loadImage("/assets/ETnave.png");
  life1Img = loadImage("/assets/heart_1.png");
  life2Img = loadImage("/assets/heart_2.png");
  life3Img = loadImage("/assets/heart_3.png");
  novaBalaImg = loadImage("/assets/missil 2.png");
}

///////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(50);
  fill("red");
  text("Nasa envia foguete para conter invasoes alienigenas",windowWidth/3, windowHeight/10);

  barreira = createSprite(windowWidth/2,  windowHeight, windowWidth, 1);

  criaGrupos();
  criaNave();
  criaVida();
}

//estado, muniçoes

function draw() {
  background('black');
  textSize(30);
  fill("white");
  text("Pontuação = " + pontos,windowWidth/3, windowHeight/10);
  text("Munições = " + municoes,windowWidth/1.7, windowHeight/10);
  text("Level = " + level,windowWidth/1.2, windowHeight/10);

  nave.overlap(ets, (nave2, et) =>{
    life = life - 1;
    et.remove()
  });
  barreira.overlap(ets, (barreira1, et) =>{
    life = life - 1;
    et.remove()
  });
  balas.overlap(ets, (bala, et) =>{
    pontos = pontos + 1;
    et.remove();
    bala.remove();
  });

  if(estado === "gameOver"){
    ultimoET.velocityY = 0;
    ultimoET2.velocityY = 0;
    //resetButton = createSprite(windowWidth/10+20,windowHeight/10);
  }else if(estado === "game"){
    if(pontos >= 14){
      level = level + 1;
      pontos = municoes/2;
      municoes = 30;
      vel = vel + 1;
    }
    createETs(vel);
    lancaBalas();
    if(bala <= 10){
      novaBala = createSprite(random(20,windowWidth),-10);
      novaBala.velocityY = -2.6;
      novaBala.lifetime = windowHeight+90;
      novaBala.addImage(novaBalaImg);
      novaBala.scale = 0.5;
    }
  }

  nave.x = mouseX;
  atualizaVida();
  drawSprites();
}

//////////////////////////////////////////////////////

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/////////////////////////////////////////////////////

function criaGrupos(){
  ets = new Group();
  balas = new Group();
}

function criaNave(){
  nave = createSprite(windowWidth/2,windowHeight - windowHeight/7.15);
  nave./*addAnimation*/addImage(naveImg);
  nave.scale = 0.4;
  nave.setCollider("rectangle",0,0,360,360);
}

function criaVida(){
  life1 = createSprite(windowWidth/10-80,windowHeight/10);
  life1.addImage(life1Img);
  life1.scale = 0.5;
  life1.visible = true;

  life2 = createSprite(windowWidth/10-30,windowHeight/10);
  life2.addImage(life2Img);
  life2.scale = 0.5;
  life2.visible = true;

  life3 = createSprite(windowWidth/10+20,windowHeight/10);
  life3.addImage(life3Img);
  life3.scale = 0.5;
  life3.visible = true;
}

////////////////////////////////////////////////////////////////

function lancaBalas(){
  if(mousePressedOver(nave)){
    estAnt = estAt;
    estAt = 1;
  }else{
    estAnt = estAt;
    estAt = 0;
  }
  if((mousePressedOver(nave) && municoes > 0) && (estAnt === 0 && estAt === 1)){
    balaEsq = createSprite(nave.x-62,nave.y-55,10,10);
    balaEsq.velocityY = -3;
    balaEsq.scale = 0.25;
    balaEsq.lifetime = windowHeight+50;
    balaEsq.addImage(bala);
    balaDir = createSprite(nave.x+62,nave.y-55,10,10);
    balaDir.velocityY = -3;
    balaDir.scale = 0.25;
    balaDir.lifetime = windowHeight+50;
    balaDir.addImage(bala);
    balas.add(balaEsq);
    balas.add(balaDir);
    municoes = municoes - 2;
  }
}

function atualizaVida(){
  /*if(ets.collide(barreira)){
    life = life - 1;
  }*/
  if(life < 0){
    life = 0;
  }
  if(life === 3){
    life3.visible = true;
    life2.visible = false;
    life1.visible = false;
    estado = "game";
  }else if(life === 2){
    life3.visible = false;
    life2.visible = true;
    life1.visible = true;
    estado = "game";
  }else if(life === 1){
    life3.visible = false;
    life2.visible = false;
    life1.visible = true;
    estado = "game";
  }else if(life === 0){
    life3.visible = false;
    life2.visible = false;
    life1.visible = false;
    estado = "gameOver";
    /*swal({
      title: `Fim de Jogo`,
      text: "Oops você perdeu o jogo!",
      text: "Sua pontuação é: " + pontos,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Obrigado por jogar"
    });*/
  }
}

/////////////////////////////////////////////////////

function createETs(v){
  if(frameCount%100 === 0){
    var ranET = Math.round(random(1,2));
    var et = createSprite(random(20,windowWidth),-75);
    et.velocityY = v;
    et.lifetime = windowHeight+90;
    switch(ranET){
      case 1: et.addImage(et1Img)
      et.scale = 1.5;
      break
      case 2: et.addImage(et2Img)
      et.setCollider("rectangle",0,0,100,90)
      break  
      default:
      break
    }
    ets.add(et);
    ultimoET2 = ultimoET;
    ultimoET = et;
  }
}