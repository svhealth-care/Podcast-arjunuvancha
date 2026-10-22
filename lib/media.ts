export function publicImage(path?: string | null) {
  if (!path) return null;
  if (path.startsWith("/")) return path;
  return `/${path.replace(/^assets\//, "images/")}`;
}

export function initialsFor(name: string) {
  return name
    .replace(/^(Dr\.?|Professor|Prof\.?|Senator|The Hon\.?|Hon\.?)\s+/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
