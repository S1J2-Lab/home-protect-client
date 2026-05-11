import { useState } from 'react';
import jsPDF from 'jspdf';

import { createPdfFileName } from '../utils/resultPdf';
import { createSectionImage } from '../utils/pdfSection';

export function useResultPdfDownload() {
  const [isPdfSaving, setIsPdfSaving] = useState(false);

  const downloadPdf = async (
    pdfTarget: HTMLDivElement | null,
    address: string,
  ) => {
    if (!pdfTarget || isPdfSaving) return;

    try {
      setIsPdfSaving(true);

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 5;
      const contentWidth = pageWidth - margin * 2;
      const maxBottom = pageHeight - margin;

      let currentY = margin;

      const sections = Array.from(
        pdfTarget.querySelectorAll(
          '[data-pdf-section], [data-pdf-title-section]',
        ),
      ) as HTMLElement[];

      for (let index = 0; index < sections.length; index += 1) {
        const section = sections[index];
        const isTitleSection = section.hasAttribute('data-pdf-title-section');

        const { imageData, imageHeight } = await createSectionImage(
          section,
          contentWidth,
        );

        if (isTitleSection) {
          const nextSection = sections[index + 1];

          if (nextSection) {
            const { imageHeight: nextImageHeight } = await createSectionImage(
              nextSection,
              contentWidth,
            );

            if (currentY + imageHeight + nextImageHeight > maxBottom) {
              pdf.addPage();
              currentY = margin;
            }
          }
        }

        if (currentY + imageHeight > maxBottom) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.addImage(
          imageData,
          'PNG',
          margin,
          currentY,
          contentWidth,
          imageHeight,
        );

        currentY += imageHeight;
      }

      pdf.save(createPdfFileName(address));
    } finally {
      setIsPdfSaving(false);
    }
  };

  return { isPdfSaving, downloadPdf };
}
