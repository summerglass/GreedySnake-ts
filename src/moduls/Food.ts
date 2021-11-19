class Food {
  //获取食物元素
  element: HTMLElement;
  constructor() {
    //非空断言=>"!"
    this.element = document.getElementById("food")!;
  }
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop;
  }
  //生成随机数(地图大小),随机改变位置，蛇移动一次就是10，所以
  //食物的坐标必须是整10
  change() {
    //round四舍五入,就可以包含0和290了,
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
  }
}
export default Food;
