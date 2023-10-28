import React, { useState, useEffect } from 'react';
import './YearView.css';

function YearView({ currentYear, toggleMonthSelector, handleYearSelection, setYearRange }) {
  const startYear = currentYear - (currentYear % 10);
  const endYear = startYear + 9;
  const yearRange = `${startYear} - ${endYear}`;

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const selectYear = (year) => {
    if (year < startYear || year > endYear) {
      return; // Do not allow selecting years outside the decade
    }
    setSelectedYear(year);
    handleYearSelection(year);
    toggleMonthSelector();
  };

  useEffect(() => {
    setYearRange(yearRange);
  }, [yearRange, setYearRange]);

  return (
    <div className="year-selector">
      <div className="year-options">
        {Array.from({ length: 12 }, (_, i) => startYear + i).map((year) => (
          <div
            key={year}
            className={`year-option ${selectedYear === year ? "selected" : ""} ${
              year < startYear || year > endYear ? "outside-decade" : ""
            }`}
            onClick={() => selectYear(year)}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
}

export default YearView;
