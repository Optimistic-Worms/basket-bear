import React from 'react';
import axios from 'axios'
import Promise from 'bluebird';
import ApiUserLogin from './ApiUserLogin.jsx';

const ClientSecret = (props) => {
  const getNewSecret = () => {
  axios.get('/api/renew', {
        headers: {'Authorization': `Bearer ${props.token}`}
      })
      .then(data => {
        props.setSecret(data.data);
        props.toggleView();
      })
      .catch(err => console.log(err));
  }

  return (
  <div>{
  props.secret ?
    <div>
      <div>{props.secret}</div>
      <p>Store your Client Secret in a safe place. You will not be able to retrieve your client secret after you log out. If you lose your Client Secret you can reset it</p>
    </div>
    :
    <div>
      <div>*********</div>
      <p>If you have lost your Client Secret you can reset it</p>
    </div>
  }
   <div className="button button--remove reset"
     onClick={() => {
        props.toggleView();
        getNewSecret();
     }}
   >Reset Secret</div>
  </div>
  )
};

export default ClientSecret;