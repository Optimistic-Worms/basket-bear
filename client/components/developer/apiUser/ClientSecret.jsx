import React from 'react';
import axios from 'axios'
import Promise from 'bluebird';

const ClientSecret = ({ secret }) => {
  const getNewSecret = () => {

  }

  return (
  <div>{
  {secret} ?
    <div>
      <div>*********</div>
      <div>If you lost your Client Secret you must reset it</div>
    </div>
    :
    <div>
      <div>secret</div>
      <div>Store your Client Secret in a safe place. You will not be able to retrieve your client secret after you log out. If you lose your Client Secret you can reset it</div>
    </div>
  }
   <div className="button button--remove"
     onClick={() => {
       props.setSecret()
     }}
   ></div>
  </div>
  )
};

export default ClientSecret;