const axios = require('axios');

exports.updateListPrices = function (idToken) {
  let list;
  let amazonIds = [];
  let ebayIds = [];

  axios.get(`/shoppingList?access_token=${idToken}`)
  .then((response) => {
    list = response.data;
    console.log('Current Shopping List:', list);
    for (var item in list) {
      if (list[item].merchant === "amazon") amazonIds.push(item);
      if (list[item].merchant === "eBay") ebayIds.push(item);
    }
    axios.get('/lookupAmazon', { params: { itemIds : amazonIds } })
    .then((response) => {
      list = parseAmazonIds(response, list);

      axios.get('/lookupEbay', { params: { itemIds : ebayIds } })
      .then((response) => {
        list = parseEbayIds(response, list);
        console.log('Updated Shopping List:', list);
        axios.put('/updateShoppingList', { username : user.uid, list : list})
      })
      .catch((error) => {
        console.log('ebay lookup error', error);
      })
    })
  })
}

let parseAmazonIds = function(response, list) {
  response.data.ItemLookupResponse.Items[0].Item.forEach((item) => {
    let offer = item.Offers[0].Offer[0].OfferListing[0];
    if (offer.SalePrice) list[item.ASIN].currentPrice = offer.SalePrice[0].FormattedPrice[0].substring(1);
    if (offer.Price) list[item.ASIN].currentPrice = offer.Price[0].FormattedPrice[0].substring(1);
  })
  return list;
}

let parseEbayIds = function(response, list) {
  response.data.Item.forEach((item) => {
    list[item.ItemID].currentPrice = item.ConvertedCurrentPrice.Value;
  })
  return list
}
