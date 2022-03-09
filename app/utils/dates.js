export const getWeek = date => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const isToday = date => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isCurrentWeek = date => {
  const today = new Date();
  return (
    getWeek(date) === getWeek(today) &&
    date.getFullYear() === today.getFullYear()
  );
};

export const checkDate = date => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isCurrentWeek(date)) {
    return 'This week';
  }
  return 'Before this week';
};
