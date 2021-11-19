//计分牌
class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  maxlevel: number;
  upScore: number; //多少级升级
  constructor(maxlevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxlevel = maxlevel;
    this.upScore = upScore;
  }
  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";
    if (this.score % this.upScore === 0) {
      this.levelup();
    }
  }
  levelup() {
    //最大等级10
    if (this.level < this.maxlevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}
export default ScorePanel;
