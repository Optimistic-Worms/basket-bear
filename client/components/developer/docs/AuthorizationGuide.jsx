import React from 'react';
import '../../../css/bb_client_flow.png';

const AuthorizationGuide = () => (
  <div className="api-doc-intro">
    <div className="api-doc-intro api-doc-intro--header">
      <h1>Basket Bear API Authorization Guide</h1>
    </div>
    <p>This guide shows you how to get authorization to access protected endpoints on the Basket Bear API.</p>
    <div >
      <h2>Introduction</h2>
    </div>
    <p>All requests to the Basket Bear API require authorization. After creating your Developer account you will be provided with a unique client ID and client Secret to use in the authorization flows detatiled below.</p>
      <div >
        <h2>Supported Authorization Flows</h2>
      </div>
      <h3>Client Credentials Flow</h3>
      <div>Allows your application to obtain an access token by supplying your client credentials (client ID and client secret). This flow is used in server-to-server authentication and should NOT be used for single page apps in which the credentials are stored on the client. This flow is desribed in the oauth2 specification RFC-6749.</div>
      <img src="/assets/bb_client_flow.png" className="auth-flow"/>
      <h3>Step 1: Your Application requests a token</h3>
      <div>The request is sent to the /api/token endpoint:</div>
      <div className="snippet">POST http://budgetbasket.com/api/token</div>
      <div>The body of this POST request must contain the following parameters:</div>
        <table className="param">
          <tbody>
            <tr>
              <th>REQUEST BODY PARAMETER</th>
              <th>VALUE</th>
            </tr>
            <tr>
              <td>grant_type</td>
              <td><i>Required</i>. Set it to “client_credentials”</td>
            </tr>
            <tr>
              <th>HEADER PARAMETER</th>
              <th>VALUE</th>
            </tr>
            <tr>
              <td>Authorization</td>
              <td><i>Required</i>. Base 64 encoded string that contains the client ID and client secret key. The field must have the format: Authorization: Basic {`<base64 encoded client_id:client_secret>`}</td>
            </tr>
          </tbody>
        </table>
          <div>For Example:</div>
          <div className="snippet">{` axios.post('http://budgetbasket.com/api/token', {'grant_type': 'client_credentials'}, {
                  withCredentials: true,
                  auth: {
                    username: example@example.com,
                    password: 'password',
                }
              })
              .then((res) => {
                console.log(res.data)
              })
              .catch(err => {
                console.log(err);
              });`}
          </div>
          <div>Returns a JSON response containing an authorization token:</div>
          <div className="snippet">{
          `{\n  "access_token": "NgCXRKc...MzYjw", \n  "token_type": "bearer", \n  "expires_in": 3600  \n}`}
          </div>
       <h3>Step 2: Use the access token to access the Basket Bear Web API</h3>

        <div className="snippet">{`axios.get('http://budgetbasket.com/api/products', {
          params: {
            id: 'B073WV3KCD'
          },
          headers: {
            Authorization: 'Bearer NgCXRKc...MzYjw'
          }
           })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));`}</div>
        <div>*Note: we use <a href="https://github.com/axios/axios">Axios</a> in our examples but any AJAX client/library can be used</div>
  </div>

);

export default AuthorizationGuide;

