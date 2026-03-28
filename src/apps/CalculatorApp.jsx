import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [resultmode, setResultmode] = useState(false);
  const operators = ["+", "-", "x", "/", "÷", "*"];
  const activeWindow = useSelector((state) => state.window.activeWindow);

  useEffect(() => {
    function handleKeyDown(e) {
      if (activeWindow !== "calculator") return;

      if (e.key >= "0" && e.key <= "9") {
        numHandler(e.key);
      } else if (operators.includes(e.key)) {
        e.preventDefault();
        operatorHandler(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        deleteHandler();
      } else if (e.key === "Escape") {
        clearHandler();
      } else if (e.key === "Enter") {
        e.preventDefault();
        equalsHandler();
      } else if (e.key === ".") {
        dotHandler();
      } else if (e.key === "%") {
        e.preventDefault();
        percentHandler();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeWindow, display, resultmode]);

  const numHandler = (num) => {
    if (display === "Error") {
      setDisplay(num);
      return;
    }
    if (resultmode === true) {
      setDisplay(num);
      setResultmode(false);
      return;
    }

    setDisplay((prev) => {
      if (prev === "0") return num;
      return prev + num;
    });
  };

  const dotHandler = () => {
    setDisplay((prev) => {
      if (prev === "Error") return prev;

      // find last operator position
      let lastOpIndex = -1;
      for (let op of operators) {
        const idx = prev.lastIndexOf(op);
        if (idx > lastOpIndex) lastOpIndex = idx;
      }

      // last number part
      const lastNumber = prev.slice(lastOpIndex + 1);

      // block if dot already in last number
      if (lastNumber.includes(".")) return prev;

      // start decimal properly
      if (prev === "0" || operators.includes(prev.slice(-1))) {
        return prev + "0.";
      }

      return prev + ".";
    });
  };

  const operatorHandler = (op) => {
    setResultmode(false);
    setDisplay((prev) => {
      if (prev === "Error") return;
      if (prev === "0") return;
      const lastChar = prev.slice(-1);
      if (operators.includes(lastChar)) return prev.slice(0, -1) + op;
      return prev + op;
    });
  };

  const equalsHandler = () => {
    setDisplay((prev) => {
      const lastChar = prev.slice(-1);

      if (prev === "Error") return prev;
      if (operators.includes(lastChar)) return prev;

      try {
        const result = eval(prev);

        if (isFinite(result)) {
          setResultmode(true);
          return String(result);
        } else {
          setResultmode(false);
          return "Error";
        }
      } catch {
        setResultmode(false);
        return "Error";
      }
    });
  };

  const clearHandler = () => {
    setDisplay("0");
  };

  const deleteHandler = () => {
    setDisplay((prev) => {
      if (prev.length === 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const percentHandler = () => {
    setDisplay((prev) => {
      if (prev === "Error") return prev;

      let foundOperator = null;
      let operatorIndex = -1;

      for (let op of operators) {
        const idx = prev.indexOf(op);
        if (idx !== -1) {
          foundOperator = op;
          operatorIndex = idx;
          break;
        }
      }

      // standalone %
      if (operatorIndex === -1) {
        return String(Number(prev) / 100);
      }

      // invalid positions
      if (operatorIndex === 0 || operatorIndex === prev.length - 1) {
        return prev;
      }

      const firstStr = prev.slice(0, operatorIndex);
      const secondStr = prev.slice(operatorIndex + 1);

      if (secondStr === "") return prev;

      const firstNum = Number(firstStr);
      const secondNum = Number(secondStr);

      let percentValue;

      if (foundOperator === "+" || foundOperator === "-") {
        percentValue = (firstNum * secondNum) / 100;
      } else if (foundOperator === "*" || foundOperator === "/") {
        percentValue = secondNum / 100;
      } else {
        return prev;
      }

      return String(firstNum + foundOperator + percentValue);
    });
  };

  const plusMinusHandler = () => {
    if (display === "Error") return;
    if (display.charAt(0) === "-") {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  };

  return (
    <div className="w-full h-full bg-[#2E2D2D] rounded-xl text-white p-4 ">
      <div className="text-right font-semibold text-6xl leading-none mb-3 overflow-x-hidden overflow-y-hidden whitespace-nowrap hide-scrollba">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={clearHandler}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          AC
        </button>

        <button
          onClick={deleteHandler}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474] "
        >
          C
        </button>
        <button
          onClick={percentHandler}
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
          onClick={plusMinusHandler}
          className="font-semibold text-xl w-14 h-14 rounded-full bg-[#767474]"
        >
          ±
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
