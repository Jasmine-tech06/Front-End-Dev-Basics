import React, { useEffect, useState } from "react";
import {
  FaBackspace,
  FaHistory,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import Button from "./Button";
import Display from "./Display";
import History from "./History";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(true);

  const buttons = [
    "AC",
    "⌫",
    "%",
    "/",

    "7",
    "8",
    "9",
    "*",

    "4",
    "5",
    "6",
    "-",

    "1",
    "2",
    "3",
    "+",

    "+/-",
    "0",
    ".",
    "=",
  ];

  const clearAll = () => {
    setExpression("");
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const toggleSign = () => {
    if (!expression) return;

    if (expression.startsWith("-")) {
      setExpression(expression.substring(1));
    } else {
      setExpression("-" + expression);
    }
  };

  const calculate = () => {
    if (!expression) return;

    try {
      const answer = eval(expression).toString();

      setHistory((prev) => [
        `${expression} = ${answer}`,
        ...prev.slice(0, 9),
      ]);

      setExpression(answer);
    } catch {
      setExpression("Error");
    }
  };

  const handleClick = (value) => {
    switch (value) {
      case "AC":
        clearAll();
        break;

      case "⌫":
        backspace();
        break;

      case "=":
        calculate();
        break;

      case "+/-":
        toggleSign();
        break;

      default:
        setExpression((prev) => prev + value);
    }
  };

  useEffect(() => {
    const keyPress = (e) => {
      const key = e.key;

      if (
        /[0-9+\-*/.%]/.test(key)
      ) {
        setExpression((prev) => prev + key);
      }

      if (key === "Enter") {
        calculate();
      }

      if (key === "Backspace") {
        backspace();
      }

      if (key === "Escape") {
        clearAll();
      }
    };

    window.addEventListener("keydown", keyPress);

    return () =>
      window.removeEventListener(
        "keydown",
        keyPress
      );
  }, [expression]);

  return (
    <div
      className={`calculator-wrapper fade-in ${
        dark ? "dark" : "light"
      }`}
    >
      <div className="glass-card calculator">

        <div className="top-bar">

          <button
            className="theme-btn"
            onClick={() => setDark(!dark)}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>

          <button className="history-btn">
            <FaHistory />
          </button>

        </div>

        <Display value={expression || "0"} />

        <div className="buttons">

          {buttons.map((btn) => (
            <Button
              key={btn}
              value={btn}
              onClick={() =>
                handleClick(btn)
              }
            />
          ))}

        </div>

        <History history={history} />

      </div>
          </div>
  );
};

export default Calculator;