export function formatDetailContent(content: string) {
  return content.replace(/\s*(?=\d+\)\s)/g, '\n').trim();
}
