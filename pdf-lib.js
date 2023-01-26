import { PDFDocument, StandardFonts, PageSizes, degrees, grayscale } from "pdf-lib";

const rgb = (red, green, blue) => {
  return {
    type: "RGB",
    red: red / 255,
    green: green / 255,
    blue: blue / 255,
  };
};

const roundedRectData =  (w, h, tlr, trr, brr, blr) => {
  return 'M 0 ' + tlr
    + ' A ' + tlr + ' ' + tlr + ' 0 0 1 ' + tlr + ' 0'
    + ' L ' + (w - trr) + ' 0'
    + ' A ' + trr + ' ' + trr + ' 0 0 1 ' + w + ' ' + trr
    + ' L ' + w + ' ' + (h - brr)
    + ' A ' + brr + ' ' + brr + ' 0 0 1 ' + (w - brr) + ' ' + h
    + ' L ' + blr + ' ' + h
    + ' A ' + blr + ' ' + blr + ' 0 0 1 0 ' + (h - blr)
    + ' Z';
};

const breakLine = (data, maxChr = 67) => {
  let dataArray = data.split(" ");
  let result = "";
  let line = "";

  for (let i = 0; i < dataArray.length; i++) {
    let x = dataArray[i];
    line += x + " ";
    if (line.length > maxChr) {
      line = line.substr(0, line.length - x.length - 1);
      result += line + "\n";
      line = x + " ";
    }

    if (i == dataArray.length - 1) {
      result += line;
    }
  }

  return result;
};

const createPdf1 = async (obj) => {
  const fontSize = 13;
  const size = [];

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (let key in obj) {
    size.push(helveticaBold.widthOfTextAtSize(key, fontSize));
  }

  let initY = 50;
  let maxH = helveticaBold.heightAtSize(fontSize);
  console.log(maxH)
  let maxW = Math.max(...size);

  const page = pdfDoc.addPage(PageSizes.A4);

  // page.drawRectangle({
  //   x: 50,
  //   y: page.getHeight() - 50 - 2 - 5,
  //   width: 250,
  //   height: maxH + 10,
  //   // rotate: degrees(-15),
  //   // borderWidth: 5,
  //   // borderColor: grayscale(0.5),
  //   color: rgb(0, 0, 0),
  //   // opacity: 0.5,
  //   // borderOpacity: 0.75
  // });

  const svgPath2 = roundedRectData(250, maxH + 10, 4, 0, 0, 4); // height + padding / 2
  page.drawSvgPath(svgPath2, { x: 50, y: page.getHeight() - initY + maxH - 2 + 5, color: rgb(1.0, 0, 0), })


  const svgPath = 'M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150 L 400,90'
  const svgPath3 = "M 541.867 792 L 612 792 L 612 736.612 L 541.867 736.612 Z M 545.5 740.244 L 608.368 740.244 L 608.368 788.368 L 545.5 788.368 Z";

  // Translate the path along the x-axis to 0
  const translatedPath = "M 0 792 L 68.1333 792 L 68.1333 736.612 L 0 736.612 Z M 3.63333 740.244 L 66.5 740.244 L 66.5 788.368 L 3.63333 788.368 ZM541.867 0L612 0 612 55.388000000000034 541.867 55.388000000000034ZM545.5 51.75599999999997L608.368 51.75599999999997 608.368 3.631999999999948 545.5 3.631999999999948Z";

  page.drawSvgPath(translatedPath, {
    color: rgb(0, 0, 0),
  });

// Draw path as black line
page.drawSvgPath(svgPath, { x: 25, y: 75 })

// Change border style and opacity
page.drawSvgPath(svgPath, {
  x: 25,
  y: 275,
  borderColor: rgb(0.5, 0.5, 0.5),
  borderWidth: 2,
  borderOpacity: 0.75,
})

// Set fill color and opacity
page.drawSvgPath(svgPath, {
  x: 25,
  y: 475,
  color: rgb(1.0, 0, 0),
  opacity: 0.75,
})

// Draw 50% of original size
page.drawSvgPath(svgPath, {
  x: 25,
  y: 675,
  scale: 0.5,
})

  console.log(rgb(1, 1, 1));

  for (let key in obj) {
    page.drawText(key, {
      x: 50,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helveticaBold,
      color: rgb(255, 255, 255)
    });

    page.drawText(":", {
      x: maxW + 60,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helveticaBold,
    });

    page.drawText(obj[key], {
      x: maxW + 70,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helvetica,
    });

    initY += maxH + 10;
  }

  console.log(page);

  let pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });

  return pdfBytes;
};

const createPdf2 = async (obj, pdf) => {
  const fontSize = 13;
  const size = [];

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (let key in obj) {
    size.push(helveticaBold.widthOfTextAtSize(key, fontSize));
  }

  let initY = 50;
  let maxH = helveticaBold.heightAtSize(fontSize);
  let maxW = Math.max(...size);

  const page = pdfDoc.addPage();

  page.setLineHeight(15)


  for (let key in obj) {
    page.drawText(key, {
      x: 50,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helveticaBold,
    });

    page.drawText(":", {
      x: maxW + 60,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helveticaBold,
    });

    let p = page.drawText(obj[key], {
      x: maxW + 70,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helvetica,
    });

    console.log(p)
    
    let count = obj[key].match("\n");

    count = count ? count.length: count

    console.log(count)

    initY += (maxH * (count + 1)) - maxH/2 + 18;
  }

  console.log(page);

  let pdfBytes;
  if (pdf) {
    const pdfDoc_ = await PDFDocument.load(pdf);
    const page = await pdfDoc_.copyPages(pdfDoc, [0]);
    pdfDoc_.insertPage(0, page[0]);
    pdfBytes = await pdfDoc_.saveAsBase64({ dataUri: true });
  } else {
    pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
  }

  return pdfBytes;
};

let obj = {};

for(let x = 0; x < 20; x++){
  obj[new Date().getTime() + x] = breakLine(x + " This sflsdfsd fsldkfjsd fsdfljsd fsdfjsldf sdfjsdf is date" + new Date().toISOString())
}

const createPath = async () => {

  const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([612, 792]);

let path = "M610.185 1.816000000000031L551.565 1.816000000000031 551.565 46.27200000000005 610.185 46.27200000000005Z"
let rpath = roundedRectData(78, 60, 0, 0, 0, 0)

// page.drawSvgPath(roundedRectData(50, 40, 0, 0, 0, 0), {
//   color:rgb(90, 106, 255),
//   x: page.getWidth() - 50,
//   y: page.getHeight()
// });

// page.drawSvgPath(roundedRectData(60, 50, 0, 0, 0, 0), {
//   x: page.getWidth() - 60 + 2.5,
//   y: page.getHeight() + 2.5,
//   borderWidth: 3,
//   borderColor: rgb(90, 106, 255),
// });

page.drawSvgPath(path, {x: 0, y: 0})


let pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });


document.getElementById("pdf").src = pdfBytes;
}


const getPdf = async () => {
  return await createPdf2(obj)
}

export {getPdf};