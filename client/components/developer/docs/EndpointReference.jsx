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
          <div className="json-snippet">{`[
    {
        "id": "311973312571",
        "name": "10FT Braided Type C Fast Charging Cable USB-C Rapid Cord Power Charger Charge",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/3119733125714040_3.jpg",
        "merchant": "eBay",
        "price": "3.49",
        "link": "http://www.ebay.com/itm/10FT-Braided-Type-C-Fast-Charging-Cable-USB-C-Rapid-Cord-Power-Charger-Charge-/311973312571?var=610757802005",
        "currentPrice": "3.49"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000004_1.jpg",
        "merchant": "eBay",
        "price": "3.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303826",
        "currentPrice": "3.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000011_1.jpg",
        "merchant": "eBay",
        "price": "3.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303883",
        "currentPrice": "3.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000008_1.jpg",
        "merchant": "eBay",
        "price": "3.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303856",
        "currentPrice": "3.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000001_1.jpg",
        "merchant": "eBay",
        "price": "3.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303799",
        "currentPrice": "3.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000005_1.jpg",
        "merchant": "eBay",
        "price": "4.87",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303829",
        "currentPrice": "4.87"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000002_1.jpg",
        "merchant": "eBay",
        "price": "4.87",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303802",
        "currentPrice": "4.87"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000008_1.jpg",
        "merchant": "eBay",
        "price": "4.87",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303850",
        "currentPrice": "4.87"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000006_1.jpg",
        "merchant": "eBay",
        "price": "4.87",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303838",
        "currentPrice": "4.87"
    },
    {
        "id": "311973312571",
        "name": "10FT Braided Type C Fast Charging Cable USB-C Rapid Cord Power Charger Charge",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/3119733125714040_3.jpg",
        "merchant": "eBay",
        "price": "4.94",
        "link": "http://www.ebay.com/itm/10FT-Braided-Type-C-Fast-Charging-Cable-USB-C-Rapid-Cord-Power-Charger-Charge-/311973312571?var=610757801965",
        "currentPrice": "4.94"
    },
    {
        "id": "B01M6YW2S7",
        "name": "USB Type C Cable 3ft, FanTEK USB C to A 3.0 Fast Charging Charge Cable for Nintendo Switch,Samsung Galaxy S8/S8+,Google Pixel 2 XL,LG V30/V20/G6,ZTE Zmax Pro,HTC 10/Bolt/U11,Nextbit Robin,Oneplus 3T/5",
        "merchant": "amazon",
        "link": "https://www.amazon.com/FanTEK-Charging-Nintendo-Samsung-Nextbit/dp/B01M6YW2S7?psc=1&SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01M6YW2S7",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41YlyRnjOqL._SL160_.jpg",
        "price": "4.99",
        "currentPrice": "4.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000009_1.jpg",
        "merchant": "eBay",
        "price": "5.18",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303862",
        "currentPrice": "5.18"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000010_1.jpg",
        "merchant": "eBay",
        "price": "5.18",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303871",
        "currentPrice": "5.18"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000011_1.jpg",
        "merchant": "eBay",
        "price": "5.87",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303877",
        "currentPrice": "5.87"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000005_1.jpg",
        "merchant": "eBay",
        "price": "5.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303832",
        "currentPrice": "5.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000006_1.jpg",
        "merchant": "eBay",
        "price": "5.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303841",
        "currentPrice": "5.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000003_1.jpg",
        "merchant": "eBay",
        "price": "5.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303814",
        "currentPrice": "5.99"
    },
    {
        "id": "B00S8GU2OC",
        "name": "Cable Matters Ultra Slim Series USB-C Cable (USB-C to USB) in Black 3.3 Feet",
        "merchant": "amazon",
        "link": "https://www.amazon.com/Cable-Matters-Ultra-USB-C-Black/dp/B00S8GU2OC?psc=1&SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B00S8GU2OC",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41OwvRnvcYL._SL160_.jpg",
        "price": "5.99",
        "currentPrice": "5.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000002_1.jpg",
        "merchant": "eBay",
        "price": "5.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303805",
        "currentPrice": "5.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000004_1.jpg",
        "merchant": "eBay",
        "price": "5.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303820",
        "currentPrice": "5.99"
    },
    {
        "id": "391626551019",
        "name": "✔ LOT- Nylon Braided Rope USB-C Type-C 3.1 Data Sync Charger Charging Cable Cord",
        "imageUrl": "http://thumbs4.ebaystatic.com/pict/391626551019404000000004_1.jpg",
        "merchant": "eBay",
        "price": "6.99",
        "link": "http://www.ebay.com/itm/LOT-Nylon-Braided-Rope-USB-C-Type-C-3-1-Data-Sync-Charger-Charging-Cable-Cord-/391626551019?var=660731303823",
        "currentPrice": "6.99"
    },
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
    {
        "id": "B01ISLH4V0",
        "name": "USB Type C Cable, Snowkids USB C Cable 6.6Ft(2 PACK) Nylon Braided Cord USB Type A to C Fast Charger for Samsung Galaxy Note 8,S8 Plus,LG V30 V20 G6 G5,Google Pixel,Nexus 6P 5X,Moto Z Z2 & More(Grey)",
        "merchant": "amazon",
        "link": "https://www.amazon.com/Snowkids-Braided-Charger-Samsung-Galaxy/dp/B01ISLH4V0?SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01ISLH4V0",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/413FDhrxPNL._SL160_.jpg",
        "price": "8.99",
        "currentPrice": "8.99"
    },
    {
        "id": "B01N5KL10L",
        "name": "USB Type C Cable, Snowkids USB C to USB A (USB 3.0)6.6ft Nylon Braided Fast Charger Cord for Samsung Galaxy Note 8 S8,Google Pixel 2, LG V30 V20 G6 5, Nintendo Switch, OnePlus 5 3T 2(Grey)",
        "merchant": "amazon",
        "link": "https://www.amazon.com/Snowkids-Braided-Charger-Samsung-Nintendo/dp/B01N5KL10L?psc=1&SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01N5KL10L",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41v7iOJoPyL._SL160_.jpg",
        "price": "9.99",
        "currentPrice": "9.99"
    },
    {
        "id": "B073WV3KCD",
        "name": "USB Type C Cable,Covery USB C Cable 4 Pack (1x1ft,2x4ft, 1x6ft) Nylon Braided USB C to USB A Charger Cord (USB 2.0) for Samsung Note 8,Galaxy S8,Apple New Macbook, Nexus 6P 5X,Google Pixel,LG G5 G6",
        "merchant": "amazon",
        "link": "https://www.amazon.com/Covery-Braided-Charger-Samsung-Macbook/dp/B073WV3KCD?SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B073WV3KCD",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51-epq1Z0cL._SL160_.jpg",
        "price": "10.99",
        "currentPrice": "10.99"
    },
    {
        "id": "B075M6275Q",
        "name": "USB Type C Cable, OULUOQI USB C Cable 3 Pack(6ft) Nylon Braided Fast Charger Cord(USB 2.0) for Samsung Galaxy Note 8 S8 S8 Plus,LG V30 G6 G5 V20,Google Pixel, Moto Z2, Nintendo Switch, Macbook(Grey)",
        "merchant": "amazon",
        "link": "https://www.amazon.com/OULUOQI-Braided-Charger-Samsung-Nintendo/dp/B075M6275Q?SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B075M6275Q",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51C3LyJsPTL._SL160_.jpg",
        "price": "10.99",
        "currentPrice": "10.99"
    },
    {
        "id": "B0722DMYTN",
        "name": "USB Type C Cable, BrexLink USB C to USB A Charger (6.6ft 2 Pack), Nylon Braided Fast Charging Cord for Samsung Galaxy Note 8 S8,Google Pixel, LG V30 V20 G6 5, Nintendo Switch, OnePlus 5 3T 2(Grey)",
        "merchant": "amazon",
        "link": "https://www.amazon.com/BrexLink-Charger-Braided-Charging-Nintendo/dp/B0722DMYTN?psc=1&SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B0722DMYTN",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51FZ%2BbrGk4L._SL160_.jpg",
        "price": "10.99",
        "currentPrice": "10.99"
    },
    {
        "id": "B01HF0YGCK",
        "name": "[3 Pack] Anker PowerLine USB-C to USB 3.0 Cable (3ft) with 56k Ohm Pull-up Resistor for Samsung Galaxy Note 8, S8, S8+, MacBook, Nintendo Switch, Sony XZ, LG V20 G5 G6, HTC 10, Xiaomi 5 and More",
        "merchant": "amazon",
        "link": "https://www.amazon.com/Anker-PowerLine-Pull-up-Resistor-Nintendo/dp/B01HF0YGCK?SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01HF0YGCK",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41q5WoDPaRL._SL160_.jpg",
        "price": "14.99",
        "currentPrice": "14.99"
    },
    {
        "id": "B073V2LY6B",
        "name": "USB C Cable / Type C to USB Fast Charging Cord [Pack of 5], Gold-Plated & Nylon Braided (10ft + 6.5ft + 2x3.3ft + 1ft) for Samsung Galaxy S8/Plus, Nexus 5X/6P, Nintendo Switch and More [Equilibrium +]",
        "merchant": "amazon",
        "link": "https://www.amazon.com/Charging-Gold-Plated-Braided-Nintendo-Equilibrium/dp/B073V2LY6B?SubscriptionId=AKIAILB4PLL5XMVH2VMQ&tag=optimisticwor-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B073V2LY6B",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51hHUMk8fLL._SL160_.jpg",
        "price": "16.98",
        "currentPrice": "16.98"
    }
]`}
          </div>
  </div>
);

export default EndpointReference;

