const { pickFontSize } = require("./pickFontSize");
const { _ } = require('lodash');

module.exports.pickXandY = (data, htmlData) => {
  // let $ = cheerio.load(htmlData);
  let xFirstName = htmlData(data).parent().attr('style').split(';')[8].split('translate')[1];
  xFirstName = _.replace(xFirstName, '(', '');
  xFirstName = _.replace(xFirstName, ')', '');
  xFirstName = _.replace(xFirstName, ',', '');
  xFirstName = xFirstName.split(' ');
  fontSize = pickFontSize(data, htmlData)
  return { x: xFirstName[0], y: xFirstName[1], fontSize };
}