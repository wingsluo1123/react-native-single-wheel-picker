export const FULL_MINUTES = Array.from(
  { length: 60 },
  (_, minute) => minute.toString().padStart(2, '0'),
);
