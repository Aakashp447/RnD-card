module.exports.overlapCheck = (l1, r1, l2, r2) => {
  console.log(l1.x, l1.y);
  console.log(r1.x, r1.y);
  console.log(l2.x, l2.y);
  console.log(r2.x, r2.y);

  // if rectangle has area 0, no overlap
  if (l1.x == r1.x || l1.y == r1.y || r2.x == l2.x || l2.y == r2.y)
    return false;

  // If one rectangle is on left side of other
  if (l1.x > r2.x || l2.x > r1.x) {
    return false;
  }

  // If one rectangle is above other
  if (r1.y > l2.y || r2.y > l1.y) {
    return false;
  }

  return true;
};
