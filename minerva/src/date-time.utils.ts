/**
 * Formats a date into a string representation.
 * @param date The date to format.
 * @returns The formatted date string.
 */
export function formatDate(date: Date): string {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()]; // Get the month name based on the month index
  const day = date.getDate(); // Get the day of the month
  const hour = date.getHours(); // Get the hour of the day
  const minute = date.getMinutes(); // Get the minute of the hour
  const isAM = hour < 12; // Check if it's AM or PM
  const formattedHour = ((hour + 11) % 12 + 1); // Format the hour to 12-hour format
  const formattedMinute = minute < 10 ? `0${minute}` : minute; // Add leading zero if minute is less than 10

  return `${month} ${day}, ${formattedHour}:${formattedMinute} ${isAM ? "AM" : "PM"} EST`; // Return the formatted date string
}

/**
 * Calculates the time difference between two dates in days and hours.
 * @param now The current date.
 * @param pastDate The past date.
 * @returns The time difference in days and hours.
 */
export function getTimeSinceInDaysHours(now: Date, pastDate: Date): string {
  const timeDifference = now.getTime() - pastDate.getTime(); // Calculate the time difference in milliseconds
  if (timeDifference < 0) {
    return "0 days and 0 hours"; // Return 0 days and 0 hours if the past date is in the future
  }

  const totalHours = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
  const days = Math.floor(totalHours / 24); // Calculate the number of days
  const remainingHours = totalHours % 24; // Calculate the remaining hours

  return `${days} days and ${remainingHours} hours`; // Return the time difference in days and hours
}

/**
 * Calculates the time remaining between a start date and an end date in days and hours.
 * @param start The start date.
 * @param endtime The end date.
 * @returns The time remaining in days and hours.
 */
export function getTimeRemainingInDaysHours(start: Date, endtime: Date): string {
  const totalTime = endtime.getTime() - start.getTime(); // Calculate the total time in milliseconds
  const totalHours = Math.floor(totalTime / (1000 * 60 * 60)); // Convert milliseconds to hours
  const days = Math.floor(totalHours / 24); // Calculate the number of days
  const remainingHours = totalHours % 24; // Calculate the remaining hours

  return `${days} days and ${remainingHours} hours`; // Return the time remaining in days and hours
}