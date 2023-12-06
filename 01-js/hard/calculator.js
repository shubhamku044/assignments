/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }
  add(num) {
    this.result += num;
  }
  subtract(num) {
    this.result -= num;
  }
  multiply(num) {
    this.result *= num;
  }
  divide(num) {
    if (num === 0) throw Error("Division by zero");
    this.result /= num;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }

  isValidString(str) {
    const validCharacter = /[^0-9+\-*/().]/;
    const leftParen = str.match(/\(/g) ? str.match(/\(/g).length : 0;
    const rightParen = str.match(/\)/g) ? str.match(/\)/g).length : 0;

    return !validCharacter.test(str) && leftParen === rightParen;
  }

  extractNumber(expression, operator) {
    const regex = new RegExp(`([\\d.]+)\\${operator}([\\d.]+)`);
    const match = expression.match(regex);

    if (match) {
      const leftNumber = match[1];
      const rightNumber = match[2];

      const leftValue = parseFloat(leftNumber);
      const rightValue = parseFloat(rightNumber);

      return { leftValue, rightValue };
    }

    return null;
  }

  calculateSimpleExpression(str) {
    let ans = 0;

    const noOfOperations = str.match(/[+\-*/]/g)
      ? str.match(/[+\-*/]/g).length
      : 0;

    if (!noOfOperations) return parseFloat(str);

    for (let i = 0; i < noOfOperations; i++) {
      ans = 0;
      let operator = "";
      if (this.extractNumber(str, "/")) operator = "/";
      else if (this.extractNumber(str, "*")) operator = "*";
      else if (this.extractNumber(str, "+")) operator = "+";
      else if (this.extractNumber(str, "-")) operator = "-";
      const res = this.extractNumber(str, operator);
      if (res) {
        switch (operator) {
          case "/":
            if (res.rightValue === 0) throw Error();
            ans += res.leftValue / res.rightValue;
            break;
          case "*":
            ans += res.leftValue * res.rightValue;
            break;
          case "+":
            ans += res.leftValue + res.rightValue;
            break;
          case "-":
            ans += res.leftValue - res.rightValue;
            break;
          default:
            break;
        }
      }
      str = str.replace(
        `${res.leftValue}${operator}${res.rightValue}`,
        `${ans}`
      );
    }

    return ans;
  }

  calculate(str) {
    str = str.trim().replace(/ +/g, "");
    if (!this.isValidString(str)) throw Error();

    while (str.includes("(") && str.includes(")")) {
      const idxOfLeftParen = str.lastIndexOf("(");
      const idxOfRightParen =
        str.slice(idxOfLeftParen, str.length).indexOf(")") + idxOfLeftParen;
      if (idxOfRightParen < idxOfLeftParen) throw Error("wrong parenthesis");
      const newExpr = str.slice(idxOfLeftParen + 1, idxOfRightParen);
      const ans = this.calculateSimpleExpression(newExpr);
      str = str.replace(str.slice(idxOfLeftParen, idxOfRightParen + 1), ans);
    }

    let finalResult = this.calculateSimpleExpression(str);
    this.result = finalResult;
    if (finalResult !== Math.floor(finalResult)) return finalResult;

    this.finalResult = parseFloat(
      finalResult.toFixed(2).replace(/[.,]00$/, "")
    );
    return this.finalResult;
  }
}

console.log(new Calculator().calculate("(2.5 + 1.5) * 3"));

module.exports = Calculator;
