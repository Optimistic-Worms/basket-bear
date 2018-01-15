const axios = require('axios');

exports.updateListPrices = function (idToken) {
  let list;
  let amazonIds = [];
  let ebayIds = [];

  axios.get(`/shoppingList?access_token=${idToken}`)
  .then((response) => {
    list = response.data;
    for (var item in list) {
      if (list[item].merchant === "amazon") amazonIds.push(item);
      if (list[item].merchant === "eBay") ebayIds.push(item);
    }
    axios.get('/amazon/lookup', { params: { itemIds : amazonIds } })
    .then((response) => {
      list = parseAmazonIds(response, list);

      axios.get('/lookupEbay', { params: { itemIds : ebayIds } })
      .then((response) => {
        list = parseEbayIds(response, list);
        axios.put(`/shoppingList/update/list?access_token=${idToken}`, {
          list : list
        })
      })
      .catch((error) => {
        console.log('ebay lookup error', error);
      })
    })
  })
}

let parseAmazonIds = function(response, list) {
  response.data.ItemLookupResponse.Items[0].Item.forEach((item) => {
    let offer;
    if (item.Offers[0].Offer) {
      offer = item.Offers[0].Offer[0].OfferListing[0];
      if (offer.SalePrice) {
        list[item.ASIN].currentPrice = offer.SalePrice[0].FormattedPrice[0].substring(1);
      } else if (offer.Price) { //ONLY SET THIS IF THERE IS NO SALE PRICE
        list[item.ASIN].currentPrice = offer.Price[0].FormattedPrice[0].substring(1);
      }
    } else {
      list[item.ASIN].currentPrice = 'Item No Longer Available';
    }
  })
  return list;
}

let parseEbayIds = function(response, list) {
  response.data.Item.forEach((item) => {
    list[item.ItemID].currentPrice = item.ConvertedCurrentPrice.Value;
  })
  return list
}
