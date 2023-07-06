import pdf from 'pdfjs';
import fs from 'fs';

const OpenSans = new pdf.Font(
  fs.readFileSync("./font//NotoSerifBengali-Bold.ttf"),
);

export default OpenSans;
