import { PDFDocument } from 'pdf-lib';

async function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

async function appendImageToPdf(pdfDoc: PDFDocument, file: File) {
  const bytes = await readAsArrayBuffer(file);

  if (file.type === 'image/jpeg') {
    const image = await pdfDoc.embedJpg(bytes);
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
    return;
  }

  if (file.type === 'image/png') {
    const image = await pdfDoc.embedPng(bytes);
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
    return;
  }
}

async function appendPdfToPdf(pdfDoc: PDFDocument, file: File) {
  const bytes = await readAsArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  const pages = await pdfDoc.copyPages(src, src.getPageIndices());
  pages.forEach((page) => pdfDoc.addPage(page));
}

export async function mergeFilesToPdf(files: File[]): Promise<File> {
  if (files.length === 1 && files[0].type === 'application/pdf') {
    return files[0];
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    if (file.type === 'application/pdf') {
      await appendPdfToPdf(pdfDoc, file);
    } else {
      await appendImageToPdf(pdfDoc, file);
    }
  }

  const bytes = await pdfDoc.save();
  return new File([new Uint8Array(bytes)], 'merged.pdf', {
    type: 'application/pdf',
  });
}
