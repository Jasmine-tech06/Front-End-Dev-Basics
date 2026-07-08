import { useState } from "react";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);

  const addValue = (val) => {
    setInput((prev) => prev + val);
  };

  const clear = () => setInput("");

  const calculate = () => {
    try {
      const result = eval(input).toString();

      setHistory((prev) => [
        { expression: input, result },
        ...prev,
      ]);

      setInput(result);
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="app">

      {/* BACKGROUND GLOW */}
      <div className="glow g1"></div>
      <div className="glow g2"></div>
      <div className="glow g3"></div>

      {/* CALCULATOR */}
      <div className="calculator">

        <div className="top">
          <h2>Neon Calc</h2>
          <button onClick={() => setOpenHistory(!openHistory)}>
            History
          </button>
        </div>

        <div className="display">
          <span>{input || "0"}</span>
        </div>

        <div className="buttons">
          <button className="clear" onClick={clear}>AC</button>
          <button onClick={() => addValue("/")}>/</button>
          <button onClick={() => addValue("*")}>*</button>
          <button onClick={() => addValue("-")}>-</button>

          <button onClick={() => addValue("7")}>7</button>
          <button onClick={() => addValue("8")}>8</button>
          <button onClick={() => addValue("9")}>9</button>
          <button onClick={() => addValue("+")}>+</button>

          <button onClick={() => addValue("4")}>4</button>
          <button onClick={() => addValue("5")}>5</button>
          <button onClick={() => addValue("6")}>6</button>

          <button onClick={() => addValue("1")}>1</button>
          <button onClick={() => addValue("2")}>2</button>
          <button onClick={() => addValue("3")}>3</button>

          <button onClick={() => addValue("0")}>0</button>
          <button onClick={() => addValue(".")}>.</button>

          <button className="equal" onClick={calculate}>=</button>
        </div>
      </div>

      {/* HISTORY PANEL */}
      <div className={`history ${openHistory ? "show" : ""}`}>
        <h3>Calculation History</h3>

        {history.length === 0 ? (
          <p className="empty">Nothing here yet ✨</p>
        ) : (
          history.map((h, i) => (
            <div key={i} className="item">
              <span>{h.expression}</span>
              <b>= {h.result}</b>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;