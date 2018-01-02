exports.getAveragePrice = (pricesObj) => {
  console.log('PRICES: ', pricesObj)
  let total = 0;
  let counter = 0;
  for (var user in pricesObj) {
    total += Number(pricesObj[user]);
    counter++;
  }
  return {avg: total / counter, count: counter};
}

