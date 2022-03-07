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

export const loadWorkout = (): string => {
    const text = localStorage.getItem("workout-editor-text");
    return (!text || text.trim() === "") ? defaultWorkout : text;
};

export const saveWorkout = (text: string) => localStorage.setItem("workout-editor-text", text);
