export function getLanguage(mimeType: string) {
  if (mimeType.endsWith("/xml")) {
    return "xml";
  }

  if (mimeType.endsWith("/json")) {
    return "json";
  }

  if (mimeType.endsWith("markdown")) {
    return "markdown";
  }

  return null;
}
