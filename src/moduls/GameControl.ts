import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameContorl {
  snake: Snake;
  food: Food;
  scorePanell: ScorePanel;
  direction: string = ""; //存储按键的值
  //记录游戏是否结束
  isLive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanell = new ScorePanel();
    this.init();
  }
  //初始化.调用游戏即开始
  init() {
    //绑定键盘按下的事件,用bind绑定this，使this指向GameControl，解决this指向document的问题
    // ArrowUp Up
    // ArrowDown Down
    // ArrowLeft Left
    // ArrowRight Right
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }
  //创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    //由doucunent调用this，this为doucument
    this.direction = event.key;
  }
  //移动
  run() {
    let x = this.snake.X;
    let y = this.snake.Y;
    //根据按键方向修改x，y值
    switch (this.direction) {
      case "ArrowUp":
      case "UP":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;

        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;

        break;
      case "ArrowRight":
      case "Right":
        x += 10;

        break;
    }

    //捕获错误，结束游戏
    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (e: any) {
      alert(e.message);
      this.isLive = false;
    }
    //吃到食物
    this.checkEat(this.snake.X, this.snake.Y);

    //定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanell.level - 1 * 30));
  }
  //吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.scorePanell.addScore();
      this.snake.addBody();
    }
  }
}
export default GameContorl;
