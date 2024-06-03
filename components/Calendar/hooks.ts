import { getRandomNumber } from '@/helpers/generateRandomNumber';
import { getRandomPastelColor } from '@/helpers/pastelColorGenerate';
import { useEffect, useState } from 'react';
import { EventType } from './types';

const useCalendar = () => {
  const [open, setOpen] = useState(false);
  const [currChosenDate, setCurrChosenDate] = useState<string>('');
  const [currChosenId, setCurrChosenId] = useState<string>('');
  const [events, setEvents] = useState<EventType[]>([]);

  const addEvent = (
    eventTitle: string,
    eventTime: string,
    eventEmail: string,
    date: string
  ) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!eventTitle || !eventTime || !eventEmail) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!emailPattern.test(eventEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const randomColor = getRandomPastelColor();
    const existingEvents: EventType[] | null = JSON.parse(
      localStorage.getItem('events') || '[]'
    );

    const eventsForDate = existingEvents?.filter(
      (event) => event.date === date
    );

    if (eventsForDate && eventsForDate.length >= 3) {
      alert('Maximum events for this date exceeded.');
      return;
    }

    existingEvents?.push({
      id: `${date?.replace(/-/g, '')}${getRandomNumber()}`,
      title: eventTitle,
      email: eventEmail,
      time: eventTime,
      date: date,
      color: randomColor,
    });

    localStorage.setItem('events', JSON.stringify(existingEvents));
    setOpen(false);
  };

  const editEvent = (
    eventTitle: string,
    eventTime: string,
    eventEmail: string,
    date: string,
    eventColor: string
  ) => {
    const existingEvents: EventType[] | null = JSON.parse(
      localStorage.getItem('events') || '[]'
    );
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const eventToEditIndex =
      existingEvents &&
      existingEvents.findIndex(
        (event) => event.date === date && event.id === currChosenId
      );

    if (eventToEditIndex === -1) {
      alert('Event not found.');
      return;
    }
    if (!eventTitle || !eventTime || !eventEmail) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!emailPattern.test(eventEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (existingEvents && eventToEditIndex !== null && eventToEditIndex >= 0) {
      existingEvents[eventToEditIndex] = {
        ...existingEvents[eventToEditIndex],
        title: eventTitle,
        email: eventEmail,
        time: eventTime,
        color: eventColor,
      };
    } else {
      console.error(
        'Invalid event index or events array is null:',
        eventToEditIndex,
        existingEvents
      );
    }

    localStorage.setItem('events', JSON.stringify(existingEvents));
    setOpen(false);
  };

  const deleteEvent = (id: string) => {
    const existingEvents: EventType[] | null = JSON.parse(
      localStorage.getItem('events') || '[]'
    );
    if (!existingEvents) {
      return;
    }
    const eventIdToRemove = id;

    const indexToRemove = existingEvents.findIndex(
      (event) => event.id === eventIdToRemove
    );

    if (indexToRemove !== -1) {
      existingEvents.splice(indexToRemove, 1);

      localStorage.setItem('events', JSON.stringify(existingEvents));
      setEvents(existingEvents);
    } else {
      alert('Event not found');
    }
  };

  useEffect(() => {
    const storedEventsString: string | null = localStorage.getItem('events');
    const storedEvents: EventType[] | null = storedEventsString
      ? JSON.parse(storedEventsString)
      : null;
    setEvents(storedEvents || []);
  }, []);

  useEffect(() => {
    if (!open) {
      setCurrChosenDate('');
      setCurrChosenId('');
      const storedEventsString: string | null = localStorage.getItem('events');
      const storedEvents: EventType[] | null = storedEventsString
        ? JSON.parse(storedEventsString)
        : null;
      setEvents(storedEvents || []);
    }
  }, [open]);

  return {
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
  };
};

export default useCalendar;
