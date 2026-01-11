import Link from 'next/link';
import { calendarEvents } from '../data/calendar';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function CalendarPreview() {
  const now = new Date();
  const currentMonthName = MONTH_NAMES[now.getMonth()];
  const upcoming = calendarEvents
    .filter((event) => new Date(event.date) >= startOfDay(now))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-md shadow-black/25">
        <p className="text-xs uppercase tracking-[0.2em] text-sun-200">Month</p>
        <h3 className="mt-2 text-3xl font-semibold text-white">{currentMonthName}</h3>
        <p className="mt-2 text-sm text-ink-100">
          Family calendar is private by default; public events are marked below.
        </p>
        <Link
          href="/calendar"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sun-100 underline underline-offset-4"
        >
          Open calendar
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-md shadow-black/25">
        <p className="text-xs uppercase tracking-[0.2em] text-sun-200">Upcoming</p>
        <div className="mt-3 flex flex-col gap-3">
          {upcoming.map((event) => (
            <div
              key={event.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div>
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <p className="text-xs text-ink-100">
                  {formatDate(event.date)}
                  {event.time ? ` · ${event.time}` : ''}
                  {event.location ? ` · ${event.location}` : ''}
                </p>
                {event.notes ? <p className="text-xs text-ink-100">{event.notes}</p> : null}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                  event.visibility === 'family'
                    ? 'bg-ink-800 text-sun-100'
                    : 'bg-sun-300 text-ink-900'
                }`}
              >
                {event.visibility}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}
