import React from 'react';

const AuthorizationGuide = () => (
  <div className="api-doc-intro">
    <div className="api-doc-intro api-doc-intro--header">
      <h1>Budget Basket API Authorization Guide</h1>
    </div>
    <p>This guide shows you how to get authorization to access protected endpoints on the Budget Basket API.</p>
    <div className="api-doc-intro api-doc-intro--header">
      <h2>Introduction</h2>
    </div>
    <p>All requests to the Budget Basket API require authorization. After creating your Developer account you will be provided with a unique client ID and client Secret to use in the authorization flows detatiled below.</p>
      <div className="api-doc-intro api-doc-intro--header">
        <h2>Supported Authorization Flows</h2>
      </div>
      <h3>Client Credentials Flow</h3>
      <div>Allows your application to obtain an access token by supplying your client credentials (client ID and client secret). This flow is used in server-to-server authentication and should NOT be used for single page apps in which the credentials are stored on the client. This flow is desribed in the oauth2 specification RFC-6749.</div>
      <div className="auth-flow"> </div>
       <h3>Step 1: Your Application requests a token</h3>
       <div>The request is sent to the /api/token endpoint:</div>
       <div className="snippet">POST https://budgetbasket.com/api/token</div>
       <div>The body of this POST request must contain the following parameters:</div>
       <div className="doc-header">
         <div>REQUEST BODY PARAMETER</div>
         <div>VALUE</div>
       </div>
       <h3>Step 2: Use the access token to access the Budget Basket Web API</h3>
  </div>
);

export default AuthorizationGuide;

