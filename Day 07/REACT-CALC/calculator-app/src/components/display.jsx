import React from "react";

const Display = ({ value }) => {
  return (
    <div className="display">
      <div className="display-text">
        {value}
      </div>
    </div>
  );
};

export default Display;