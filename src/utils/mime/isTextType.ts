export function isTextType(mimeType: string) {
  return mimeType.startsWith("text/") || mimeType.endsWith("/json") || mimeType.endsWith("/xml");
}
