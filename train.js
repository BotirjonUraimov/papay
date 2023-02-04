//  K-task
// const footballPoints = (wins, draws, losses) => {
//   return wins * 3 + draws * 1 + losses * 0;
// };
// console.log(footballPoints(3, 4, 1));

//  L-Task
// function calculate(str) {
//   return eval(str);
// }

// console.log(calculate("5 * 5"));

//  M-Task

class Members {
  #counts;
  constructor(counts) {
    this.#counts = counts;
  }
  inform() {
    return console.log(`hello ${this.#counts}`);
  }

  addMember(son) {
    this.#increaseMember(son);
  }

  #increaseMember(son) {
    this.#counts = this.#counts + son;
  }
}
const member = new Members(5);
member.addMember(5);
console.log(member.inform);
