import { useEffect, useState } from 'react';

const useModal = ({ id, date }: { id: string; date: string }) => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventTime, setEventTime] = useState<string>('');
  const [eventEmail, setEventEmail] = useState<string>('');
  const [eventColor, setEventColor] = useState<string>('');

  useEffect(() => {
    if (id !== '' && date !== '') {
      const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
      const event = existingEvents.find(
        (event: any) => event.id === id && event.date === date
      );

      if (event) {
        setEventTitle(event.title ?? '');
        setEventTime(event.time ?? '');
        setEventEmail(event.email ?? '');
        setEventColor(event.color ?? '');
      }
    } else {
      setEventTitle('');
      setEventTime('');
      setEventEmail('');
      setEventColor('');
    }
  }, [id, date]);
  return {
    setEventTitle,
    setEventColor,
    setEventEmail,
    setEventTime,
    eventTitle,
    eventTime,
    eventEmail,
    eventColor,
  };
};

export default useModal;
