export const initialEvents = [
  { id: "event-1", title: "Team Stand-up", date: "2026-08-17", hour: 9, duration: 1, type: "meeting" },
  { id: "event-2", title: "UI Performance Review", date: "2026-08-17", hour: 11, duration: 2, type: "focus" },
  { id: "event-3", title: "Database Sync", date: "2026-08-18", hour: 10, duration: 1, type: "system" },
  { id: "event-4", title: "Frontend Testing", date: "2026-08-19", hour: 14, duration: 2, type: "focus" },
  { id: "event-5", title: "Project Discussion", date: "2026-08-20", hour: 12, duration: 1, type: "meeting" },
  { id: "event-6", title: "Deployment Check", date: "2026-08-21", hour: 15, duration: 1, type: "system" },
  { id: "event-7", title: "Sprint Planning", date: "2026-08-22", hour: 10, duration: 2, type: "meeting" }
];

export const weekDays = [
  { date: "2026-08-17", label: "MON", number: 17 },
  { date: "2026-08-18", label: "TUE", number: 18 },
  { date: "2026-08-19", label: "WED", number: 19 },
  { date: "2026-08-20", label: "THU", number: 20 },
  { date: "2026-08-21", label: "FRI", number: 21 },
  { date: "2026-08-22", label: "SAT", number: 22 },
  { date: "2026-08-23", label: "SUN", number: 23 }
];

export const hours = Array.from({ length: 10 }, (_, index) => index + 8);