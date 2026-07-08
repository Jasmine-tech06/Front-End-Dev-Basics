import React from "react";

const History = ({ history }) => {
  return (
    <div className="history-container">
      <h3 className="history-title">Calculation History</h3>

      {history.length === 0 ? (
        <p className="empty-history">
          No calculations yet...
        </p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;