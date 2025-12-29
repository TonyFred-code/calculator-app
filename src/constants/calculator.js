const INITIAL_DISPLAY = "0";
const CALCULATION_ERROR = "MATH ERROR";
const DECIMAL_POINT = ".";
const MAX_DISPLAY_CHAR_LENGTH = 13;
const BUTTON_KEY_MAPPING = [
  {
    value: 1,
    type: "number",
    area: "one",
  },
  {
    value: 2,
    type: "number",
    area: "two",
  },
  {
    value: 3,
    type: "number",
    area: "three",
  },
  {
    value: 4,
    type: "number",
    area: "four",
  },
  {
    value: 5,
    type: "number",
    area: "five",
  },
  {
    value: 6,
    type: "number",
    area: "six",
  },
  {
    value: 7,
    type: "number",
    area: "seven",
  },
  {
    value: 8,
    type: "number",
    area: "eight",
  },
  {
    value: 9,
    type: "number",
    area: "nine",
  },
  {
    value: 0,
    type: "number",
    area: "zero",
  },
  {
    value: ".",
    type: "decimal_point",
    area: "dot",
  },
  {
    value: "+",
    type: "operator",
    area: "plus",
  },
  {
    value: "-",
    type: "operator",
    area: "minus",
  },
  {
    value: "/",
    type: "operator",
    area: "divide",
  },
  {
    value: "x",
    type: "operator",
    area: "times",
  },
  {
    value: "DEL",
    type: "function",
    area: "del",
  },
  {
    value: "RESET",
    type: "function",
    area: "reset",
  },
  {
    value: "=",
    type: "equals",
    area: "equals",
  },
];

export {
  INITIAL_DISPLAY,
  CALCULATION_ERROR,
  DECIMAL_POINT,
  MAX_DISPLAY_CHAR_LENGTH,
  BUTTON_KEY_MAPPING,
};
