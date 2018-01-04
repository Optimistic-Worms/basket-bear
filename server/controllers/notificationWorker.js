const db = require('../../db/db-config');
const getSubscriptionsFromDB = require('./userSettings.js').getSubscriptionsFromDB;
const webPush = require('web-push');
const axios = require('axios');
let emailAuth;

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
 require('dotenv').config();
}

if(process.env.NODE_ENV !== 'test'){
    emailAuth = process.env.EMAIL_AUTH
    webPush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
    );
}




const getSubData = () =>{
	
	return new Promise((resolve, reject) => {
		const dataArr = [];
		db.collection('awaitNotification').get()
		.then(snapshot => {
		  snapshot.forEach(doc =>{
		  let docId = doc.id;	
		  let data = doc.data().items;
		  dataArr.push({docId,data});
		  });
      resolve(dataArr)
		})
		.catch((error) => {
		  console.log(error)
		  console.log('no registered push endpoints')
		  reject(error);
		});
	});
}

const sendPush = (pushSubscribers, info) =>{

	let message = `${info.product} \nDropped to $${info.priceDroppedTo} You were asking $${info.requestedPrice}` || `Budget-basket updated`;
	let clickTarget =  `http://www.favoritemedium.com`;
	let title = `Price update!`;
	let payload = JSON.stringify({message : message, clickTarget: clickTarget, title: title});
	pushSubscribers.forEach(pushSubscription => {
	webPush.sendNotification(pushSubscription, payload).then(response => {
	//  console.log(response)
	}).catch(error => { 
	//	console.log(error) 
	});
	});
}

let dataObj = {};


const emailer = (email, info) => {
   var data = {
    'name': '',
    'email': email,
    'message':`${info.product} \nDropped to $${info.priceDroppedTo} You were asking $${info.requestedPrice}`,
    'subject': `Price update!`,
   };
   var options = {
     'method' : 'post',
     'contentType': 'application/json',
     'payload' : data,
     'auth': emailAuth
   };
   console.log(data.message)
   console.log(email);
   var secondScriptID = 'AKfycbxjbt4Lk4MO3rVu9vG2k3kMT4ih0RwvMr6-In25nHmN32GtGuU'
/*   axios.post("https://script.google.com/macros/s/" + secondScriptID + "/exec", options).then((response)=>{
     console.log(response)
     
   }).catch(error =>{
     console.log(error)
   }).catch(error =>{
    console.log(error)
   });*/
}



const sendEmail = (emailSubscribers, info) =>{
	emailSubscribers.forEach(email => {
  emailer(email, info)
	});
}
  let obj = {}
const sendNotificationToUser = (username, info) =>{
  
  /*info = {
    'user': user,
    'product': productName,
    'productId': productId,
    'merchant': merchant,
    'requestedPrice': requestedPrice,
    'priceDroppedTo': currentPrice
  }*/

  getSubscriptionsFromDB(username).then(subs => {
    let pushSubscribers = [];
    let emailSubscribers = [];
    for (var i in subs){    	
    	if(subs[i].keys && subs[i].keys.auth ){
	    pushSubscribers.push(subs[i])
	    }
  	}
  	if (subs.emailNotificationSettings.length) {  
	  	
	  	let user = subs.username;
	  	let emailArr;		
	  	let emails = {}
	    subs.emailNotificationSettings.forEach(item =>{
	    	if(item.status === true ) {
	    		emails[item.email] = true;
	    	}
	    	obj[user] = emails
	    })
  	} 
  
	  if(pushSubscribers.length){
	    sendPush(pushSubscribers, info)
	  }  
	  if(emailSubscribers.length){	
  //  console.log(emailSubscribers)
	//  sendEmail(emailSubscribers, dataObj)
	  } 
	  console.log(obj)   
  }).catch(error => {
  	console.log('Push Completely failed', error)
  })
}

const sendNotification = (user, info) => {
}


const sendPushNotifications =(data) => {

   data.forEach(info =>{
   	if(info.data) {
     sendNotificationToUser(info.data.user, info.data)
   	} 
   })
}


exports.notificationWorker = (req, res) =>{

  getSubData().then(result =>{
  	sendPushNotifications(result)
  	res.sendStatus(200);
  }).catch(err =>{
  	console.log(err)
  	res.send(err);
  })
}