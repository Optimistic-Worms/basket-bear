import React from 'react';


const EmailPreferences = (props) => {

  return (
    <div className="settings-layout">
      <h2>Email Notification Preferences</h2>
      <div>
      <span style={{background:'grey', color:'white'}}>{props.messages}</span>
      <div className="settings-form-wrapper">
        <input className="settings-form"
          placeholder="Add email..."
          onKeyUp={(e)=>{
            (e.keyCode === 13)? props.addEmail():props.trackNewEmail(e)
          }}
          type="email"/>
        <button className="button" onClick={() =>{props.addEmail()}}>Add</button>
      </div>
      </div>
      <p>You can have up to 5 email accounts that budget basket will notifiy to:</p>
      {props.emails.map((item,index)=>{
        return(
          <div className="settings-email-update" key={`emailCard${index}`}>
            <div className="email-wrapper">
            <div>{item.email}</div>
            <label>Use:
            <input
              type="checkbox"
              defaultChecked={item.status}
              onChange={(e) =>{props.OnOffForEmail(e,item.email)}}/>
            </label>
            <div>
              <button className="button button--remove button--remove-settings" onClick={(e) =>{props.deleteEmail(item.email)}}>Delete</button>
                </div>
            </div>
          </div>
          )
      })}
    </div>
  );
};


export default EmailPreferences;
