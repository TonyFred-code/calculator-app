import { useState } from "react";
import {
  BUTTON_CLASSES,
  BUTTON_KEY_MAPPING,
  CALCULATION_ERROR,
  DECIMAL_POINT,
  INITIAL_DISPLAY,
  MAX_DISPLAY_CHAR_LENGTH,
  OPERATORS,
} from "./constants/calculator.js";

export default function App() {
  const [firstOperand, setFirstOperand] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(INITIAL_DISPLAY);
  const [secondOperand, setSecondOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  function resetCalculator() {
    setDisplayedValue("0");
    setFirstOperand(null);
    setSecondOperand(null);
    setOperator(null);
  }

  function inputDigit(digit) {
    if (displayedValue.length >= MAX_DISPLAY_CHAR_LENGTH) {
      alert("Maximum display characters length reached");
      return;
    }

    if (displayedValue === "MATH ERROR") {
      resetCalculator();
      setDisplayedValue(`${digit}`);
    } else if (displayedValue === "0") {
      setDisplayedValue(`${digit}`);
    } else if (displayedValue === "-") {
      setDisplayedValue(`-${digit}`);
    } else if (Number(displayedValue) === firstOperand && operator !== null) {
      setDisplayedValue(`${digit}`);
    } else {
      setDisplayedValue(`${displayedValue}${digit}`);
    }

    if (operator && firstOperand !== null) {
      setSecondOperand(Number(displayedValue));
    } else {
      setFirstOperand(Number(displayedValue));
    }
  }

  function handleDel() {
    if (displayedValue === INITIAL_DISPLAY) return;

    if (displayedValue === CALCULATION_ERROR) {
      resetCalculator();
      return;
    }

    const updatedDisplayValue = `${displayedValue.slice(0, -1)}`;

    if (displayedValue === "") {
      setDisplayedValue(INITIAL_DISPLAY);
    } else {
      setDisplayedValue(updatedDisplayValue);
    }

    if (secondOperand === null) {
      setFirstOperand(Number(updatedDisplayValue));
    } else if (operator && firstOperand !== null) {
      setSecondOperand(Number(updatedDisplayValue));
    }
  }

  function inputDecimal() {
    if (displayedValue.length >= MAX_DISPLAY_CHAR_LENGTH) {
      alert("Maximum display characters length reached");
      return;
    }

    if (displayedValue === "MATH ERROR") {
      resetCalculator();
    }

    if (waitingForSecondOperand && secondOperand === null) {
      setWaitingForSecondOperand(false);
      setDisplayedValue(INITIAL_DISPLAY);
      return;
    }

    if (!displayedValue.includes(DECIMAL_POINT)) {
      setDisplayedValue(`${displayedValue}${DECIMAL_POINT}`);
    }
  }

  function handleButtonClick(type, value) {
    switch (value) {
      case OPERATORS.plus:
      case OPERATORS.minus:
      case OPERATORS.divide:
      case OPERATORS.times:
        break;
      case OPERATORS.equals:
        break;
      case DECIMAL_POINT:
        inputDecimal(value);
        break;
      case OPERATORS.reset:
        resetCalculator();
        break;
      case OPERATORS.delete:
        handleDel();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  }

  function formatDisplay(value) {
    if (value === INITIAL_DISPLAY) return value;

    const [int, dec] = value.split(".");
    const formattedInt = new Intl.NumberFormat("en-US").format(int);

    return dec !== undefined ? `${formattedInt}.${dec}` : `${formattedInt}`;
  }

  return (
    <div className="min-h-screen bg-main-bg px-5 py-7 flex items-center justify-center text-[32px] text-white font-bold">
      <div className="w-11/12 max-w-sm space-y-7 select-none">
        {/* HEADER */}
        <div className="flex justify-between">
          <h1 className="text-3xl">calc</h1>
          {/* <div className="flex gap-8 items-end">
            <p className="text-sm font-bold uppercase">theme</p>
            <div className="flex flex-col gap-1 relative">
              <div className="text-sm flex justify-around -top-6 left-[10%] right-[10%] absolute  ">
                {themes.map((theme) => {
                  return <span key={theme.code}>{theme.code}</span>;
                })}
              </div>
              <div className="w-20 rounded-full bg-screen-bg p-1.5 flex justify-evenly">
                {themes.map((theme) => {
                  return (
                    <button className="rounded-full size-5 block bg-key-red-toggle-bg cursor-pointer"></button>
                  ); })}
              </div>
            </div>
          </div> */}
          {/* TODO: theme */}
        </div>

        {/* SCREEN */}
        <form className="w-full">
          <label htmlFor="operands" className="sr-only">
            Operands:
          </label>
          <input
            type="text"
            name="operands"
            value={formatDisplay(displayedValue)}
            disabled={true}
            id="operands"
            className="pointer-events-none p-4 bg-screen-bg text-white w-full text-end rounded-lg"
          />
        </form>

        {/* KEYPAD */}
        <div className="keypad bg-keypad-bg grid gap-3 p-5 rounded-xl">
          {BUTTON_KEY_MAPPING.map((buttonKey) => {
            const { value, type, area, symbol } = buttonKey;

            return (
              <button
                key={value}
                className={`${type}-type grid-area-${String(area).toLowerCase()}`}
                onClick={() => {
                  handleButtonClick(symbol);
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
