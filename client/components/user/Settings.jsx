import React from 'react';
import firebase from './firebase-auth';
import axios from 'axios';
import '../../css/settings.css';
import EmailPreferences from './EmailPreferences.jsx'
import PushNotification2 from './PushNotification2.jsx'

class Settings extends React.Component {
   constructor() {
    super();
    this.state = {
      name: '',
      newName: '',
      emailList: [],
      defaultEmail: {email:'j_allshorn@hotmail.com',status:true},
      newEmail: 'email',
      loading: true,
      messages: '',
      verifiedUser: true,
      userEmail: ''

    };
    this.updateUserProfile = this.updateUserProfile.bind(this)
    this.setName = this.setName.bind(this)
    this.setEmailNotificationPreferences = this.setEmailNotificationPreferences.bind(this)
    this.getEmailNotificationPreferences = this.getEmailNotificationPreferences.bind(this)
    this.OnOffForEmail = this.OnOffForEmail.bind(this)
    this.deleteEmail = this.deleteEmail.bind(this)
    this.addEmail = this.addEmail.bind(this)
    this.trackNewEmail = this.trackNewEmail.bind(this)
    this.setMessages = this.setMessages.bind(this)
    this.sendVerificationEmail = this.sendVerificationEmail.bind(this)
  }

  componentWillMount(){
		firebase.auth().onAuthStateChanged((user) => {
	    if (user) {
        let verifiedUser = user.emailVerified;
        let userEmail = user.email;
        this.setState({verifiedUser})
        this.setState({userEmail})
        this.setState({loading: false})
        this.getEmailNotificationPreferences()
	      let name = user.displayName;
	    	(name)? this.setState({name:name}): this.setState({name:''})
	    }
	  });
	}

  componentDidMount() {
    window.scrollTo(0,0);    
  }

  setName(e){
    let newName = e.target.value;
    this.setState({newName})
  }

  updateUserProfile(){
  	let newName;
  	(this.state.newName === '')? newName = this.state.name : newName = this.state.newName;
	    firebase.auth().onAuthStateChanged(function(user) {
		    if (user) {
				  user.updateProfile({displayName: newName})
				  .then(function() {
					  // Update successful.
					}).catch(function(error) {
					  // An error happened.
					});
			    } else {
			    // No user is signed in.
		    }
   		});
  }

  setEmailNotificationPreferences(data, callback){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
     	axios.post(`/userSettings?access_token=${idToken}`,data).then((result)=>{
     		return callback(result);
     	})
        })
      }
    })
  }

  getEmailNotificationPreferences(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
	      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
		     	axios.get(`/userSettings?access_token=${idToken}`)
			     	.then((result)=>{
			     		let emailList = result.data;
              let firstEmail = emailList[0].email;
              let defaultEmail = user.email;
              if(firstEmail !== defaultEmail){
                emailList.unshift({ email:defaultEmail, status:false })
              }
		     	    this.setState({emailList:emailList})
		     	})
	      })
      }
    })
  }

  setMessages(message){
    this.setState({messages:message})
    setTimeout(()=> this.setState({messages:''}),1500)
  }

  OnOffForEmail(e,email){
    let checked = e.target.checked;
    let newL = this.state.emailList.map((item) => (item.email === email)? {email:item.email,status:checked}: item);
    this.setState({emailList:newL})
    this.setEmailNotificationPreferences(newL,(result)=>{this.setMessages(result.data)})
  }

  deleteEmail(email){
    let emails = this.state.emailList;
    let emailList = emails.filter((item) => !(item.email === email));
    this.setState({emailList:emailList})
    this.setEmailNotificationPreferences(emailList,(result)=>{this.setMessages(result.data)})
  }

  addEmail(){
	  let stop = false;
	  let email = this.state.newEmail;
	  let emailList = this.state.emailList
	  if(emailList.length === 5){
	  	this.setMessages('Cannot exceed five email addresses')
	  	stop = true;
	  }
	  emailList.forEach(item => {
	  	if (item.email === email){
	  		this.setMessages('this email is already registered')
	  		stop = true;
	  	}
	  })
	  if (stop) return;
	  const validateEmail=(email)=> /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
		  if(validateEmail(email)){
		  	emailList.push({email:email,status:true});
		    this.setState({emailList:emailList})
		    this.setEmailNotificationPreferences(emailList,(result)=>{this.setMessages(result.data)})
		  } else{
		  	this.setMessages('Not a valid email format!')
		  }
   }

  trackNewEmail(e){
    let email = e.target.value;
    this.setState({newEmail:email})
  }

  sendVerificationEmail(){
    console.log('working')
    var user = firebase.auth().currentUser;
    let that = this
    let actionCodeSettings = {
      url: "https:\//basketbear.com/settings"
    }

    user.sendEmailVerification(actionCodeSettings).then(function() {
  // Email sent.

     console.log('sent')
     let messages = 'Please check your inbox including spam.'
     that.setState({messages})
     }).catch(function(error) {
  // An error happened.
     console.log(error)
     });
  }

  render(){
    // Check to see if the users is verified. 
    // if they are verified display setting else display verification option.
    if(this.state.loading){
    return (
      <div></div>
    )
    }
    if(!this.state.verifiedUser){
      return(
      <div className="settings-card">
       <h2 className="login-header">Account Settings</h2>
        <div className="settings-layout">
          <div className="not-verified">
            <h3>
            Please verify your account   
            </h3>
            <div className="settings-form-wrapper">
            Send verification email to {this.state.userEmail}
            <button onClick={() => this.sendVerificationEmail()} className="button button-settings">Send</button>

            <div>
            {this.state.messages}
            </div>
            </div>
          </div>
        </div>
      </div>
      )
    } else {
  return (
    <div className="settings-card">    
      <h2 className="login-header">Account Settings</h2>
      <div className="settings-layout">
	      <div>
		      <h3>Username:</h3>
          <div className="settings-form-wrapper">
            <input className="settings-form" type="text" onKeyUp={(e) => this.setName(e)} placeholder={this.state.name}/>
		      <button className="button button-settings" onClick={() => this.updateUserProfile()}>Update</button>
        </div>
	      </div>
      </div>
      <EmailPreferences
	      emails={this.state.emailList}
	      OnOffForEmail={this.OnOffForEmail}
	      deleteEmail={this.deleteEmail}
	      addEmail={this.addEmail}
	      trackNewEmail={this.trackNewEmail}
	      messages={this.state.messages}
      />
      <PushNotification2/>
    </div>
  )
  }
  }
}

export default Settings
