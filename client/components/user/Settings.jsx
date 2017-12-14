import React from 'react';
import firebase from './firebase-auth';
import axios from 'axios';
import EmailPreferences from './EmailPreferences.jsx'

class Settings extends React.Component {
   constructor() {
    super();
    this.state = {
      name: '',
      newName: '',
      emailList: [],
      newEmail: 'email'
    };
    this.updateUserProfile = this.updateUserProfile.bind(this)
    this.setName = this.setName.bind(this)
    this.setEmailNotificationPreferences = this.setEmailNotificationPreferences.bind(this)
    this.getEmailNotificationPreferences = this.getEmailNotificationPreferences.bind(this)
    this.OnOffForEmail = this.OnOffForEmail.bind(this)
    this.deleteEmail = this.deleteEmail.bind(this)
    this.addEmail = this.addEmail.bind(this)
    this.trackNewEmail = this.trackNewEmail.bind(this)
  }

  updateUserProfile(){
  	let newName;
  	(this.state.newName === '')? newName = this.state.name : newName = this.state.newName;
    	
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
		  user.updateProfile({
		  displayName: newName

		}).then(function() {
		  // Update successful.
		}).catch(function(error) {
		  // An error happened.
		});
    } else {
    // No user is signed in.
    }
   });
  }

  setEmailNotificationPreferences(data){
  	console.log(data)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
     	axios.post(`/userSettings?access_token=${idToken}`,data).then((result)=>{
     		console.log(result)
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
		     	    this.setState({emailList:emailList})
		     	})
	      })
      }     
    }) 
  }

  OnOffForEmail(e,email){
    let checked = e.target.checked;
    let emails = this.state.emailList;
    let newL = emails.map((item) => (item.email === email)? {email:item.email,status:checked}: item);
    this.setState({emailList:newL})
    this.setEmailNotificationPreferences(newL)
  }

  deleteEmail(email){
    let emails = this.state.emailList;
    let newL = emails.filter((item) => !(item.email === email));
    this.setState({emailList:newL})
    this.setEmailNotificationPreferences(newL)
  }

  addEmail(){
  let email = this.state.newEmail;
  const validateEmail=(email)=> /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	  if(validateEmail(email)){
	    let emails = this.state.emailList;
	  	emails.push({email:email,status:true});
	    this.setState({emailList:emails})
	    this.setEmailNotificationPreferences(emails)
	  }
	  this.setState({newEmail:''})
  }

  trackNewEmail(e){
    let email = e.target.value;
    this.setState({newEmail:email})
  }

  componentDidMount(){
  	firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      	let name = user.displayName;
      	if(name){
      	this.setState({name:name})
        } else {
        this.setState({name:''})
        }
      } else {
        console.log('Error no user detected!');
    }
    });
    this.getEmailNotificationPreferences()
  }

  setName(e){
    let newName = e.target.value;
    this.setState({newName})
  }

  render(){
  return (
    <div className="watch-container">
      <h1>Your Account Settings</h1>
      <div>
      	<h2>Username:</h2>      
	      <div>
		      <input type="text" onKeyUp={(e) => this.setName(e)} placeholder={this.state.name}/>
		      <button onClick={() => this.updateUserProfile()}>Update</button>
	      </div>
      </div>
      <EmailPreferences 
	      emails={this.state.emailList} 
	      OnOffForEmail={this.OnOffForEmail}
	      deleteEmail={this.deleteEmail}
	      addEmail={this.addEmail}
	      trackNewEmail={this.trackNewEmail}
      />
      <div>
	      <h2>Device notification settings</h2>
	      <div>
		      Register this device to get notifications.
		      <button>Register Now</button>
	      </div>
	      <div>
		      Turn off Notifications for this device.
		      <button>Turn off</button>
	      </div>
      </div>      
    </div>
  )
  }	

}

export default Settings