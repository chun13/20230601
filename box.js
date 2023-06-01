var box_colors = "603808".split("-").map(a => "#" + a)

class Box {
  constructor(args) {
    this.w = args.w || 100
    this.h = args.h || 50
    this.p = args.p || createVector(random(width), random(height))
    this.v = args.v || createVector(1.2,1.2)
    this.color = args.color || random(box_colors)
  }

  draw() {
    push()
    translate(this.p.x, this.p.y)
    fill(this.color)
    noStroke()
    rect(-this.w / 2, -this.h / 2, this.w, this.h)
    pop()

    for(let box of boxs) {
        for(let bullet of bullets) {
          if(box.isBallInRanger(bullet.p.x,bullet.p.y)) {
            boxs.splice(boxs.indexOf(box), 1);
            bullets.splice(bullets.indexOf(bullet), 1);
            
          }
        }
      }
  }

  update() {
    this.p.add(this.v)
    //碰壁彈回
    if(this.p.x <= 0 || this.p.x >= width) { //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向，把速度方向改變
    }
    if(this.p.y <= 0 || this.p.y >= height) { //y軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y = -this.v.y  //把y軸方向，把速度方向改變
    }
  }
  
  isBallInRanger(x, y) { 
    let d = dist(x, y, this.p.x, this.p.y) 
    if(d < Math.max(this.w, this.h) / 2) {
      return true 
    } else {
      return false
    }
  }
}