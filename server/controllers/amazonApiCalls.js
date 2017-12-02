const Promise = require('bluebird');
const axios = require('axios');
const moment = require('moment');
const tz = require('moment-timezone-all');
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
const parseString = require('xml2js').parseString;

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Amazon API Calls
* * * * * * * * * * * * * * * * * * * * * * * * * * */

exports.searchAmazon = (query) => {
  return new Promise ((resolve, reject) => {

    let date = moment().tz('Europe/London').format("YYYY-MM-DDTHH:mm:ss.000") + 'Z'
    console.log(date);

    const getAmazonSearchUrl = (keywords) => {

      const {AMAZON_PUBLIC_KEY, AMAZON_PRIVATE_KEY, AMAZON_ASSOCIATE_TAG} = process.env;
      let parameters = [];
      let url = 'webservices.amazon.com' // US account

      parameters.push("AWSAccessKeyId=" + AMAZON_PUBLIC_KEY);
      parameters.push("Keywords=" + encodeURIComponent(keywords));
      parameters.push("Operation=ItemSearch");
      parameters.push("SearchIndex=All");
      parameters.push("ResponseGroup=" + encodeURIComponent('Images,ItemAttributes,Offers'));
      parameters.push("Service=AWSECommerceService");
      parameters.push("Timestamp=" + encodeURIComponent(date));
      parameters.push("AssociateTag=" + AMAZON_ASSOCIATE_TAG);
      parameters.sort();

      let paramString = parameters.join('&');
      let string_to_sign = "GET\n" + url + "\n" + "/onca/xml\n" + paramString

      let signature = CryptoJS.HmacSHA256(string_to_sign, AMAZON_PRIVATE_KEY);
      signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(signature));

      let amazonUrl = "http://" + url + "/onca/xml?" + paramString + "&Signature=" + signature;
      console.log('SEND TO URL:', amazonUrl);
      return amazonUrl;
    }

    var sendToUrl = getAmazonSearchUrl(query);

    axios.get(sendToUrl, {params: {}}).then(function(response) {
      parseString(response.data, function (err, result) {
          resolve(result);
      });
    }).catch(function(error) {
      console.log("ERROR: GET request from Amazon Failing " + error);
      reject("ERROR: GET request from Amazon Failing " + error);
    });

  });

}

