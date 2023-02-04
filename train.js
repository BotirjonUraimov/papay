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

class Member {
  //state
  #accounPoints;
  //constructor
  constructor(points) {
    this.#accounPoints = 0;
  }

  //Method
  inform() {
    return this.#accounPoints;
  }

  addMember(son) {
    this.#countForAdd(son);
  }

  #countForAdd(a) {
    this.#accounPoints = this.#accounPoints + a;
  }

  removeMember(son) {
    this.#countForRemove(son);
  }
  #countForRemove(a) {
    this.#accounPoints = this.#accounPoints - a;
  }
}

const member = new Member();
member.addMember(5);
console.log(member.inform());
member.removeMember(3);
console.log(member.inform());
