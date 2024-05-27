// const fs=require('fs');
// const pdfParse=require('pdf-parse');

// const pdfFile=fs.readFileSync('s2.pdf');
// pdfParse(pdfFile).then((data)=>{
//     console.log(data.text);
// })
const fs = require("fs");
const pdf = require("pdf-parse");
const { jsPDF } = require("jspdf");

let pageCount = 0;
let dataBuffer = fs.readFileSync("s2-physics.pdf");
const doc = new jsPDF();

let names = [];
let regNos = [];
let marks = [];
let markInt = [];
let lowmarkindex = [];
pdf(dataBuffer).then(function (data) {
  // number of pages
  pageCount = data.numpages;
  const { PdfDataParser } = require("pdf-data-parser");

  async function parsePdf(index) {
    let parser = await new PdfDataParser({
      url: "s2-physics.pdf",
      pages: [index],
    });
    async function myFunc(index) {
      var rows = await parser.parse();
      // rows.forEach(row=>console.log(row));

      if (index == 1) {
        for (i = 14; i < rows.length; i = i + 4) {
          // console.log(rows[i][0].toString().split('Register No :').join(''))
          temp = rows[i][0].toString().split("Register No :").join("");
          nameText = await temp.slice(0, temp.length - 13);
          regText = await temp.slice(temp.length - 12, temp.length);
          await names.push(nameText);
          await regNos.push(regText);
          // await console.log(nameText);
          // await console.log(regText);
        }
        for (i = 17; i < rows.length; i = i + 4) {
          // console.log(rows[i][0].toString().split('Register No :').join(''))
          marksText = rows[i];
          // console.log(marksText)
          await marks.push(marksText);
          // await console.log(nameText);
          // await console.log(regText);
        }
      } else {
        for (i = 1; i < rows.length; i = i + 4) {
          // console.log(rows[i][0].toString().split('Register No :').join(''))
          temp = rows[i][0].toString().split("Register No :").join("");
          nameText = await temp.slice(0, temp.length - 13);
          regText = await temp.slice(temp.length - 12, temp.length);
          await names.push(nameText);
          await regNos.push(regText);
          // await console.log(nameText);
          // await console.log(regText);
        }
        for (i = 4; i < rows.length; i = i + 4) {
          // console.log(rows[i][0].toString().split('Register No :').join(''))
          marksText = rows[i];
          await marks.push(marksText);
          // await console.log(nameText);
          // await console.log(regText);
        }
      }
    }
    await myFunc(index);
    return index;
  }

  doc.setTextColor(100);
  doc.setFontSize(20);
  doc.text(
    "PHT100-ENGINEERING PHYSICS - Students with internal less than 35",
    10,
    10
  );
  for (ind = 1; ind <= pageCount; ind++) {
    parsePdf(ind).then((index) => {
      if (index == 1) {
        // marks.forEach((mark,index)=>{if(mark<35){lowmarkindex.push(index)}});
        // console.log(lowmarkindex);
        // marks.forEach((mark,index)=>{if(parseInt(mark.toString().slice(0,mark.toString().length-4))<35){lowmarkindex.push(index)}})
        marks.forEach((mark) =>
          markInt.push(
            parseInt(mark.toString().slice(0, mark.toString().length - 4))
          )
        );
        // markInt.forEach(mark=>console.log(mark));
        let locIndex = 0;
        markInt.forEach((mark, index) => {
          if (mark < 35) {
            lowmarkindex.push(index);
            // console.log(
            //   "index" +
            //     index +
            //     " mark:" +
            //     mark +
            //     " name:" +
            //     names[index] +
            //     " reg:" +
            //     regNos[index]
            // );
            doc.setTextColor('red');
            doc.setFontSize(16);
            doc.text(
              regNos[index] + " " + names[index] + " mark:" + mark,
              10,
              locIndex * 8 + 30
            );
            locIndex++;
          }
        });
        doc.text("\n", 10, 200);
        // lowmarkindex.forEach(mark=>console.log(mark))
        doc.save("s2-physics-less-than-35.pdf");
      }
    });
  }
});
