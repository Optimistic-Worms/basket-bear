import React from 'react';

const EndpointReference = () => (
  <div className="api-doc-intro">
    <div className="api-doc-intro api-doc-intro--header">
      <h1>Basket Bear API Endpoint Reference</h1>
    </div>
    <p>This guide shows you how to access the public endpoints for the Basket Bear API. All requests to the Basket Bear API require authorization. See our Authorization Guide to learn how to obtain a token.</p>
      <h2 className="api-doc-intro api-doc-intro--header">Endpoints</h2>
      <div >
      </div>
      <h2 className="endpoint">/search</h2>
      <p>A GET request to the /search endpoint returns a json array populated with 20 products from Amazon and Ebay that match a search term provided in a request paramater</p>
      <p>A GET request is sent to the /api/search endpoint:</p>
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
          <div className="snippet">{`axios.get('http://budgetbasket.com/api/search', {
          params: {
            keyword: 'usb c cable'
          },
          headers: {
            Authorization: 'Bearer NgCXRKc...MzYjw'
          }
           })
          .then(res => console.log(res.data))
          .catch(err => console.log(err));`}
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
      <p>The results are ordered by price with the lowest first. The Amazon or Ebay product ID can be obtained from the results and used for requests to the /products endpoint as described below</p>

      <h2 className="endpoint">/products</h2>
      <p>A GET request to the /products endpoint returns a json array containing data for the 100 most popular items in our product database. The popularity is measured by how many users have added the product to their shopping list</p>
      <p>A GET request is sent to the /api/products endpoint:</p>
      <div className="snippet">GET http://budgetbasket.com/api/products</div>

          <div>For Example:</div>
          <div className="snippet">{`axios.get('http://budgetbasket.com/api/products', {
          headers: {
            Authorization: 'Bearer NgCXRKc...MzYjw'
          }
           })
          .then(res => console.log(res.data))
          .catch(err => console.log(err));`}
          </div>
          <div>Returns the following JSON response:</div>
          <div className="snippet">{`[
    {
        "currentPrice": "7.99",
        "merchant": "amazon",
        "prices": {
            "fdhFyeTB7PZi3obrigqUsKhjnX93": 7.99,
            "NJST78OEApa3uFX9mlR5EWa2ZAW2": 3.99,
            "nWyKsoVbsFRCilI2hf5kYA6m3Jz2": 6.5,
            "wvr7NXCF3NUIbwFPfnm1ieUGyg23": 5.99
        },
        "name": "AmazonBasics USB Type-C to USB Type-C 2.0 Cable - 6 Feet  (1.8 Meters) - Black",
        "id": "B01GGKZ1VA"
    },
    {
        "merchant": "eBay",
        "prices": {
            "BgSV18a0YeXTowYMdDUUJOVVh702": 0.75,
            "P5QyWtJxJaZXrXUZ0fWqi4VPaef1": 0.5,
            "fdhFyeTB7PZi3obrigqUsKhjnX93": "0.99"
        },
        "name": "Practical Banana Cutter Fruit Slicer Chopper Chic kitchen Gadgets Tools Yellow ",
        "currentPrice": "0.99",
        "id": "202066435906"
    },
    etc...]`}
          </div>
          <p>The response is an array of products, each of which include an Amazon or Ebay product ID as well as price information. The product ID can be used to target a single product on the same endpoint as shown below</p>
          <p>Each product contains a prices object that contains all the recorded target prices for the product and the corresponding enrypted user IDs'</p>
          <p><b>The request can contain optional query parameters for product ID and product Name</b></p>
        <table className="param">
          <tbody>
            <tr>
              <th>REQUEST PARAMETER</th>
              <th>VALUE</th>
            </tr>
            <tr>
              <td>id</td>
              <td><i>optional</i>. A text string set to the Amazon or Ebay product ID you want results to match </td>
            </tr>
          </tbody>
        </table>
         <p>A GET request is sent to the /api/products endpoint with an ID parameter:</p>
         <div className="snippet">{`GET http://budgetbasket.com/api/products/?id=<PRODUCT_ID>`}</div>

          <div>For Example:</div>
          <div className="snippet">{`axios.get('http://budgetbasket.com/api/products', {
             params: {
               id: 'B01GGKZ1VA'
             },
             headers: {
               Authorization: 'Bearer NgCXRKc...MzYjw'
             }
           })
          .then(res => console.log(res.data))
          .catch(err => console.log(err));`}
          </div>
          <div>Returns the following JSON response:</div>
          <div className="snippet">{`{
    "name": "AmazonBasics USB Type-C to USB Type-C 2.0 Cable - 6 Feet  (1.8 Meters) - Black",
    "merchant": "amazon",
    "currentPrice": "7.99",
    "prices": {
        "NJST78OEApa3uFX9mlR5EWa2ZAW2": 3.99,
        "nWyKsoVbsFRCilI2hf5kYA6m3Jz2": 6.5,
        "wvr7NXCF3NUIbwFPfnm1ieUGyg23": 5.99,
        "fdhFyeTB7PZi3obrigqUsKhjnX93": 7.99
    },
    "recorded_price_count": 4,
    "average_requested_price": 6.1175
}`}
          </div>
          <p>Using the ID parameter performs a constant time hash key lookup for the product and is much more efficient than looking up a product by name. Use the ID parameter if the product ID is known and fast or frequent lookups are needed. The ID for a product can be retrieved by using the search endpoint or the name parameter described below</p>

          <table className="param">
            <tbody>
              <tr>
                <th>REQUEST PARAMETER</th>
                <th>VALUE</th>
              </tr>
              <tr>
                <td>name</td>
                <td><i>optional</i>. A text string set to the product name you want results to match</td>
              </tr>
            </tbody>
          </table>
          <p>A GET request is sent to the /api/products endpoint with a name parameter:</p>
          <div className="snippet">{`GET http://budgetbasket.com/api/products/?name=<SEARCH_TERM>`}</div>

          <div>For Example:</div>
          <div className="snippet">{`axios.get('http://budgetbasket.com/api/products', {
             params: {
               name: 'usb'
             },
             headers: {
               Authorization: 'Bearer NgCXRKc...MzYjw'
             }
           })
          .then(res => console.log(res.data))
          .catch(err => console.log(err));`}
          </div>
          <div>Returns the following JSON response:</div>
          <div className="snippet">{`[
    {
        "merchant": "amazon",
        "prices": {
            "fdhFyeTB7PZi3obrigqUsKhjnX93": 7.99,
            "NJST78OEApa3uFX9mlR5EWa2ZAW2": 3.99,
            "nWyKsoVbsFRCilI2hf5kYA6m3Jz2": 6.5,
            "wvr7NXCF3NUIbwFPfnm1ieUGyg23": 5.99
        },
        "name": "AmazonBasics USB Type-C to USB Type-C 2.0 Cable - 6 Feet  (1.8 Meters) - Black",
        "currentPrice": "7.99",
        "id": "B01GGKZ1VA"
    },
    {
        "currentPrice": "6.99",
        "merchant": "amazon",
        "prices": {
            "WilRFtTKHtgnlI4XcPmkMOpgFU63": "7.00"
        },
        "name": "[2 in 1 Pack] Anker Micro USB to USB C Adapter, Converts Micro USB Female to USB C Male, Uses 56K Resistor, Works with Galaxy S8, S8+, MacBook, Nintendo Switch, Sony XZ, LG V20 G5 G6 and More",
        "id": "B01AHKYIRS"
    }, etc...]`}
        </div>

        <p>The response is an array containing only products with names that contain the search term. The results are ordered by descending popularity</p>
        <p>Using the name pamameter performs a search on all of the products in the database and is far less efficient than looking up a product by ID. Therefore, it should only be used if the product ID is not known</p>
        <p>*Note: we use <a href="https://github.com/axios/axios">Axios</a> in our examples but any AJAX client/library can be used</p>
          </div>

);

export default EndpointReference;
 // <div className="snippet">{`axios.get('http://budgetbasket.com/api/products', {
 //          params: {
 //            id: 'B073WV3KCD'
 //          },
 //          headers: {
 //            Authorization: 'Bearer NgCXRKc...MzYjw'
 //          }
 //           })
 //          .then(res => console.log(res.data))
 //          .catch(err => console.log(err));`}
 //          </div>
