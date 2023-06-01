
var monster_colors ="eff1ed-373d20-717744-bcbd8b-766153".split("-").map(a=>"#"+a)

class Monster{
    constructor(args){
        this.r = args.r || 100
        this.p = args.p || createVector(random(width),random(height))
        this.v = args.v || createVector(random(1,-1),random(-1,1))
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false 
        this.timenum=0
       

    }
    draw(){
      if(this.dead ==false){
        push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0, 0, this.r * 1.3, this.r * 0.8)
        fill("#caf0f8")
        
        rotate(PI/13)
        ellipse(70, -35, this.r * 0.2, this.r* 0.45)
        rotate(PI/-6)
        ellipse(70, 35, this.r * 0.2, this.r* 0.45)
      
      if(this.mode=="happy"){
          fill(255) //白
          ellipse(-50,-12,this.r/4)
          fill(0)
          ellipse(-50,-12,this.r/8)
        }else{
          fill(255) //白
          ellipse(-50,-12,this.r/2)
          fill(0)
          ellipse(-50,-12,this.r/6)
            // fill(255)
            // arc(0,0,this.r/2,this.r/2,0,PI)
            // fill(0)
            // arc(0,0,this.r/3,this.r/3,0,PI)
        }
        stroke(this.color)
        strokeWeight(4)
        noFill()
        //line(this.r/2,0,this.r,0)
        for(var j=0;j<4;j++){
            rotate(PI/5.5)
            beginShape()
               for(var i =0;i<(this.r/2);i++){
                  vertex(this.r/2+i,sin(i/10+frameCount/40)*10)
                  
            }
            endShape()
    }
    pop()
    }
    else{ //怪物死亡
      this.timenum=this.timenum+1
     push()
     translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0, 0, this.r * 1.3, this.r * 0.8)
        fill("#caf0f8")
        // push()
        rotate(PI/13)
        ellipse(70, -35, this.r * 0.2, this.r* 0.45)
        rotate(PI/-6)
        ellipse(70, 35, this.r * 0.2, this.r* 0.45)
        strokeWeight(5);
        line(width/2-50, height/2-50, width/2+50, height/2+50);
        if (this.dead) {
          strokeWeight(5);
          stroke(255,0,0); // 設置紅色
          let offset = this.r / 5; // 調整叉叉的大小
          let eyeOffset = this.r / 3; // 調整叉叉相對於眼睛的位置
          line(-eyeOffset - offset, -eyeOffset - offset, -eyeOffset + offset, -eyeOffset + offset);
          line(-eyeOffset - offset, -eyeOffset + offset, -eyeOffset + offset, -eyeOffset - offset);
        }
 
    pop();
  }
  
  if (monsters.length == 0 && score >= 0) {
    // 清空畫面，以便顯示遊戲結束畫面
    background("#ffe1a8");
    // 顯示遊戲結束文字和分數
    fill("#d62828");
    textSize(50);
    textAlign(CENTER, CENTER);
    text("恭喜成功清除蒼蠅大軍！", width/2, height/2);
    textSize(32);
    fill("#e26d5c");
    text("你的分數：" + score, width/2, 50); // 顯示分數
    text("遊戲結束", width/2, 100);
    // 禁用所有的按鍵和滑鼠事件
    noLoop();
    noCursor();
  } 
  
  if (balls.length == 0 && score <= 0) {
    // 清空畫面，以便顯示遊戲結束畫面
    background("#ffe1a8");
    // 顯示遊戲結束文字和分數
    fill("#d62828");
    textSize(50);
    textAlign(CENTER, CENTER);
    text("糟糕！蝴蝶滅絕了", width/2, height/2);
    textSize(32);
    fill("#e26d5c");
    text("你的分數：" + score, width/2, 50); // 顯示分數
    // 顯示「失敗」文字
    fill("#e26d5c");
    textAlign(CENTER, CENTER);
    text("遊戲結束", width/2, 100);
    // 禁用所有的按鍵和滑鼠事件
    noLoop();
    noCursor();
  }

}
 

  
  
    update(){
        this.p.add(this.v)
        //碰壁彈回
        if(this.p.x<=0||this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x=-this.v.x  //把x軸方向，把速度方向改變
          }
          if(this.p.y<=0||this.p.y>=height){ //y軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y=-this.v.y  //把y軸方向，把速度方向改變
          }
      }
 isBallInRanger(x,y){ 
  let d =dist(x,y,this.p.x,this.p.y) 
  if(d<this.r/2){
    return true 
  }else{
    return false
  }
}
}
