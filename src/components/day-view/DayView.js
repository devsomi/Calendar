import React from 'react';
import './DayView.css';

function DayView({ date, today, setSelectedDate }) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const renderDays = () => {
    const days = [];
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    // Render days from the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1;
      const date = new Date(prevMonthYear, prevMonth, day);

      days.push(
        <div
          key={`prev${day}`}
          className="day prev-month extra"
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }

    // Render days for the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);

      days.push(
        <div
          key={`current${day}`}
          className={`day ${
            currentYear === today.getFullYear() &&
            currentMonth === today.getMonth() &&
            day === currentDay
              ? "today"
              : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }

    // Render days from the next month
    let nextMonthDay = 1;
    while (days.length < 42) {
      const date = new Date(currentYear, currentMonth + 1, nextMonthDay);

      days.push(
        <div
          key={`next${nextMonthDay}`}
          className="day next-month extra"
          onClick={() => setSelectedDate(date)}
        >
          {nextMonthDay}
        </div>
      );
      nextMonthDay++;
    }

    return days;
  };

  return (
    <div>
      <div className="weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday, index) => (
          <div key={index} className="weekday">
            {weekday}
          </div>
        ))}
      </div>
      <div className="days">
        {renderDays()}
      </div>
    </div>
  );
}

export default DayView;
