const fs = require("fs"); // to read html file
const cheerio = require("cheerio"); // for scrapping
const { _ } = require("lodash");
const nodeHtmlImage = require("node-html-to-image"); // convert html-to-image
const { cardUsers } = require("./dummyData");
const {
  pickXandY,
  pickElementsHavingSameYaxis,
  moveXaxis,
  newCoordinates,
  overlapCheck,
} = require("./app-functions");
const intersection = require("rectangle-overlap");

const convert = async () => {
  try {
    let htmlData = fs.readFileSync("htmlData.html", "utf8");
    let $ = cheerio.load(htmlData);
    const coordinates = [];
    coordinates.push({ name: "firstName", axis: pickXandY("#firstName", $) });
    coordinates.push({ name: "lastName", axis: pickXandY("#lastName", $) });
    coordinates.push({ name: "email", axis: pickXandY("#email", $) });
    coordinates.push({ name: "title", axis: pickXandY("#company", $) });
    // const finalForXaxis = pickElementsHavingSameYaxis(coordinates);
    console.log("heres ==> ", coordinates);
    let ok = [];
    for (let cardUser of cardUsers) {
      cardUser = await newCoordinates(coordinates, cardUser);
      ok.push(cardUser);
    }
    const temp = Object.keys(cardUsers[0]);
    let rec1,
      rec2,
      final = [];
    for (const user of cardUsers) {
      console.log('<<<========== user changed ==========>>>')
      for (let i = 0; i < temp.length; i++) {
        // console.log('temp[i] =>', temp[i]);
        for (let j = i + 1; j < temp.length; j++) {
          console.log(temp[i], "==", temp[j]);
          rec1 = {
            x: parseInt(user[temp[i]].x1.split("px")[0]),
            y: parseInt(user[temp[i]].y1.split("px")[0]),
            width:
              parseInt(user[temp[i]].x2.split("px")[0]) -
              parseInt(user[temp[i]].x1.split("px")[0]),
            height: 10,
          };
          rec2 = {
            x: parseInt(user[temp[j]].x1.split("px")[0]),
            y: parseInt(user[temp[j]].y1.split("px")[0]),
            width:
              parseInt(user[temp[j]].x2.split("px")[0]) -
              parseInt(user[temp[j]].x1.split("px")[0]),
            height: 10,
          };
          const overlap = intersection(rec1, rec2);
          console.log((overlap !== null) ? overlap : 'no')
          // if (overlap) {
          //   final.push({ overlap: true });
          //   continue;
          // } else {
          //   final.push({ overlap: false });
          // }
        }
      }
    }
  } catch (err) {
    throw err;
  }
};

convert();
