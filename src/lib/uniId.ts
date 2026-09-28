// ANU-style university id: "u" followed by 7 digits, e.g. u7509543. Used in
// place of a free-text name so posts and claims are attributable to a real
// person rather than whatever string someone typed.
const UNI_ID_RE = /^u\d{7}$/i;

// For the client-side <input pattern="...">. The pattern attribute doesn't
// take regex flags, so both cases of "u" are spelled out explicitly instead
// of relying on a case-insensitive match.
export const UNI_ID_INPUT_PATTERN = "[uU]\\d{7}";

export function normalizeUniId(value: string): string | null {
  const trimmed = value.trim();
  return UNI_ID_RE.test(trimmed) ? trimmed.toLowerCase() : null;
}
