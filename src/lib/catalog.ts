// Dummy course catalog for the swap board's picker. Nothing here is real ANU
// data or persisted anywhere — it only drives the client-side course →
// tutorial → timeslot cascade before a swap is posted as plain text, same as
// before.

export type Tutorial = {
  name: string;
  day: number; // 1 = Monday .. 5 = Friday
  start: string;
  end: string;
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
      { name: "Tutorial A", day: 1, start: "10:00", end: "11:00" },
      { name: "Tutorial B", day: 3, start: "14:00", end: "15:00" },
      { name: "Tutorial C", day: 5, start: "09:00", end: "10:00" },
    ],
  },
  {
    code: "COMP2100",
    title: "Software Design Methodologies",
    tutorials: [
      { name: "Tutorial A", day: 2, start: "11:00", end: "12:00" },
      { name: "Tutorial B", day: 4, start: "15:00", end: "16:00" },
    ],
  },
  {
    code: "COMP3600",
    title: "Algorithms",
    tutorials: [
      { name: "Tutorial A", day: 1, start: "13:00", end: "14:00" },
      { name: "Tutorial B", day: 3, start: "16:00", end: "17:00" },
    ],
  },
  {
    code: "COMP4020",
    title: "Agentic Coding Studio",
    tutorials: [{ name: "Studio", day: 1, start: "15:30", end: "17:00" }],
  },
  {
    code: "ENGN2225",
    title: "Mechanics of Solids",
    tutorials: [
      { name: "Tutorial A", day: 2, start: "09:00", end: "10:00" },
      { name: "Tutorial B", day: 4, start: "10:00", end: "11:00" },
    ],
  },
  {
    code: "ENGN3213",
    title: "Signals and Systems",
    tutorials: [
      { name: "Tutorial A", day: 3, start: "11:00", end: "12:00" },
      { name: "Tutorial B", day: 5, start: "14:00", end: "15:00" },
    ],
  },
  {
    code: "ENGN4200",
    title: "Engineering Design",
    tutorials: [{ name: "Tutorial A", day: 1, start: "09:00", end: "11:00" }],
  },
  {
    code: "ARTV1002",
    title: "Introduction to Photography",
    tutorials: [
      { name: "Studio A", day: 2, start: "13:00", end: "15:00" },
      { name: "Studio B", day: 4, start: "13:00", end: "15:00" },
    ],
  },
  {
    code: "ARTV2107",
    title: "Digital Media Practices",
    tutorials: [{ name: "Studio A", day: 3, start: "09:00", end: "11:00" }],
  },
  {
    code: "ARTV3110",
    title: "Sculpture Studio",
    tutorials: [{ name: "Studio A", day: 5, start: "10:00", end: "12:00" }],
  },
  {
    code: "EMSC1006",
    title: "Introduction to Earth Sciences",
    tutorials: [
      { name: "Tutorial A", day: 1, start: "11:00", end: "12:00" },
      { name: "Tutorial B", day: 3, start: "10:00", end: "11:00" },
    ],
  },
  {
    code: "EMSC2019",
    title: "Structural Geology",
    tutorials: [{ name: "Tutorial A", day: 2, start: "14:00", end: "16:00" }],
  },
  {
    code: "EMSC3025",
    title: "Environmental Hazards",
    tutorials: [{ name: "Tutorial A", day: 4, start: "09:00", end: "10:00" }],
  },
  {
    code: "HIST1002",
    title: "Ideas that Made the World",
    tutorials: [
      { name: "Tutorial A", day: 2, start: "10:00", end: "11:00" },
      { name: "Tutorial B", day: 5, start: "11:00", end: "12:00" },
    ],
  },
  {
    code: "HIST2038",
    title: "Modern Australia",
    tutorials: [{ name: "Tutorial A", day: 3, start: "15:00", end: "16:00" }],
  },
  {
    code: "HIST3041",
    title: "History of Science",
    tutorials: [{ name: "Tutorial A", day: 4, start: "11:00", end: "12:00" }],
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

const dayFormatter = new Intl.DateTimeFormat("en-AU", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

// The next few occurrences of a tutorial's weekly slot, so "timeslot" means a
// specific dated session rather than just a recurring weekday — there's
// something concrete to actually swap.
export function upcomingSlots(
  tutorial: Tutorial,
  count = 5,
): { value: string; date: Date }[] {
  const slots: { value: string; date: Date }[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (slots.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === tutorial.day) {
      slots.push({ value: dayFormatter.format(cursor), date: new Date(cursor) });
    }
  }
  return slots;
}

export function slotLabel(
  course: Course,
  tutorial: Tutorial,
  slot: { value: string },
): string {
  return `${course.code} ${tutorial.name} — ${slot.value}, ${tutorial.start}–${tutorial.end}`;
}
