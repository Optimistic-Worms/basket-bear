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
      newEmail: 'email',
      messages: '',
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
  }

  componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
	    if (user) {
	      let name = user.displayName;
	    	(name)? this.setState({name:name}): this.setState({name:''})        
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
	  	this.setMessages('Opps...! You already have 5 emails')
	  	stop = true;
	  } 
	  emailList.forEach(item => {
	  	if (item.email === email){
	  		this.setMessages('Opps...! you already have this email registered')
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
	      messages={this.state.messages}
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