import React from 'react';


const EmailPreferences = (props) => {

  return (
    <div className="settings-layout">
      <h3>Email Notification Preferences</h3>
      {/* 
      <div>
      <span style={{background:'grey', color:'white'}}>{props.messages}</span>
      <div className="settings-form-wrapper">
        <input className="settings-form"
          placeholder="Add email..."
          onKeyUp={(e)=>{
            (e.keyCode === 13)? props.addEmail():props.trackNewEmail(e)
          }}
          type="email"/>
        <button className="button button-settings" onClick={() =>{props.addEmail()}}>Add</button>
      </div> 
      </div>

      <p>You can have up to 4 additional email accounts that Basket Bear will notifiy to:</p>
      */}
      {props.emails.map((item,index)=>{
        return(
          <div className="settings-email-update" key={`emailCard${index}`}>
            <div className="email-wrapper">
              <div className="email-checkbox">
            <div>{item.email}</div>
            <label>Use:
            <input
              type="checkbox"
              defaultChecked={item.status}
              onChange={(e) =>{props.OnOffForEmail(e,item.email)}}/>
            </label>
          </div>
            <div>
            {(index !== 0)?
                <button className="button button--remove button--remove-settings" onClick={(e) =>{props.deleteEmail(item.email)}}>Delete</button>
                :
                <span>Registered email</span>
            }
                </div>
            </div>
          </div>
          )
      })}
    </div>
  );
};


export default EmailPreferences;
