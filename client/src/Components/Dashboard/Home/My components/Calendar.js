import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import './Calendar.css'; // Add some basic styles
import { NavLink } from "react-router-dom";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="calendar-days">
        {days.map((day) => (
          <div key={day} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const currentDate = new Date();
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="calendar-cells">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`calendar-cell ${isSameMonth(day, currentMonth) ? '' : 'disabled'} ${isToday(day) ? 'today' : ''}`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="calendar-container">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div className='button'>
        <NavLink to="/dashboard/meeting">
          <button className="try-button">Schedule Meeting</button>
        </NavLink>
      </div>
    </>
  );
};

export default Calendar;
