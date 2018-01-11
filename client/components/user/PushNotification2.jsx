import React from 'react';
import axios from 'axios';
import Loadable from 'react-loading-overlay';
import firebase from './firebase-auth';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';


let swRegistration = null;

class PushNotification2 extends React.Component {
  constructor(){
  	super();
  	this.state = {
  	  isSubscribed:false,
  	  pushButton:'Subscribe On this device',
  	  messages:'',
  	  pushButtonDisabled: true,
      overlayLoader: false,
      subscriptionJson: {},
  	  applicationServerPublicKey: 'BLEvqwFXhnK_rPZtRn7O8Z10kt1c6RDl2vfZsBHCeZVhmwTkDQE841NM9TkKvvmEbrbcwA0aaXA9oYwfJSpT1mI'
  	}
    this.initializeUI = this.initializeUI.bind(this)
    this.updateBtn = this.updateBtn.bind(this)
    this.pushButtonListener = this.pushButtonListener.bind(this)
    this.subscribeUser = this.subscribeUser.bind(this)
    this.urlB64ToUint8Array = this.urlB64ToUint8Array.bind(this)
    this.unsubscribeUser = this.unsubscribeUser.bind(this)
    this.addSubscription = this.addSubscription.bind(this)
    this.deleteSubscription = this.deleteSubscription.bind(this)
  }

   componentWillMount(){
     if ('serviceWorker' in navigator && 'PushManager' in window) {
       runtime.register().then((swReg)=>{
       	this.setState({messages:'This device can support device notifications'})
       	swRegistration = swReg;
       	this.initializeUI();
       }).catch(error =>{
       	this.setState({messages:`Notification system error: ${error}`})
       })
     } else {
       this.setState({messages:'Sorry! This type of browser does not support device notifications'})
			 this.setState({pushButton: 'Push Not Supported'});
     }
   }

   initializeUI(){
    let that = this
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      let isSubscribed = !(subscription === null);
      that.setState({isSubscribed:isSubscribed})
    if (isSubscribed) {

      that.setState({messages:'You are subscribed on this device' });
    } else {
      console.log('User is NOT subscribed.');
    }
    that.updateBtn();
    }).catch(error => {
      console.log(error)
    });
   }

   updateBtn() {

      if (Notification.permission === 'denied') {
        this.setState({pushButton:'Push Messaging Blocked.'});
        this.setState({pushButtonDisabled:true});
        this.updateSubscriptionOnServer(null);
        return;
      }
  		if (this.state.isSubscribed) {
    	this.setState({pushButton:'Disable Push Messaging' })
  		} else {
    	this.setState({pushButton:'Enable Push Messaging' })
  	  }
  		this.setState({pushButtonDisabled:false});
		}

		pushButtonListener(){
      this.setState({overlayLoader: true})
  	 this.setState({pushButtonDisabled:true})
  	 if(this.state.isSubscribed){
  	 	this.unsubscribeUser();
  	 } else {
  	  this.subscribeUser();
  	 }
   	}

		urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
		}

		subscribeUser() {
			let that = this
			const applicationServerKey = this.urlB64ToUint8Array(this.state.applicationServerPublicKey);
			swRegistration.pushManager.subscribe({userVisibleOnly: true,applicationServerKey: applicationServerKey})
			.then(function(subscription) {
			that.updateSubscriptionOnServer(subscription, 'add');
		  that.setState({isSubscribed:true});

			that.updateBtn();
			})
			.catch(function(err) {
			console.log('Failed to subscribe the user: ', err);
			that.updateBtn();
			});
		}

    unsubscribeUser() {
      let that = this;
      swRegistration.pushManager.getSubscription()
      .then(subscription => {
        if (subscription) {
      // TODO: Tell application server to delete subscription
      that.updateSubscriptionOnServer(subscription, 'delete')
      that.setState({isSubscribed:false});
      that.updateBtn();
      this.setState({overlayLoader: false})
      subscription.unsubscribe()
      return ;
      }
      })
      .catch(error => {
      console.log('Error unsubscribing', error);
      })
    }

    addSubscription(idToken, subscription){
      axios.post(`/subscribe?access_token=${idToken}`,{subscription:subscription}).then((result)=>{
        this.setState({isSubscribed:true});
        this.setState({overlayLoader: false})
        this.setState({messages: result.data});

      }).catch(error =>{
        this.setState({messages: error});
      });
      this.setState({subscriptionJson:subscription})
    }

    deleteSubscription(idToken, endpoint){
      axios.post(`/unsubscribe?access_token=${idToken}`,{subscription:endpoint}).then((result)=>{
      this.setState({messages: result.data});
      }).catch(error =>{
        this.setState({messages: error});
      });
      this.setState({subscriptionJson:{}})
    }

    updateSubscriptionOnServer(endpoint, task) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.auth().currentUser.getIdToken(true).then((idToken) => {
          (task === 'add')? this.addSubscription(idToken, endpoint): this.deleteSubscription(idToken, endpoint)
        }).catch(error => {
          console.log(error)
        })
        } else {
         console.log('NO USER FOR subscription')
        }
      }) // End auth check

    }

   render(){
   	return (
    <div>
      <Loadable
      active={this.state.overlayLoader}
      spinner
      text='Saving...'
      >
      <div className="settings-layout">
        <h2>Device notification settings</h2>
        <span className="settings-push-message">{this.state.messages}</span>
        <div className="settings-push-update" >
          <p>Update push notification settings</p>
                  <button className={ (this.state.isSubscribed)? "button button--remove button--remove-settings" :"button button-settings"   }
          onClick={(e)=>this.pushButtonListener()}
          disabled={this.state.pushButtonDisabled}
        >
        {this.state.pushButton}
        </button>
        </div>
      </div>
        </Loadable>
		</div>
    )
   }
}

export default PushNotification2;
