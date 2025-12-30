import { useState } from "react";
import {
  BUTTON_CLASSES,
  BUTTON_KEY_MAPPING,
  CALCULATION_ERROR,
  DECIMAL_POINT,
  INITIAL_DISPLAY,
  MAX_DISPLAY_CHAR_LENGTH,
  OPERAND_MODES,
  OPERATORS,
} from "./constants/calculator.js";
import calculate from "./helpers/calculate.js";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
  const [firstOperand, setFirstOperand] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(INITIAL_DISPLAY);
  const [secondOperand, setSecondOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [operandMode, setOperandMode] = useState(OPERAND_MODES.WAITING_FIRST);

  function resetCalculator() {
    setDisplayedValue(INITIAL_DISPLAY);
    setFirstOperand(null);
    setSecondOperand(null);
    setOperator(null);
    setOperandMode(OPERAND_MODES.WAITING_FIRST);
    toast.dismiss();
  }

  function inputDigit(digit) {
    const hasError = displayedValue.match(/error/i);

    if (
      operandMode === OPERAND_MODES.TYPING_FIRST &&
      !hasError &&
      displayedValue.length >= MAX_DISPLAY_CHAR_LENGTH
    ) {
      toast("Maximum display characters length reached", {
        type: "info",
      });
      return;
    }

    let updatedDisplayValue,
      updatedOperandMode = operandMode;

    if (hasError) {
      resetCalculator();
      updatedDisplayValue = `${digit}`;
      updatedOperandMode = OPERAND_MODES.TYPING_FIRST;
    } else if (operandMode === OPERAND_MODES.WAITING_FIRST) {
      updatedDisplayValue = `${digit}`;
      updatedOperandMode = OPERAND_MODES.TYPING_FIRST;
    } else if (operandMode === OPERAND_MODES.WAITING_SECOND) {
      updatedDisplayValue = `${digit}`;
      updatedOperandMode = OPERAND_MODES.TYPING_SECOND;
    } else {
      updatedDisplayValue = `${displayedValue}${digit}`;
    }

    if (updatedOperandMode === OPERAND_MODES.TYPING_FIRST) {
      setFirstOperand(Number(updatedDisplayValue));
    }

    if (updatedOperandMode === OPERAND_MODES.TYPING_SECOND) {
      setSecondOperand(Number(updatedDisplayValue));
    }

    setDisplayedValue(updatedDisplayValue);
    setOperandMode(updatedOperandMode);
  }

  function handleDel() {
    if (operandMode === OPERAND_MODES.WAITING_FIRST) return;

    if (displayedValue.match(/error/i)) {
      resetCalculator();
      return;
    }

    if (operandMode === OPERAND_MODES.WAITING_SECOND) {
      setOperator(null);
      setDisplayedValue(firstOperand);
      setOperandMode(OPERAND_MODES.TYPING_FIRST);
      return;
    }

    const updatedDisplayValue = `${displayedValue.slice(0, -1)}`;
    let updatedOperandMode = operandMode;

    if (updatedDisplayValue === "") {
      setDisplayedValue(INITIAL_DISPLAY);
      if (operandMode === OPERAND_MODES.TYPING_FIRST) {
        updatedOperandMode = OPERAND_MODES.WAITING_FIRST;
      }

      if (operandMode === OPERAND_MODES.TYPING_SECOND) {
        updatedOperandMode = OPERAND_MODES.WAITING_SECOND;
      }
    } else {
      setDisplayedValue(updatedDisplayValue);
    }

    if (operandMode === OPERAND_MODES.TYPING_FIRST) {
      setFirstOperand(Number(updatedDisplayValue));
    } else if (operandMode === OPERAND_MODES.TYPING_SECOND) {
      setSecondOperand(Number(updatedDisplayValue));
    }

    setOperandMode(updatedOperandMode);
  }

  function inputDecimal() {
    if (displayedValue.length >= MAX_DISPLAY_CHAR_LENGTH) {
      toast("Maximum display characters length reached", {
        type: "info",
      });
      return;
    }

    if (displayedValue.includes(DECIMAL_POINT)) return;

    let updatedDisplayValue = `${displayedValue}.`,
      updatedOperandMode = operandMode;

    if (operandMode === OPERAND_MODES.WAITING_FIRST) {
      updatedOperandMode = OPERAND_MODES.TYPING_FIRST;
      return;
    }

    if (operandMode === OPERAND_MODES.WAITING_SECOND) {
      updatedOperandMode = OPERAND_MODES.TYPING_SECOND;
      return;
    }

    setDisplayedValue(updatedDisplayValue);
    setOperandMode(updatedOperandMode);

    if (updatedOperandMode === OPERAND_MODES.TYPING_FIRST) {
      setFirstOperand(Number(updatedDisplayValue));
    }

    if (updatedOperandMode === OPERAND_MODES.TYPING_SECOND) {
      setSecondOperand(Number(updatedDisplayValue));
    }
  }

  function handleOperators(nextOperator) {
    if (displayedValue === "-0" && nextOperator === OPERATORS.minus) {
      setDisplayedValue(INITIAL_DISPLAY);
      setFirstOperand(0);
      setOperandMode(OPERAND_MODES.WAITING_FIRST);
      return;
    }

    if (
      nextOperator === OPERATORS.minus &&
      operandMode === OPERAND_MODES.WAITING_FIRST
    ) {
      setDisplayedValue("-0");
      setFirstOperand(-0);
      setOperandMode(OPERAND_MODES.TYPING_FIRST);
      return;
    }

    if (operandMode === OPERAND_MODES.WAITING_FIRST) {
      // alert user to input a number first;
      toast("Input the first operand first!!!", {
        type: "info",
      });
      return;
    }

    if (operandMode === OPERAND_MODES.TYPING_FIRST) {
      setOperator(nextOperator);
      setOperandMode(OPERAND_MODES.WAITING_SECOND);
      return;
    }

    if (operandMode === OPERAND_MODES.WAITING_SECOND) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand !== null && operator && secondOperand !== null) {
      try {
        const result = calculate(firstOperand, operator, secondOperand);

        setFirstOperand(result);
        setDisplayedValue(`${result}`);
        setOperator(nextOperator);
        setSecondOperand(null);
        setOperandMode(OPERAND_MODES.WAITING_SECOND);
      } catch (error) {
        setDisplayedValue(error.message);
        setOperandMode(OPERAND_MODES.WAITING_FIRST);
        toast(CALCULATION_ERROR, {
          type: "error",
        });
      }
    }
  }

  function handleEquals() {
    if (firstOperand !== null && operator && secondOperand !== null) {
      try {
        const result = calculate(firstOperand, operator, secondOperand);

        setFirstOperand(result);
        setDisplayedValue(`${result}`);
        setOperator(null);
        setSecondOperand(null);
        setOperandMode(OPERAND_MODES.TYPING_FIRST);
      } catch (error) {
        setDisplayedValue(error.message);
        setOperandMode(OPERAND_MODES.WAITING_FIRST);
        toast(CALCULATION_ERROR, {
          type: "error",
        });
      }
    }
  }

  function handleButtonClick(value) {
    switch (value) {
      case OPERATORS.plus:
      case OPERATORS.minus:
      case OPERATORS.divide:
      case OPERATORS.times:
        handleOperators(value);
        break;
      case OPERATORS.equals:
        handleEquals();
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
    if (value === INITIAL_DISPLAY || value === OPERATORS.minus) return value;

    if (value.match(/error/i)) return value;

    const [int, dec] = value.split(".");
    const formattedInt = new Intl.NumberFormat("en-US").format(int);

    return dec !== undefined ? `${formattedInt}.${dec}` : `${formattedInt}`;
  }

  return (
    <div className="min-h-screen bg-main-bg px-3 py-7 md:px-5 flex items-center justify-center text-[28px] md:text-[32px] text-white font-bold">
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
      <ToastContainer
        className={`text-lg`}
        stacked={true}
        limit={10}
        autoClose={2500}
      />
    </div>
  );
}
