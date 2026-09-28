// Dummy course catalog for the swap board's picker. Nothing here is real ANU
// data or persisted anywhere — it only drives the client-side course →
// tutorial → week → timeslot cascade before a swap is posted as plain text,
// same as before.
//
// A swap is only ever between two sessions of the same tutorial in the same
// week (you can't offer a week-3 slot for a week-7 one), so "week" is picked
// once and "timeslot" means one of that tutorial's weekday sessions within
// it — e.g. a tutorial that runs Monday, Wednesday and Thursday each week.

export type Session = {
  day: number; // 1 = Monday .. 5 = Friday
  start: string;
  end: string;
};

export type Tutorial = {
  name: string;
  sessions: Session[];
};

export type Course = {
  code: string;
  title: string;
  tutorials: Tutorial[];
};

export const COURSES: Course[] = [
  {
    code: "COMP1100",
    title: "Introduction to Programming",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 1, start: "10:00", end: "11:00" },
          { day: 3, start: "10:00", end: "11:00" },
          { day: 4, start: "10:00", end: "11:00" },
        ],
      },
      {
        name: "Tutorial B",
        sessions: [
          { day: 2, start: "14:00", end: "15:00" },
          { day: 4, start: "14:00", end: "15:00" },
        ],
      },
      {
        name: "Tutorial C",
        sessions: [
          { day: 1, start: "09:00", end: "10:00" },
          { day: 5, start: "09:00", end: "10:00" },
        ],
      },
    ],
  },
  {
    code: "COMP2100",
    title: "Software Design Methodologies",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 2, start: "11:00", end: "12:00" },
          { day: 4, start: "11:00", end: "12:00" },
        ],
      },
      {
        name: "Tutorial B",
        sessions: [{ day: 3, start: "15:00", end: "16:00" }],
      },
    ],
  },
  {
    code: "COMP3600",
    title: "Algorithms",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 1, start: "13:00", end: "14:00" },
          { day: 3, start: "13:00", end: "14:00" },
        ],
      },
      {
        name: "Tutorial B",
        sessions: [{ day: 5, start: "16:00", end: "17:00" }],
      },
    ],
  },
  {
    code: "COMP4020",
    title: "Agentic Coding Studio",
    tutorials: [
      {
        name: "Studio",
        sessions: [{ day: 1, start: "15:30", end: "17:00" }],
      },
    ],
  },
  {
    code: "ENGN2225",
    title: "Mechanics of Solids",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 2, start: "09:00", end: "10:00" },
          { day: 4, start: "09:00", end: "10:00" },
        ],
      },
      {
        name: "Tutorial B",
        sessions: [{ day: 5, start: "10:00", end: "11:00" }],
      },
    ],
  },
  {
    code: "ENGN3213",
    title: "Signals and Systems",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 3, start: "11:00", end: "12:00" },
          { day: 5, start: "11:00", end: "12:00" },
        ],
      },
    ],
  },
  {
    code: "ENGN4200",
    title: "Engineering Design",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 1, start: "09:00", end: "11:00" },
          { day: 2, start: "09:00", end: "11:00" },
        ],
      },
    ],
  },
  {
    code: "ARTV1002",
    title: "Introduction to Photography",
    tutorials: [
      {
        name: "Studio A",
        sessions: [
          { day: 2, start: "13:00", end: "15:00" },
          { day: 4, start: "13:00", end: "15:00" },
        ],
      },
      {
        name: "Studio B",
        sessions: [{ day: 5, start: "13:00", end: "15:00" }],
      },
    ],
  },
  {
    code: "ARTV2107",
    title: "Digital Media Practices",
    tutorials: [
      {
        name: "Studio A",
        sessions: [
          { day: 3, start: "09:00", end: "11:00" },
          { day: 4, start: "09:00", end: "11:00" },
        ],
      },
    ],
  },
  {
    code: "ARTV3110",
    title: "Sculpture Studio",
    tutorials: [
      {
        name: "Studio A",
        sessions: [{ day: 5, start: "10:00", end: "12:00" }],
      },
    ],
  },
  {
    code: "EMSC1006",
    title: "Introduction to Earth Sciences",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 1, start: "11:00", end: "12:00" },
          { day: 3, start: "11:00", end: "12:00" },
        ],
      },
      {
        name: "Tutorial B",
        sessions: [{ day: 4, start: "10:00", end: "11:00" }],
      },
    ],
  },
  {
    code: "EMSC2019",
    title: "Structural Geology",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 2, start: "14:00", end: "16:00" },
          { day: 5, start: "14:00", end: "16:00" },
        ],
      },
    ],
  },
  {
    code: "EMSC3025",
    title: "Environmental Hazards",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [{ day: 4, start: "09:00", end: "10:00" }],
      },
    ],
  },
  {
    code: "HIST1002",
    title: "Ideas that Made the World",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 2, start: "10:00", end: "11:00" },
          { day: 4, start: "10:00", end: "11:00" },
        ],
      },
      {
        name: "Tutorial B",
        sessions: [{ day: 5, start: "11:00", end: "12:00" }],
      },
    ],
  },
  {
    code: "HIST2038",
    title: "Modern Australia",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [
          { day: 3, start: "15:00", end: "16:00" },
          { day: 5, start: "15:00", end: "16:00" },
        ],
      },
    ],
  },
  {
    code: "HIST3041",
    title: "History of Science",
    tutorials: [
      {
        name: "Tutorial A",
        sessions: [{ day: 4, start: "11:00", end: "12:00" }],
      },
    ],
  },
];

export function courseLabel(course: Course): string {
  return `${course.code} — ${course.title}`;
}

export function findCourse(label: string): Course | undefined {
  return COURSES.find((course) => courseLabel(course) === label);
}

export function findTutorial(
  course: Course,
  name: string,
): Tutorial | undefined {
  return course.tutorials.find((tutorial) => tutorial.name === name);
}

// A 12-week teaching semester, starting the Monday of week 1. Dummy dates,
// not the real ANU calendar — just enough to anchor "week 3" to an actual
// date range so a week picker means something concrete.
const SEMESTER_START = new Date(2026, 6, 20); // Mon 20 Jul 2026
export const WEEK_COUNT = 12;

export type Week = {
  number: number;
  start: Date;
  end: Date;
};

export const WEEKS: Week[] = Array.from({ length: WEEK_COUNT }, (_, i) => {
  const start = new Date(SEMESTER_START);
  start.setDate(start.getDate() + i * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 4); // Friday of the same week
  return { number: i + 1, start, end };
});

export function findWeek(number: number): Week | undefined {
  return WEEKS.find((week) => week.number === number);
}

const weekDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
});

export function weekLabel(week: Week): string {
  return `Week ${week.number} (${weekDateFormatter.format(week.start)} – ${weekDateFormatter.format(week.end)})`;
}

const slotDateFormatter = new Intl.DateTimeFormat("en-AU", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

// A tutorial's sessions dated into a specific week — "timeslot" means one of
// these, not a different week's occurrence of the same day.
export function weekSessions(
  tutorial: Tutorial,
  week: Week,
): { value: string; date: Date; session: Session }[] {
  return tutorial.sessions.map((session) => {
    const date = new Date(week.start);
    date.setDate(date.getDate() + (session.day - 1));
    return {
      value: `${slotDateFormatter.format(date)}, ${session.start}–${session.end}`,
      date,
      session,
    };
  });
}

export function slotLabel(
  course: Course,
  tutorial: Tutorial,
  week: Week,
  slot: { value: string },
): string {
  return `${course.code} ${tutorial.name} — Week ${week.number}, ${slot.value}`;
}
