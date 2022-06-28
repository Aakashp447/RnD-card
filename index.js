const fs = require('fs'); // to read html file
const cheerio = require('cheerio'); // for scrapping
const { _ } = require('lodash');
const nodeHtmlImage = require('node-html-to-image');  // convert html-to-image
const { cardUsers } = require('./dummyData');

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
    // console.log(forXaxis);
    const finalCoordinates = [];
    let temp;
    for (const cardUser of cardUsers) {
    // for (let l= 0; l< cardUsers.length ; l++) {
      // console.log(cardUsers)
      console.log('data ==>', forXaxis)
      temp = await moveXaxis(forXaxis, cardUser)
      console.log('temp ', temp)
      cardUser.newAxis = temp;
      finalCoordinates.push(temp)

      // cardUser.newAxis = moveXaxis(forXaxis, cardUser)
    }
    console.log('USER ==> ', cardUsers[0].newAxis)
  } catch (err) {
    throw err;
  }
}


const pickXandY = (data, htmlData) => {
  // let $ = cheerio.load(htmlData);
  let xFirstName = htmlData(data).parent().attr('style').split(';')[8].split('translate')[1];
  xFirstName = _.replace(xFirstName, '(', '');
  xFirstName = _.replace(xFirstName, ')', '');
  xFirstName = _.replace(xFirstName, ',', '');
  xFirstName = xFirstName.split(' ');
  fontSize = pickFontSize(data, htmlData)
  return { x: xFirstName[0], y: xFirstName[1], fontSize };
}


const pickElementsHavingSameYaxis = data => {
  const checkY = [];
  const final = [];
  for (const [key, value] of Object.entries(data)) {
    checkY.push({ y: value.y, count: 1 });
  }
  for (let i = 0; i < checkY.length; i++) {
    for (let j = 0; j < checkY.length; j++) {
      if (j == i) {
        continue;
      }
      if (checkY[i].y == checkY[j].y) {
        checkY[i].count = checkY[i].count + 1;
      }
    }
    if (checkY[i].count > 1) {
      final.push(Object.keys(data)[i]);
    }
  }
  return final;
};


const pickFontSize = (data, htmlData) => {
  let fontSize = htmlData(data).attr('style').split('font-size')[1].split(';')[0];
  fontSize = _.replace(fontSize, ': ', '');
  return fontSize;
}


const moveXaxis = (data, cardData) => {
  for (let i = 0; i < data.length; i++) {
    // console.log(cardUser[data[i].name].length)
    // console.log(data[i].axis.x);
    // newX = parseInt(newX.split('px')[0]);
    if (i == 0) {
      newX = parseInt(data[i].axis.x.split('px')[0]) + (cardData[data[i].name].length * 8);
      // newX = `${newX}px`;
      continue;
    } else if (parseInt(data[i].axis.x) < newX) {
      // data[i].axis.x = `${newX}px`;
      newX = parseInt(data[i].axis.x) + (cardData[data[i].name].length * 8);
      // newX = `${newX}px`;
    } else if (parseInt(data[i].axis.x) > newX) {
      data[i].axis.x = `${newX}px`;
      // console.log('here', newX)
      newX = parseInt(data[i].axis.x) + (cardData[data[i].name].length * 8);
      // newX = `${newX}px`;
    }
  }
  // console.log(data);
  return data;
}
const moveXaxiss = (data, cardData) => {
  const final = [];
  for (const cardUser of cardUsers) {
    let newX = 0;
    // for(const d of data) {
    for (let i = 0; i < data.length; i++) {
      // console.log(cardUser[data[i].name].length)
      // console.log(data[i].axis.x);
      // newX = parseInt(newX.split('px')[0]);
      if (i == 0) {
        newX = parseInt(data[i].axis.x.split('px')[0]) + (cardUser[data[i].name].length * 8);
        // newX = `${newX}px`;
        continue;
      } else if (parseInt(data[i].axis.x) < newX) {
        // data[i].axis.x = `${newX}px`;
        newX = parseInt(data[i].axis.x) + (cardUser[data[i].name].length * 8);
        // newX = `${newX}px`;
      } else if (parseInt(data[i].axis.x) > newX) {
        data[i].axis.x = `${newX}px`;
        // console.log('here', newX)
        newX = parseInt(data[i].axis.x) + (cardUser[data[i].name].length * 8);
        // newX = `${newX}px`;
      }
    }
    final.push(data)
    console.log('ok ==> ', data)
  }
  console.log('fonal', final)
  // for(const f of data) {
  // for(const i of f) {
  // console.log(f);
  // }
  // }
  return [];
}


convert();
