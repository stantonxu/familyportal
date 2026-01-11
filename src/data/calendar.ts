export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO date
  time?: string;
  location?: string;
  visibility: 'family' | 'public';
  notes?: string;
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Kids Soccer Practice',
    date: '2025-01-12',
    time: '17:00',
    location: 'Community Field',
    visibility: 'family',
    notes: 'Bring water and orange slices.'
  },
  {
    id: 'evt-2',
    title: 'Grandma Birthday Dinner',
    date: '2025-01-15',
    time: '18:30',
    location: 'Home',
    visibility: 'family',
    notes: 'Cake pickup at 17:00.'
  },
  {
    id: 'evt-3',
    title: 'Science Club',
    date: '2025-01-18',
    time: '15:00',
    location: 'Library',
    visibility: 'public',
    notes: 'Open invite; bring your projects.'
  },
  {
    id: 'evt-4',
    title: 'Weekend Hike',
    date: '2025-01-20',
    time: '08:00',
    location: 'Pine Ridge Trailhead',
    visibility: 'family',
    notes: 'Pack cocoa; weather looks clear.'
  }
];
