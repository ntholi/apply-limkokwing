import { Timestamp } from 'firebase/firestore';

export function formatMoney(value: number | undefined | null) {
  if (!value) return 'M 0.00';
  return `M${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function dateTime(date: Date | undefined | null | Timestamp) {
  if (!date) return '';
  const formatter = new Intl.DateTimeFormat('en-LS', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  try {
    if (date instanceof Timestamp) {
      return formatter.format(date.toDate());
    }
    return formatter.format(date);
  } catch (e) {
    console.error('Error formatting date', date);
    return 'Invalid Date';
  }
}
