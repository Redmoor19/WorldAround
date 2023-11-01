export default function sanitize(anything: any) {
  return JSON.parse(JSON.stringify(anything));
}
