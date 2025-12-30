import { INITIAL_DISPLAY, OPERATORS } from "../constants/calculator.js";

export default function formatDisplay(value) {
  if (value === INITIAL_DISPLAY || value === OPERATORS.minus) return value;

  if (value.match(/error/i)) return value;

  const [int, dec] = value.split(".");
  const formattedInt = new Intl.NumberFormat("en-US").format(int);

  return dec !== undefined ? `${formattedInt}.${dec}` : `${formattedInt}`;
}
