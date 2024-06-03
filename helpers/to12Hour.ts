export function formatTo12Hour(time24: string) {
  const [hour24, minute] = time24.split(':').map(Number);

  const period = hour24 >= 12 ? 'PM' : 'AM';

  const hour12 = hour24 % 12 || 12;

  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}
