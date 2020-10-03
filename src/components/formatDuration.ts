import { Duration } from "make-workout";

const splitDuration = (duration: Duration) => ({
  hours: Math.floor(duration.seconds / 60 / 60),
  minutes: Math.floor(duration.seconds / 60) % 60,
  seconds: duration.seconds % 60,
});

export const formatDuration = (duration: Duration): string => {
  const {hours, minutes, seconds} = splitDuration(duration);
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  else if (minutes > 0) {
    return `${minutes}min`;
  }
  else if (seconds > 0) {
    return `${seconds}sec`;
  }
  else {
    return `-`;
  }
};
