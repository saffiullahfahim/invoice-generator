import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import 'regenerator-runtime/runtime.js';
import fontkit from '@pdf-lib/fontkit';
import fs from "fs";

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const existingPdfBytes = fs.readFileSync("./Mayer Dua Memo - Google Docs.pdf");

// Load a PDFDocument from the existing PDF bytes
const pdfDoc = await PDFDocument.load(existingPdfBytes);

pdfDoc.registerFontkit(fontkit);

// let url =
//   "https://www.fontsaddict.com/download/charger-sport-defiance-extended.ttf";

// const ubuntuBytes = await fetch(url).then((res) => res.arrayBuffer());

// Embed the Helvetica font

const url = 'https://www.omicronlab.com/download/fonts/kalpurush.ttf'
const ubuntuBytes = await fetch(url).then(res => res.arrayBuffer())
const helveticaFont = await pdfDoc.embedFont(fs.readFileSync("./font/NotoSerifBengali-ExtraBold.ttf"))

// const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

console.log(helveticaFont.encodeText("০১.০১.২০২৩"))

// Get the first page of the document
const pages = pdfDoc.getPages();
const firstPage = pages[0];

// Get the width and height of the first page
const { width, height } = firstPage.getSize();

// Draw a string of text diagonally across the first page

firstPage.drawRectangle({
  x: 365.4086922746372,
  y: 493.1341547427421 - 5,
  width: 36.118849040460844,
  height: 9.997499508437503 + 5,
  color: rgb(1, 1, 1),
});

firstPage.drawText("এমই চাহি", {
  x: 365.4086922746372,
  y: 493.1341547427421,
  size: 9.997499508437503,
  font: helveticaFont,
  color: rgb(0, 0, 0),
  // rotate: degrees(-45),f
});

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save();

fs.writeFileSync("./Mayer Dua Memo2.pdf", pdfBytes);

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>
