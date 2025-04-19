const daysDifference = (dateString: string) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  const targetDate = new Date();
  targetDate.setDate(currentDate.getDate());

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);

  return Math.floor(dayDifference);
};

export default daysDifference;
