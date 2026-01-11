import type { Metadata } from 'next';
import Link from 'next/link';
import { calendarEvents } from '../../data/calendar';

export const metadata: Metadata = {
  title: 'Family Calendar',
  description: 'Shared family calendar for events, classes, and tasks.'
};

type DayCell = {
  date: Date;
  inCurrentMonth: boolean;
  events: typeof calendarEvents;
};

export default function CalendarPage() {
  const today = new Date();
  const grid = buildMonthGrid(today.getFullYear(), today.getMonth());

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/25">
        <p className="text-xs uppercase tracking-[0.2em] text-sun-200">Calendar</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Family Schedule</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-100">
          Family events stay private by default; public events show a gold badge. Sign in to add,
          edit, or RSVP once authentication is connected.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/25">
          <MonthGrid cells={grid} />
        </div>
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/25">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Upcoming</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              Read-only
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-100">
            Sign in to add or edit events. For now, this list is public so the family can preview
            the month.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {calendarEvents
              .slice()
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-md shadow-black/25"
                >
                  <p className="text-sm font-semibold text-white">{event.title}</p>
                  <p className="text-xs text-ink-100">
                    {formatDate(event.date)}
                    {event.time ? ` · ${event.time}` : ''}
                    {event.location ? ` · ${event.location}` : ''}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-ink-100">
                    <span
                      className={`rounded-full px-2 py-1 font-semibold ${
                        event.visibility === 'family'
                          ? 'bg-ink-800 text-sun-100'
                          : 'bg-sun-300 text-ink-900'
                      }`}
                    >
                      {event.visibility}
                    </span>
                    {event.notes ? <span>{event.notes}</span> : null}
                  </div>
                </div>
              ))}
          </div>
        </aside>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-ink-100 shadow-xl shadow-black/25">
        <p className="font-semibold text-white">Access control plan</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Use auth provider (Auth.js/Firebase/Cognito) for sign-in and session.</li>
          <li>Store family-only events with a visibility flag; filter server-side for members.</li>
          <li>Public events can be shared as read-only; editing requires membership.</li>
        </ul>
        <Link
          href="/"
          className="mt-3 inline-flex text-sun-200 underline underline-offset-4 hover:text-sun-100"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function MonthGrid({ cells }: { cells: DayCell[] }) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div>
      <div className="grid grid-cols-7 gap-2 px-2 pb-2 text-xs uppercase tracking-[0.1em] text-sun-200">
        {weekDays.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell) => (
          <div
            key={cell.date.toISOString()}
            className={`min-h-[110px] rounded-2xl border border-white/10 bg-white/5 p-2 text-sm shadow-md shadow-black/20 ${
              cell.inCurrentMonth ? 'text-white' : 'text-ink-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{cell.date.getDate()}</span>
              {cell.events.some((e) => e.visibility === 'public') ? (
                <span className="rounded-full bg-sun-300 px-2 py-0.5 text-[10px] font-semibold text-ink-900">
                  Public
                </span>
              ) : null}
            </div>
            <div className="mt-2 space-y-2">
              {cell.events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg bg-white/10 px-2 py-1 text-[11px] text-ink-100"
                  title={event.notes}
                >
                  <p className="font-semibold text-white">{event.title}</p>
                  <p className="text-[10px] text-ink-200">
                    {event.time ?? 'All day'}
                    {event.location ? ` · ${event.location}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function buildMonthGrid(year: number, monthIndex: number): DayCell[] {
  const start = new Date(year, monthIndex, 1);
  const end = new Date(year, monthIndex + 1, 0);
  const startDay = start.getDay();
  const daysInMonth = end.getDate();

  const cells: DayCell[] = [];
  const calendarByDate = groupEvents(calendarEvents);

  // Previous month filler
  const prevMonthEnd = new Date(year, monthIndex, 0).getDate();
  for (let i = startDay - 1; i >= 0; i -= 1) {
    const date = new Date(year, monthIndex - 1, prevMonthEnd - i);
    cells.push({ date, inCurrentMonth: false, events: calendarByDate[getKey(date)] ?? [] });
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, monthIndex, day);
    cells.push({ date, inCurrentMonth: true, events: calendarByDate[getKey(date)] ?? [] });
  }

  // Next month filler to complete weeks
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    const date = new Date(year, monthIndex + 1, nextDay);
    cells.push({ date, inCurrentMonth: false, events: calendarByDate[getKey(date)] ?? [] });
    nextDay += 1;
  }

  return cells;
}

function groupEvents(events: typeof calendarEvents) {
  return events.reduce<Record<string, typeof calendarEvents>>((acc, event) => {
    const key = getKey(new Date(event.date));
    acc[key] = acc[key] ? [...acc[key], event] : [event];
    return acc;
  }, {});
}

function getKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}
