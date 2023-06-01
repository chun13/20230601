//定義一個bullet物件的class

class Bullet{
    constructor(args){
      this.r = this.r || 20 
      this.p = args.p || shipP.copy()   //createVector(width/2,height/2)
      this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
      this.color = args.color || "#582f0e"
    }
    draw(){
      push()
      translate(this.p.x,this.p.y)
      fill(this.color)
      noStroke()
      triangle(-this.r/2, this.r/2, 0, -this.r/2, this.r/2, this.r/2);
      // ellipse(0,0,this.r)
      pop()
    }
    update(){ //計算出移動後的位置
      this.p.add(this.v)
    }

  }