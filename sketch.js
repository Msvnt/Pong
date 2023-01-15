//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//Velocidade da bolinha
let velocidadeXBolinha = 5
let velocidadeYBolinha = 5

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 135;
let alturaRaquete = 100;
let comprimentoRaquete = 8;

let colidiu = false;

//Variáveis do Oponente
let xOponente = 585;
let yOponente = 135;
let alturaOponente = 100;
let comprimentoOponente = 8;
let velocidadeYOponente;

let chanceErro = 0

//Placar do jogo
let pontosJogador = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilhaSonora;

function preload(){
  trilhaSonora = loadSound("Chill.wav");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  //verificaColisaoRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  colisaoRaquete(xOponente, yOponente)
  mostraRaquete(xOponente, yOponente);
  //movimentaOponente();
  movimentaRaqueteOponente();
  incluirPlacar();
  marcarPonto();
  devolverBolinha();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha , diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
    rect(x, y, comprimentoRaquete, alturaRaquete); 
}

function movimentoRaquete(){
    if (keyIsDown(87)){
      yRaquete -= 10;
    }
    if (keyIsDown(83)){
      yRaquete += 10;
    }
  }

function verificaColisaoRaquete(){
    if (xBolinha - raio < xRaquete + comprimentoRaquete && 
        yBolinha - raio < yRaquete + alturaRaquete &&
        yBolinha + raio > yRaquete){
      velocidadeXBolinha *= -1;
    }
}

function colisaoRaquete(x, y ){
  colidiu =
  collideRectCircle(x,y,comprimentoRaquete,alturaRaquete,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//linha funcao para outro jogador humano
function movimentaOponente(){
     if (keyIsDown(UP_ARROW)){
      yOponente -= 10;
    }
    if (keyIsDown(DOWN_ARROW)){
      yOponente += 10;
    }
}

//linha de funcao para jogar com a maquina
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yOponente - comprimentoRaquete / 2 - 30;
  yOponente += velocidadeYOponente + chanceErro
  calculaChanceDeErrar()

}

function calculaChanceDeErrar(){
  if (pontosOponente >= pontosJogador){
    chanceErro += 1;
    if ( chanceErro >= 34){
      chanceErro = 35;
    }
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255,140,0));
  rect(130,10,40,20);
  fill(255);
  text(pontosJogador, 150, 26) ;
  fill(color(255,140,0));  
  rect(430,10,40,20);
  fill(255);
  text(pontosOponente,450, 26);
  
}

function marcarPonto(){
  if (xBolinha > 590){
    pontosJogador += 1;
    ponto.play();
  }
  if (xBolinha < 10){
  pontosOponente += 1;
    ponto.play();
  }  
}

// tentei fazer com q a cada ponto a bola voltasse ao centro mas falhei
function devolverBolinha(){
  if (xBolinha > 590 && xBolinha < 10){
    xBolinha = 300;
    yBolinha = 200;
  }
}















