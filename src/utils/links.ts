export function buildLink(to: string | Array<string>): string {
  if (Array.isArray(to)) {
    return `/${to.join('/')}`;
  }
  return `/${to}`;
}
