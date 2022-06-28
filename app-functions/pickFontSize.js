const { _ } = require('lodash');

module.exports.pickFontSize = (data, htmlData) => {
  let fontSize = htmlData(data).attr('style').split('font-size')[1].split(';')[0];
  fontSize = _.replace(fontSize, ': ', '');
  return fontSize;
}