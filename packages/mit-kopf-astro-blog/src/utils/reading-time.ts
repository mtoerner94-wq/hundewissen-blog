/** Reading time in minutes (German editorial default: 200 wpm + image time). */
export function calcReadingTime(body: string, imageCount = 0): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const fromText = words / 200;
  const fromImages = (imageCount * 12) / 60;
  return Math.max(1, Math.ceil(fromText + fromImages));
}
