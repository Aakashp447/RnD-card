module.exports.pickElementsHavingSameYaxis = data => {
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