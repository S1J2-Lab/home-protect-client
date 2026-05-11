import html2canvas from 'html2canvas';

export async function createSectionImage(
  section: HTMLElement,
  contentWidth: number,
) {
  const canvas = await html2canvas(section, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imageData = canvas.toDataURL('image/png');
  const imageHeight = (canvas.height * contentWidth) / canvas.width;

  return {
    imageData,
    imageHeight,
  };
}
