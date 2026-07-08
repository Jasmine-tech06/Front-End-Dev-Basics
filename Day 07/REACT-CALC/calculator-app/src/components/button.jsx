import React from "react";

const Button = ({ value, onClick }) => {
  const getClass = () => {
    switch (value) {
      case "=":
        return "btn equal";

      case "AC":
        return "btn clear";

      case "⌫":
        return "btn delete";

      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        return "btn operator";

      default:
        return "btn";
    }
  };

  return (
    <button
      className={getClass()}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;