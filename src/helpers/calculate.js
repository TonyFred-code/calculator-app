import { MAX_DISPLAY_CHAR_LENGTH, OPERATORS } from "../constants/calculator.js";

export default function calculate(firstOperand, operator, secondOperand) {
  let result = 0;
  switch (operator) {
    case OPERATORS.plus:
      result = firstOperand + secondOperand;
      break;
    case OPERATORS.times:
      result = firstOperand * secondOperand;
      break;

    case OPERATORS.minus:
      result = firstOperand - secondOperand;
      break;
    case OPERATORS.divide:
      if (secondOperand === 0) {
        throw new Error("Error: Cannot divide by 0");
      }
      result = firstOperand / secondOperand;
      break;
    default:
      result = secondOperand;
      break;
  }

  return Number(result.toFixed(MAX_DISPLAY_CHAR_LENGTH));
}
