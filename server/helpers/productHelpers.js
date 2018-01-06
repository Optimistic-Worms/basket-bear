exports.getAveragePrice = (pricesObj) => {
  console.log('PRICES: ', pricesObj)
  let total = 0;
  let counter = 0;
  for (var user in pricesObj) {
    total += Number(pricesObj[user]);
    counter++;
  }
  return {avg: total / counter, count: counter};
};

exports.sortByPopularity = (productsArr) => {
  return productsArr.sort((a, b) => {
    return Object.keys(b.prices).length - Object.keys(a.prices).length;
  });
};

exports.parseData = (productRef) => {
  productObj = productRef.data();
  productObj.id = productRef.id;
  return productObj;
};

exports.productNamesMatch = (productObj, name) => {
  return productObj.name.toLowerCase().includes(name.toLowerCase());
}
