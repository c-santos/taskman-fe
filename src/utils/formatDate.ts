export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  });
  const formatted = formatter.format(new Date(date));
  return formatted;
}
