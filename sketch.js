
let points =
[[0,7],[2,12],[0,7],[-2,12],[0,7],[1,6],[0.5,5],[1.8,3],[1,0],[2,-4],[0,-7],[-2,-4],[-1,0],[-1.8,3],[-0.5,5],[-1,6],[0,7],
[1,6],[0.5,5],[1.8,3],
[1,0],[4,7],[11,9],[12,5],[9,2],[3,0],[6.8,-1],[7,-4],[6,-5.8],[4,-6],[1.5,-2],[1,0],
[2,-4],[0,-7],[-2,-4],
[-1,0],[-4,7],[-11,9],[-12,5],[-9,2],[-3,0],[-6.8,-1],[-7,-4],[-6,-5.8],[-4,-6],[-1.5,-2],[-1,0]]; //list資料，
var fill_colors ="f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)
var line_colors ="c9cba3-ffe1a8-e26d5c-723d46-472d30".split("-").map(a=>"#"+a)




var ball //目前要處理的物件，暫時放在ball變數內
var balls=[] //把產生的"所有"的物件

var bullet //目前要處理的物件，暫時放在ball變數內
var bullets=[] //把產生的"所有"的物件

var monster //目前要處理的物件，暫時放在ball變數內
var monsters=[] //把產生的"所有"的物件

var box //目前要處理的物件，暫時放在ball變數內
var boxs=[] //把產生的"所有"的物件

var shipP

var score=0


function preload(){
  wing_sound = loadSound("sound/wing.wav")
  bullet_sound = loadSound("sound/emission.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2)
  for(var i=0;i<10;i=i+1){ //i=0,1,2,3,4,.....,8,9
    ball=new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內 
 }
 for(var i=0;i<10;i=i+1){ //i=0,1,2,3,4,.....,8,9
    monster=new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內 
 }
 for(var i=0;i<10;i=i+1){ //i=0,1,2,3,4,.....,8,9
  box=new Box({}) //產生一個Obj class元件
  boxs.push(box) //把ball的物件放入到balls陣列內 
}
}
function draw() {
  background("#eae4e9");
  // for(var j=0;j<balls.length;j=j+1){
  //   ball=balls[j]
  //   ball.draw()
  //   ball.update()
  //}
  //砲台
  if(keyIsPressed){
  if(key=="ArrowLeft" || key=="a"){
    shipP.x = shipP.x -5
  }
  if(key=="ArrowRight" || key=="d"){
    shipP.x = shipP.x +5
  }
  if(key=="ArrowUp" || key=="w"){
    shipP.y = shipP.y -5  
  }
  if(key=="ArrowDown" || key=="s"){
    shipP.y = shipP.y +5
  }
}
  
//蝴蝶的顯示
for(let ball of balls) //只要是陣列的方式，都可以利用此方式處理
{
   ball.draw()
   ball.update()
   for(let bullet of bullets){
    if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
    {
      balls.splice(balls.indexOf(ball),1)
      bullets.splice(bullets.indexOf(bullet),1)
      score = score + 1
      wing_sound.play()
      
    }
   }
 }

//飛彈的顯示
 for(let bullet of bullets) //只要是陣列的方式，都可以利用此方式處理
{
   bullet.draw()
   bullet.update()
 }

//蒼蠅的顯示
 for(let monster of monsters) {  //只要是陣列的方式，都可以利用此方式處理
  if(monster.dead == true && monster.timenum>4){
  monsters.splice(monsters.indexOf(monster),1)
 }
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y))
      {
        score = score - 1
        // monsters.splice(monsters.indexOf(monster),1)
        monster.dead = true
        bullets.splice(bullets.indexOf(bullet),1)
        
        
        
      }
     }
   }
  

   function checkCollisions() {
    for (let i = boxs.length - 1; i >= 0; i--) {
      const poop = boxs[i];
      for (let j = bullets.length - 1; j >= 0; j--) {
        const bullet = bullets[j];
        if (box.isBallInRanger(bullet.p.x, bullet.p.y)) {
          boxs.splice(i, 1);
          bullets.splice(j, 1);
          score -= 10; // 每次碰撞減上 10 分
          break; // 跳出子彈循環，避免重複刪除
        }
      }
    }
  }
   //箱子的顯示
   for(let Box of boxs) //只要是陣列的方式，都可以利用此方式處理
   {
    checkCollisions(); // 檢查碰撞
      box.draw()
      box.update()
      for(let bullet of bullets){
       if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
       {
        boxs.splice(boxs.indexOf(box),1)
        boxs.splice(bullets.indexOf(bullet),1)
         
         
       }
      }
    }
  

 textSize(50)
 fill(0); 
 text(score,50,50) //在座標為(50,50)上，顯示score分數內容
 push(); // 儲存原本的設定
translate(shipP.x, shipP.y); // 將座標系統移動到飛船的位置
let dx = mouseX - width/2;
let dy = mouseY - height/2;
let angle = atan2(dy, dx);
rotate(angle); // 以滑鼠位置為目標旋轉飛船

// 設定四個三角形的相對位置和大小
let triangleSize = 20;
let triangleGap = 5;
let triangleX = -25 - triangleSize - triangleGap;
let triangleY = -triangleSize / 2;
  
// 畫四個三角形
fill("#582f0e");
noStroke();
for (let i = 0; i < 4; i++) {
  triangle(triangleX, triangleY, triangleX + triangleSize, triangleY + triangleSize / 2, triangleX, triangleY + triangleSize);
  triangleX += triangleSize + triangleGap;
}

// 畫中間的圓形
fill("#c9c9c9");
ellipse(0, 0, 40);

pop(); //恢復原本的設定
//  push() //重新規劃原點(0,0)
//  let dx = mouseX - width/2
//  let dy = mouseY - height/2
//  let angle = atan2(dy,dx)

//  translate(shipP.x,shipP.y) 
//  fill("#582f0e")
//  noStroke()
//  rotate(angle)
//  triangle(-25,-25,-25,25,50,0) //設定三個點，畫成一個三角形
//  pop() //恢復原本設定，原點(0,0)在視窗的左上角

}

function mousePressed(){

  //+++++++++++產生一個物件
  //  ball=new Obj({
  //   p:{x:mouseX,y:mouseY}
  //  }) //在滑鼠按下的地方，產生一個Obj class元件
  //   balls.push(ball) //把ball的物件放入到balls陣列內 (丟到倉庫)
  //+++++++++++++++++++++++++++++++

  //在物件上按下滑鼠，物件消失不見，分數加一分
  // for(let ball of balls){ //檢查每一個物件
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編數(balls.indexOf(ball))，只取一個
  //     score=score+1
  //   }
  // }
  bullet = new Bullet({})
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //放下空白建，發射飛彈
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  
}

}

