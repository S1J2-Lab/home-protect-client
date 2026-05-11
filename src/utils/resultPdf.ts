export function createPdfFileName(address: string) {
  const safeAddress = address.replace(/[\\/:*?"<>|]/g, '_');
  return `전세분석결과_${safeAddress}.pdf`;
}
