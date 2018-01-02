import React from 'react';

const EndpointReference = () => (
  <div className="api-doc-intro">
    <div className="api-doc-intro api-doc-intro--header">
      <h1>Budget Basket API Endpoint Reference</h1>
    </div>
    <p>This guide shows you how to access the public endpoints Budget Basket API. All requests to the Budget Basket API require authorization. See our Authorization Guide to learn how to obtain a token.</p>
      <h2>Endpoints</h2>
      <div >
      </div>
      <h3>/search</h3>
      <div>A GET request to the /search endpoint returns a json array populated with 20 products from Amazon and Ebay that match a search term provided in a request paramater</div>
      <div>A GET request is sent to the /api/search endpoint:</div>
      <div className="snippet">GET http://budgetbasket.com/api/search</div>
      <div>The request must contain a query paramater with the search term</div>
        <table className="param">
          <tbody>
            <tr>
              <th>REQUEST PARAMETER</th>
              <th>VALUE</th>
            </tr>
            <tr>
              <td>keyword</td>
              <td><i>Required</i>. A text string set to the product term you want results to match </td>
            </tr>
          </tbody>
        </table>
          <div>For Example:</div>
          <div className="snippet">{`$ curl -H "Authorization: Bearer NgCXRKc...MzYjw" http://budgetbasket.com/api/search?keyword=usb-c cable`}
          </div>
          <div>Returns the following JSON formatted array of results:</div>
          <div className="snippet">{`[
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000001_1.jpg",
        "merchant": "eBay",
        "price": "6.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303793",
        "currentPrice": "6.99"
    },
    {
        "id": "B01GGKZ1VA",
        "name": "AmazonBasics USB Type-C to USB Type-C 2.0 Cable - 6 Feet  (1.8 Meters) - Black",
        "merchant": "amazon",
        "link": "https://www.amazon.com/AmazonBasics-USB-Type-C-2-0-Cable/dp/B01GGKZ1VA?psc=1&SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01GGKZ1VA",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41QTw97EUuL._SL160_.jpg",
        "price": "7.99",
        "currentPrice": "7.99"
    },
    etc...
]`}
          </div>
  </div>
);

export default EndpointReference;

