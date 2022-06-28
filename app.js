const fs = require('fs'); // to read html file
const cheerio = require('cheerio'); // for scrapping
const { _ } = require('lodash');
const nodeHtmlImage = require('node-html-to-image');  // convert html-to-image
const { cardUsers } = require('./dummyData');
const { pickXandY, pickElementsHavingSameYaxis, moveXaxis } = require('./app-functions');
const { log } = require('console');

const convert = async () => {
  try {
    let htmlData = fs.readFileSync('htmlData.html', 'utf8');
    let $ = cheerio.load(htmlData);
    console.log($('#firstName').text());
    console.log($('#lastName').text());
    console.log($('#email').text());
    console.log($('#lastName').parent().attr('style').split(';')[8].split('translate')[1]);
    const coordinates = {};
    coordinates.firstName = pickXandY('#firstName', $);
    coordinates.lastName = pickXandY('#lastName', $);
    coordinates.email = pickXandY('#email', $);
    const finalForXaxis = pickElementsHavingSameYaxis(coordinates);
    const forXaxis = [];
    for (let finaal of finalForXaxis) {
      forXaxis.push({ name: finaal, axis: coordinates[finaal] });
    }
    // console.log(forXaxis)
    // console.log(coordinates.lastName)
    let newAxis = [];
    for (const cardUser of cardUsers) {
      console.log(cardUser.firstName);
      cardUser.newAxis = await moveXaxis(forXaxis, cardUser);
      let ok = cardUser.newAxis
      console.log(ok);
      newAxis.push(ok)
      ok = '';
    }
    for(let n of newAxis) {
      console.log('here', n);
    }
    // console.log('finalll ', newAxis[0][1].axis)
    // console.log(cardUsers[0].newAxis[1].axis);
    // const finalCoordinates = [];
  } catch (err) {
    throw err;
  }
}

convert();
