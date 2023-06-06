export const getFormattedFullDate = (date?: string | null): string => {
  if (!date) {
    return '-';
  }

  return `${getFormattedDate(date)} - ${getFormattedTime(date)}`;
};

export const getFormattedTableTimestamp = (date?: any): string => {
  if (!date) {
    return '-';
  }

  return date.includes('T')
    ? `${getFormattedDate(date).replace(/-/g, '/')} - ${getFormattedTime(
        date,
        false,
      )}`
    : getFormattedDate(date).replace(/-/g, '/');
};

export const getFormattedTime = (
  date?: string | null,
  hour12 = true,
): string => {
  if (!date) {
    return '-';
  }

  return new Date(date).toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: hour12 ? 'h11' : 'h23',
  });
};

export const getFormattedDate = (date?: string | null): string => {
  if (!date) {
    return '-';
  }

  return new Date(date).toLocaleDateString('sv-SE', {
    timeZone: 'Australia/Sydney',
  });
};

export const resetTime = (timestamp: Date) => {
  const res = new Date(timestamp);

  res.setHours(0);
  res.setMinutes(0);
  res.setSeconds(0);
  res.setMilliseconds(0);

  return res;
};

export const getDisplayDate = (date: string | null) => {
  if (!date) {
    return null;
  }

  const newDate = new Date();

  const today = newDate.toLocaleDateString('sv-SE', {
    timeZone: 'Australia/Sydney',
  });

  const compareDate = new Date(date).toLocaleDateString('sv-SE', {
    timeZone: 'Australia/Sydney',
  });

  if (today === compareDate) {
    return 'Today';
  }

  newDate.setDate(newDate.getDate() - 1);

  const yesterday = newDate.toLocaleDateString('sv-SE', {
    timeZone: 'Australia/Sydney',
  });

  if (yesterday === compareDate) {
    return 'Yesterday';
  }

  return compareDate;
};

export const getCurrentDate = () =>
  new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Australia/Sydney',
  });
