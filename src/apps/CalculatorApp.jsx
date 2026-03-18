import { useState } from "react";
import { IoIosBackspace } from "react-icons/io";

const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [resultmode, setResultmode] = useState(false);

  const numHandler = (num) => {
    if (resultmode === true) {
      setDisplay(num);
      setResultmode(false);
      return;
    }

    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const dotHandler = () => {
    if (display.includes(".")) return;

    if (display === "0") {
      setDisplay("0.");
    } else {
      setDisplay(display + ".");
    }
  };

  const operatorHandler = (op) => {
    if (display === "0") return;

    const lastChar = display.slice(-1);
    const operators = ["+", "-", "x", "/", "÷", "*"];
    setResultmode(false);

    if (operators.includes(lastChar)) {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + op);
    }
  };

  const equalsHandler = () => {
    const lastChar = display.slice(-1);
    const operators = ["+", "-", "x", "/", "÷", "*"];
    if (operators.includes(lastChar)) {
      return;
    } else {
      try {
        const result = eval(display);
        setDisplay(String(result));
        setResultmode(true);
      } catch {
        setDisplay("Error");
      }
    }
  };

  const clearHandler = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="w-[300px] h-fit bg-[#2E2D2D] rounded-2xl text-white p-4 ">
      <div className="text-right font-semibold text-6xl leading-none mb-3 overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollba">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => setDisplay("0")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          AC
        </button>
        <button className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]">
          +/-
        </button>
        <button
          onClick={() => operatorHandler("%")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          %
        </button>
        <button
          onClick={() => operatorHandler("/")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#FFA915]"
        >
          /
        </button>

        <button
          onClick={() => numHandler("7")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          7
        </button>
        <button
          onClick={() => numHandler("8")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          8
        </button>
        <button
          onClick={() => numHandler("9")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          9
        </button>
        <button
          onClick={() => operatorHandler("*")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#FFA915]"
        >
          x
        </button>

        <button
          onClick={() => numHandler("4")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          4
        </button>
        <button
          onClick={() => numHandler("5")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          5
        </button>
        <button
          onClick={() => numHandler("6")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          6
        </button>
        <button
          onClick={() => operatorHandler("-")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#FFA915]"
        >
          -
        </button>

        <button
          onClick={() => numHandler("1")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          1
        </button>
        <button
          onClick={() => numHandler("2")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          2
        </button>
        <button
          onClick={() => numHandler("3")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          3
        </button>
        <button
          onClick={() => operatorHandler("+")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#FFA915]"
        >
          +
        </button>
        <button
          onClick={() => numHandler("0")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          0
        </button>
        <button
          onClick={() => dotHandler(".")}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          .
        </button>

        <button
          onClick={clearHandler}
          className="font-semibold text-2xl w-14 h-14 rounded-full bg-[#767474] flex items-center justify-center"
        >
          <IoIosBackspace />
        </button>
        <button
          onClick={equalsHandler}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#FFA915]"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default CalculatorApp;
