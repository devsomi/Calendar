import React from 'react';
import './MonthView.css'

function MonthView({ date, onSelectMonth,  }) {
  const currentMonth = date.getMonth();
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const handleMonthClick = (index) => {
    onSelectMonth(index);
  };

  return (
    <div className="month-selector">
      {months.map((month, index) => (
        <div
          key={index}
          className={`month-option ${currentMonth === index ? "selected" : ""}`}
          onClick={() => handleMonthClick(index)}
        >
          {month}
        </div>
      ))}
    </div>
  );
}

export default MonthView;
