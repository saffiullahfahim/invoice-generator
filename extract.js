import {PDFExtract } from 'pdf.js-extract';
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
pdfExtract.extract('./Mayer Dua Memo - Google Docs.pdf', options)
  .then(data => console.log(data.pages[0].content))
  .catch(err=> console.log(err));

