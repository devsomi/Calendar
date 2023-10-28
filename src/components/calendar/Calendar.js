import React, { useState } from "react";
import MonthView from "../month-view/MonthView";
import DayView from "../day-view/DayView"; 
import YearView from "../year-view/YearView";
import "./Calendar.css";

function Calendar({ selectedDate, onDateChange }) {
  const [date, setDate] = useState(selectedDate || new Date());
  const [view, setView] = useState("day");
  const [yearRange, setYearRange] = useState("");
  const today = new Date();

  const toggleView = (newView) => {
    setView(newView);
  };

  const next = () => {
    const newDate = new Date(date);
    if (view === "day") {
      newDate.setMonth(date.getMonth() + 1);
    } else if (view === "month") {
      newDate.setFullYear(date.getFullYear() + 1);
    } else if (view === "year") {
      newDate.setFullYear(date.getFullYear() + 12);
    }
    setDate(newDate);
  };

  const previous = () => {
    const newDate = new Date(date);
    if (view === "day") {
      newDate.setMonth(date.getMonth() - 1);
    } else if (view === "month") {
      newDate.setFullYear(date.getFullYear() - 1);
    } else if (view === "year") {
      newDate.setFullYear(date.getFullYear() - 12);
    }
    setDate(newDate);
  };

  const handleYearSelection = (newYear) => {
    const newDate = new Date(date);
    newDate.setFullYear(newYear);
    setDate(newDate);
    setYearRange(`${newYear - 9} - ${newYear}`);
    setView('month'); 
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={previous}>&lt;</button>
        <span
          onClick={() => {
            if (view === "month") {
              toggleView("year");
            } else {
              toggleView("month");
            }
          }}
          className={`header-text ${view === "month" ? "selected" : ""}`}
        >
          {view === "year" ? (
            <span onClick={() => toggleView("month")} className="year-text">
              {yearRange}
            </span>
          ) : (
            `${
              date ? date.toLocaleString("default", { month: "short" }) : ""
            } ${date ? date.getFullYear() : ""}`
          )}
        </span>
        <button onClick={next}>&gt;</button>
      </div>
      {view === "day" && (
        <DayView
          key={date.toISOString()}
          date={date}
          today={today}
          selectedDate={selectedDate}
          setSelectedDate={onDateChange}
        />
      )}
      {view === "month" && (
        <MonthView
          date={date}
          onSelectMonth={(newMonth) => {
            const newDate = new Date(date);
            newDate.setMonth(newMonth);
            toggleView("day");
            setDate(newDate); // Update the date
          }}
        />
      )}
      {view === "year" && (
        <YearView
          currentYear={date ? date.getFullYear() : undefined}
          toggleMonthSelector={() => toggleView("month")}
          handleYearSelection={handleYearSelection}
          setYearRange={setYearRange}
        />
      )}
    </div>
  );
}

export default Calendar;
