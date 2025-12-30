const INITIAL_DISPLAY = "0";
const CALCULATION_ERROR = "MATH ERROR";
const DECIMAL_POINT = ".";
const HARD_MAX_DISPLAY_CHAR_LENGTH = 25;
const SOFT_MAX_DISPLAY_CHAR_LENGTH = 13;
const BUTTON_CLASSES = {
  FUNCTION: "function",
  NUMBER: "number",
  RESET: "reset",
  EQUALS: "equals",
  OPERATOR: "operator",
  DECIMAL_POINT: "decimal_point",
};
const OPERATORS = {
  times: "*",
  divide: "/",
  plus: "+",
  minus: "-",
  delete: "del",
  reset: "reset",
  equals: "=",
};
const OPERAND_MODES = {
  WAITING_SECOND: "waiting_for_second_operand",
  TYPING_SECOND: "typing_second_operand",
  WAITING_FIRST: "waiting_for_first_operand",
  TYPING_FIRST: "typing_first_operand",
};

const BUTTON_KEY_MAPPING = [
  {
    value: 1,
    type: BUTTON_CLASSES.NUMBER,
    area: "one",
    symbol: 1,
  },
  {
    value: 2,
    type: BUTTON_CLASSES.NUMBER,
    area: "two",
    symbol: 2,
  },
  {
    value: 3,
    type: BUTTON_CLASSES.NUMBER,
    area: "three",
    symbol: 3,
  },
  {
    value: 4,
    type: BUTTON_CLASSES.NUMBER,
    area: "four",
    symbol: 4,
  },
  {
    value: 5,
    type: BUTTON_CLASSES.NUMBER,
    area: "five",
    symbol: 5,
  },
  {
    value: 6,
    type: BUTTON_CLASSES.NUMBER,
    area: "six",
    symbol: 6,
  },
  {
    value: 7,
    type: BUTTON_CLASSES.NUMBER,
    area: "seven",
    symbol: 7,
  },
  {
    value: 8,
    type: BUTTON_CLASSES.NUMBER,
    area: "eight",
    symbol: 8,
  },
  {
    value: 9,
    type: BUTTON_CLASSES.NUMBER,
    area: "nine",
    symbol: 9,
  },
  {
    value: 0,
    type: BUTTON_CLASSES.NUMBER,
    area: "zero",
    symbol: 0,
  },
  {
    value: ".",
    type: BUTTON_CLASSES.DECIMAL_POINT,
    area: "dot",
    symbol: DECIMAL_POINT,
  },
  {
    value: "+",
    type: BUTTON_CLASSES.OPERATOR,
    area: "plus",
    symbol: OPERATORS.plus,
  },
  {
    value: "-",
    type: BUTTON_CLASSES.OPERATOR,
    area: "minus",
    symbol: OPERATORS.minus,
  },
  {
    value: "/",
    type: BUTTON_CLASSES.OPERATOR,
    area: "divide",
    symbol: OPERATORS.divide,
  },
  {
    value: "x",
    type: BUTTON_CLASSES.OPERATOR,
    area: "times",
    symbol: OPERATORS.times,
  },
  {
    value: "DEL",
    type: "function",
    area: "del",
    symbol: OPERATORS.delete,
  },
  {
    value: "RESET",
    type: "function",
    area: "reset",
    symbol: OPERATORS.reset,
  },
  {
    value: "=",
    type: "equals",
    area: "equals",
    symbol: OPERATORS.equals,
  },
];
export {
  OPERATORS,
  INITIAL_DISPLAY,
  CALCULATION_ERROR,
  DECIMAL_POINT,
  HARD_MAX_DISPLAY_CHAR_LENGTH,
  SOFT_MAX_DISPLAY_CHAR_LENGTH,
  BUTTON_KEY_MAPPING,
  BUTTON_CLASSES,
  OPERAND_MODES,
};
