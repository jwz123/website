var ctx = document.getElementById("ctx").getContext("2d"); 
ctx.font = '30px Arial';
var WIDTH = 1500;
var HEIGHT = 1500;
var alive = true;
var blockList = [];
//var img_player = new Image();
//img_player.src = "img/flappybird.png";
//var img_pipe = new Image();
score = 0;

var player = {
x:150,
y:320,
width:5,
height:2,
speed:90,
xVel:0,
yVel:0,
jumpHeight:1.5,
gravity:0,
color:'white',
}

var background = {
x:0,
y:0,
width:1000,
height:1000,
color:'#124185'
}

function createBlock(x,y,width,height,speed,color,shiny){
var block = {
x:x,
y:y,
width:width,
height:height,
speed:speed,
color:color,
shiny:shiny,
id:Math.random(),
}
blockList[block.id] = block;
}
var mouseDown = 0;

		
document.onmousedown = function(mouse){
	mouseDown++;
		
		}
		
		document.body.onmouseup = function() {
  --mouseDown;
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
  
}

function createPipe(pipeLocation){
choose = Math.random()

for (i = 0;i<12;i++){
createBlock(800,pipeLocation+(32*i)-192,64,33,-1,'#aaaaaa',false);
}
for (i = 0;i<13;i++){ 
createBlock(800,320+pipeLocation+i*32,64,33,-2,'#7777777',false);
}



for (i = 0;i<12;i++){
createBlock(800,pipeLocation+(32*i)-192,64,33,-3,'#333333',true);
}
for (i = 0;i<13;i++){ 
createBlock(800,320+pipeLocation+i*32,64,33,-4,'#ffffff',true);

}
}
pipeStart = 0;
//128
//-160
function genPipe(){
if (pipeStart >= 128) {
pipeStart = getRandomArbitrary(64,196)
}
if (pipeStart <= -128){
pipeStart = getRandomArbitrary(-128,-196)
}
else{
pipeStart = pipeStart + getRandomArbitrary(-64,64)
}
createPipe(pipeStart)
//console.log(pipeStart);
}
function checkCollision(obj1,obj2){
	if (obj1.x > obj2.x + obj2.width) return false;
	if (obj1.x + obj1.width < obj2.x) return false;
	if (obj1.y > obj2.y + obj2.height) return false;
	if (obj1.y + obj1.height < obj2.y) return false;
	return true;
}


function objDraw(obj){
ctx.save();
ctx.fillStyle = obj.color
ctx.fillRect(obj.x,obj.y,obj.width,obj.height);
ctx.restore();
}

function playerDraw(obj){
 
ctx.fillStlye = player.color
ctx.rect(player.x,player.y,player.width,player.height);
//img_player.rotate(180);
}
function objUpdate(obj){
obj.x = obj.x + obj.speed
}

function playerUpdate(plr){

if (plr.yVel <= 9001) {
plr.yVel = plr.yVel + plr.gravity;
}

plr.y = plr.y + plr.yVel;


}
function givePoint(){
score = score + .04;

}

function update(){
  player.height = player.yVel*3
  if (mouseDown == 1) {
    if (alive == true){
			player.yVel = player.yVel -player.jumpHeight
			player.gravity = .6
			}
			if (alive == false && player.gravity == 0){
			alive = true;
			
			player.x = 150;
			player.y = 240
			player.gravity = 0;
			score = 0;
			for (var key in blockList){
			delete blockList[key];		
			}
			}
  }
  objDraw(background);
playerUpdate(player)
objDraw(player)




if (player.y >= 448){
player.y = 420;
player.yVel = 0;
player.gravity = 0;
alive = false
}
if (player.y < 0){
  player.yVel = 0;
  player.gravity = 0;
  alive = false
}



for (var key in blockList){

//if (checkCollision(player,blockList[key]) && player.y + player.height < blockList[key].y + player.yVel){



if (player.x >= blockList[key].x && player.x-4 <= blockList[key].x){
if (blockList[key].shiny == false) {
givePoint();
}
if (blockList[key].shiny == true) {
for (i = 0;i<11;i++){
givePoint();
}
}
}
if (checkCollision(player,blockList[key])){

alive = false;
}

//player.y -= player.yVel;
//player.yVel = 0;
//}

//if (checkCollision(player,blockList[key]) && player.y - player.height > blockList[key].y + player.yVel){
//player.y += player.yVel;
//player.yVel = -player.yVel;
//}
if (alive == true){
objUpdate(blockList[key]);
}
objDraw(blockList[key]);


if (blockList[key].x < -128){
delete blockList[key];
}
}
ctx.fillStyle = 'brown'
ctx.fillRect(0,448,640,32)
ctx.fillStyle = 'black'
ctx.fillText("Score: "+Math.floor(score), 5,25);


}

setInterval(update,16.66);
setInterval(genPipe,1000);


