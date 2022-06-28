module.exports.moveXaxis = async (data, cardData) => {
  console.log('here x = ',  data[0].axis.x);
  let i = 0;
  let newX = 0;
  for(let d of data) {
    console.log('=',d.name)
    console.log('==',parseInt(d.axis.x.split('px')));
    console.log('===',newX, i);
    console.log('====',(newX !== 0 && parseInt(d.axis.x.split('px')[0]) !== newX));
    if(i == 0) {
      newX = parseInt(d.axis.x.split('px')[0]) + (cardData[d.name].length * 8);
      i+=1
      continue;
    }
    if(newX !== 0 && parseInt(d.axis.x.split('px')[0]) !== newX) {
      console.log('final',d.axis.x);
      d.axis.x = `${newX}px`;
      newX = newX + (parseInt(cardData[d.name].length) * 8);
      // d.axis.x = `${newX}`
      console.log('final newX ', newX);
    }
  }
  return data;
}