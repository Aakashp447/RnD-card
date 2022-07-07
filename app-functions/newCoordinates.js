module.exports.newCoordinates = async (data, cardData) => {
  let i = 0;
  for (let d of data) {
    console.log("here ", d.axis.x, cardData[d.name]);
    // console.log(d.axis);
    // cardData[d.name] = {}
    let temp = { value: cardData[d.name], x1: d.axis.x, y1: d.axis.y };
    // console.log('temp ==> ', temp,'ok ==> ', d.axis.x.split('px')[0])
    let newX = cardData[d.name].length * 8 + parseInt(d.axis.x.split("px")[0]);
    temp = { ...temp, x2: `${newX}px`, y2: `${parseInt(d.axis.y.split("px")[0]) + 10}px` };
    cardData[d.name] = temp
  }
  return cardData;
};
