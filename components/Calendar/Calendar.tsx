'use client';
import React from 'react';
import useCalendar from './hooks';
import { PencilSimple, Trash } from 'phosphor-react';
import { days, monthNames } from '@/constants/days';
import Modal from '../Modal/Modal';
import { formatTo12Hour } from '@/helpers/to12Hour';

const Calendar = () => {
  const {
    addEvent,
    deleteEvent,
    editEvent,
    events,
    open,
    setOpen,
    currChosenDate,
    currChosenId,
    setCurrChosenDate,
    setCurrChosenId,
  } = useCalendar();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div
          className={`empty-cell border-y-[1px] border-black  ${
            i === firstDayOfMonth - 1 ? ' border-r-[1px]' : ''
          }${i === 0 ? ' border-l-[1px]' : ''}`}
          key={`empty-${i}`}
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const year = currentYear;
      const month = currentMonth + 1;
      const dayFormatted = day < 10 ? `0${day}` : day;
      const date = `${year}-${
        month < 10 ? `0${month}` : month
      }-${dayFormatted}`;
      const eventsForDay = events?.filter((event) => event.date === date);

      const dayCell = (
        <div
          className="day-cell h-44 overflow-auto hide-scrollbar border-[1px] border-black hover:bg-white"
          key={day}
          onClick={() => {
            setCurrChosenId('');
            setCurrChosenDate(
              `${currentYear}-${
                currentMonth + 1 < 10
                  ? `0${currentMonth + 1}`
                  : currentMonth + 1
              }-${day < 10 ? `0${day}` : day}`
            );
            setOpen(true);
          }}
        >
          <div className="day text-left p-2 font-bold">{day}</div>
          {eventsForDay.map((event, index) => (
            <div
              style={{ background: event.color }}
              className={`event flex items-center justify-between text-xs rounded-sm`}
              key={`event-${index}`}
            >
              <div className="flex flex-col justify-center">
                <span>{event.title}</span>
                <span>{event.email}</span>
                <span>{formatTo12Hour(event.time)}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrChosenId(event.id);
                    setCurrChosenDate(
                      `${currentYear}-${
                        currentMonth + 1 < 10
                          ? `0${currentMonth + 1}`
                          : currentMonth + 1
                      }-${day < 10 ? `0${day}` : day}`
                    );
                    setOpen(true);
                  }}
                  className="border-2 bg-white hover:bg-[#F4F4F4]"
                >
                  <PencilSimple size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEvent(event.id);
                  }}
                  className="border-2 bg-white hover:bg-[#F4F4F4]"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      );

      calendarDays.push(dayCell);
    }

    return (
      <div className="calendar-grid grid grid-cols-7 bg-zinc-300">
        {days.map((day, idx) => {
          return (
            <div
              key={idx}
              className="day-header text-center bg-black text-white pb-3"
            >
              {day}
            </div>
          );
        })}

        {calendarDays}
      </div>
    );
  };

  return (
    <div className="calendar flex flex-col">
      <span className="text-center text-3xl text-black bg-white">{`${monthNames[currentMonth]} ${currentYear}`}</span>
      {renderCalendar()}
      <Modal
        open={open}
        setOpen={setOpen}
        date={currChosenDate || ''}
        id={currChosenId || ''}
        addEvent={addEvent}
        editEvent={editEvent}
      />
    </div>
  );
};

export default Calendar;
