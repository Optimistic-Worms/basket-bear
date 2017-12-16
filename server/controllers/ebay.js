const axios = require('axios')
const EBAYKEY = process.env.EBAY_KEY;

exports.searchProducts = (keyword) => {

  return new Promise ((resolve, reject) => {

    axios.get('https://svcs.ebay.com/services/search/FindingService/v1?', {
      params: {
        "OPERATION-NAME": "findItemsByKeywords",
        "SERVICE-VERSION": "1.0.0",
        "RESPONSE-DATA-FORMAT": "JSON",
        "callback": "_cb_findItemsByKeywords",
        "keywords": keyword,
        "paginationInput.entriesPerPage":"20",
        "GLOBAL-ID": "EBAY-US",
        "siteid": "0",
        "SECURITY-APPNAME": EBAYKEY
      }
    })
    .then(function (response) {
      var results = JSON.parse(response.data.slice(28, -1));
      var items = results.findItemsByKeywordsResponse[0].searchResult[0].item;
      resolve(JSON.stringify(parseResults(items)));
    })
    .catch(function (error) {
      console.log("ERROR: GET request from Ebay Failing " + error);
      reject("ERROR: GET request from Ebay Failing " + error);
    });


  });

}

exports.lookupProductsById = (itemIds) => {
  var items = itemIds.join(',');
  return new Promise ((resolve, reject) => {

    axios.get('http://open.api.ebay.com/shopping?', {
      params: {
        "callname" : "GetItemStatus",
        "version" : "1015",
        "responseencoding" : "JSON",
        "appid" : EBAYKEY,
        "ItemID" : items,
        "siteid" : "0"
      }
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    })
  });
}


var parseResults = function(searchResults) {
  var items = [];

  for (var i = 0 ; i < searchResults.length ; i++) {
    var product = {
      id: searchResults[i].itemId[0],
      name: searchResults[i].title[0],
      imageUrl: searchResults[i].galleryURL[0],
      merchant: 'eBay',
      price: searchResults[i].sellingStatus[0].currentPrice[0].__value__,
      link: searchResults[i].viewItemURL[0],
      currentPrice: searchResults[i].sellingStatus[0].currentPrice[0].__value__
    }
    items.push(product);
  }
  return items;
}