export const  formatDateToReadable=(input)=> {
  if (!input) return "";

  let date;

  // Case 1: Date object
  if (input instanceof Date) {
    date = input;
  }

  // Case 2: Timestamp or normal string
  else if (!isNaN(new Date(input).getTime())) {
    date = new Date(input);
  }

  // Case 3: DD-MM-YYYY hh:mm AM/PM
  else {
    const match = input.match(
      /(\d{2})-(\d{2})-(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i
    );

    if (!match) return "Invalid Date";

    let [, day, month, year, hour, minute, period] = match;

    day = Number(day);
    month = Number(month) - 1;
    year = Number(year);
    hour = Number(hour);
    minute = Number(minute);

    if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0;

    date = new Date(year, month, day, hour, minute);
  }

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
