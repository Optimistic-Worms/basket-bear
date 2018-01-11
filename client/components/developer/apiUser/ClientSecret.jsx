import React from 'react';
import axios from 'axios'
import Promise from 'bluebird';
import ApiUserLogin from './ApiUserLogin.jsx';


const ClientSecret = (props) => {
  const getNewSecret = () => {

  }
  console.log('SECRET: ', props.secret)
  return (
  <div>{
  props.secret ?
    <div>
      <div>{props.secret}</div>
      <div>Store your Client Secret in a safe place. You will not be able to retrieve your client secret after you log out. If you lose your Client Secret you can reset it</div>
    </div>
    :
    <div>
      <div>*********</div>
      <div>If you lost your Client Secret you must reset it</div>
    </div>
  }
   <div className="button button--remove"
     onClick={() => {
       props.setSecret()
       return <div>Reset</div>
     }}
   ></div>
  </div>
  )
};

export default ClientSecret;