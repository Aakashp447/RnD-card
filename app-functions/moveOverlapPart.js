module.exports.moveOverlapPart = (var1, var2) => {
  try {
    if (var2.x1 <= var1.x2) {
      var2.x1 =
        parseInt(var1.x2.split("px")[0]) + 8 > 450
          ? "WARNING"
          : `${parseInt(var1.x2.split("px")[0]) + 8}px`;
    }
    return var2;
  } catch (err) {
    throw err;
  }
};
