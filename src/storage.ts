const defaultWorkout = `Name: Sample workout
Description: Try changing it, and see what happens below.

Warmup: 10:00 30%..75%
Interval: 15:00 100% 90rpm
  @ 00:00 Start off easy
  @ 01:00 Settle into rhythm
  @ 07:30 Half way through
  @ 14:00 Final minute, stay strong!
Rest: 10:00 75%
FreeRide: 20:00
  @ 00:10 Just have some fun, riding as you wish
Cooldown: 10:00 70%..30%
`;

const loadFromUrlHash = (): string | undefined => {
  if (document.location.hash) {
    // Skip the leading '#' when decoding
    return decodeURIComponent(document.location.hash.slice(1));
  }
  return undefined;
};

const loadFromLocalStorage = (): string | undefined => {
  const text = localStorage.getItem("workout-editor-text");
  return !text || text.trim() === "" ? undefined : text;
};

export const loadWorkout = (): string => {
  return loadFromUrlHash() ?? loadFromLocalStorage() ?? defaultWorkout;
};

export const saveWorkout = (text: string) => localStorage.setItem("workout-editor-text", text);
