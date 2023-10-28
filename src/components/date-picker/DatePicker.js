import React, { useState, useRef, useEffect } from 'react';
import Calendar from '../calendar/Calendar';
import './DatePicker.css';

const DatePicker = ({ selectedDate }) => {
  const [inputDate, setInputDate] = useState(formatDate(selectedDate));
  const [showCalendar, setShowCalendar] = useState(false);
  const inputRef = useRef(null);

  const handleDateChange = (newDate) => {
    setInputDate(formatDate(newDate));
    setShowCalendar(false);
  };

  const handleBlur = () => {
    const dateParts = inputDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    const newDate = new Date(year, month, day);

    if (!isNaN(newDate.getTime())) {
      handleDateChange(newDate);
    } else {
      setInputDate(formatDate(selectedDate));
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const closeCalendar = (e) => {
    if (showCalendar && inputRef.current && !inputRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', closeCalendar);
    return () => {
      window.removeEventListener('click', closeCalendar);
    };
  }, []);
  return (
    <div className="date-picker">
      <div className="input-container">
        <span
          className="calendar-icon"
          onClick={toggleCalendar}
        >
          <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        </span>
        
        <input
          type="text"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          onBlur={handleBlur}
          placeholder="YYYY-MM-DD"
          ref={inputRef}
        />
        {showCalendar && (
          <div className="calendar-dropdown">
            <Calendar
              selectedDate={selectedDate}
              onDateChange={handleDateChange} // Pass the onDateChange function
            />
          </div>
        )}
      </div>
    </div>
  );
};

const formatDate = (date) => {
  if (date instanceof Date && !isNaN(date)) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
};

export default DatePicker;



