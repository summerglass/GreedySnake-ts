class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;
  constructor() {
    this.head = document.querySelector("#snake>div") as HTMLElement;
    //querySelectorAll返回的是node
    this.element = document.getElementById("snake")!;
    this.bodies = this.element.getElementsByTagName("div");
  }
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    //判断是否撞墙，抛出异常在gamecontrol里捕获
    if (value < 0 || value > 299) {
      throw new Error("蛇撞墙了");
    }
    //不让调头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    //身体移动
    this.move();

    this.head.style.left = value + "px";
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 299) {
      throw new Error("蛇撞墙了");
    }
    //不让调头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.move();

    this.head.style.top = value + "px";
    this.checkHeadBody();
  }
  addBody() {
    const div = document.createElement("div");
    this.element.insertAdjacentElement("beforeend", div);
    this.move();
  }
  //移动身体
  move() {
    //将后一节设为前一节的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      //获取前边身体的位置
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = x + "px";
      (this.bodies[i] as HTMLElement).style.top = y + "px";
    }
  }
  //检查头和身体有没有相撞
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("撞到自己了！");
      }
    }
  }
}
export default Snake;
