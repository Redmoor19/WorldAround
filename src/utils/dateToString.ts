export function dateToString(date: Date | string) {
  "use client";
  const editDate = typeof date === "string" ? new Date(date) : date;

  const day = editDate.getDate();
  const month = editDate.getMonth() + 1;
  const year = editDate.getFullYear();

  return `${day}/${month}/${year}`;
}
