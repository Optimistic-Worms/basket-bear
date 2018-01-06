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
	let clickTarget =  `http://localhost:3000/watchList`;
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


const emailer = (emails, info) => {
   var data = {
    'name': '',
    'email': emails.join(';'),
    'message':JSON.stringify(info),
    'subject': `Price update!`,
   };
   var options = {
     'method' : 'post',
     'contentType': 'application/json',
     'payload' : data,
     'auth': emailAuth
   };
   console.log(data)
//   console.log(email);
   var secondScriptID = 'AKfycbxjbt4Lk4MO3rVu9vG2k3kMT4ih0RwvMr6-In25nHmN32GtGuU'
   axios.post("https://script.google.com/macros/s/" + secondScriptID + "/exec", options).then((response)=>{
     console.log(response)
     
   }).catch(error =>{
     console.log(error)
   }).catch(error =>{
    console.log(error)
   });
}

let usersList = {};

const sendNotificationToUser = (username, info) =>{
  

  getSubscriptionsFromDB(username).then(subs => {
    let pushSubscribers = [];
    for (var i in subs){ 
      if(Array.isArray(subs[i]) && subs[i].length){
      	let emailArr = subs[i]; 
      	emailArr.forEach(item => {
      		if (item.status){
      			usersList[username].emails.add(item.email)
      		}
      	});
      }
    	if(subs[i].keys && subs[i].keys.auth ){
	    pushSubscribers.push(subs[i])
	    }
  	}    
	  if(pushSubscribers.length){
	    sendPush(pushSubscribers, info)
	  } 
  }).catch(error => {
  	console.log('Push Completely failed', error)
  })
  
}

const iterateAwaitNotifications =(data) => {
   return new Promise(async(resolve,reject) => {
   resolve(
   data.forEach(prod =>{
   	if(prod.data) {
   		let user = prod.data.user;
   	usersList[user]? usersList[user].data.push(prod.data): usersList[user] = {"data":[prod.data]}
   	if(usersList[user]) usersList[user]["emails"] = new Set();
   	sendNotificationToUser(prod.data.user, prod.data)
   	} 
   })
   )
   })

}


exports.notificationWorker = (req, res) =>{
  usersList = new Object();
  getSubData().then(result =>{
  	iterateAwaitNotifications(result).then(()=>{
  		setTimeout(()=>{
  			  console.log(usersList)
  			for(var i in usersList){
  				let mailingList = [...usersList[i].emails];
  				let data = usersList[i].data
          if(mailingList.length){
          	emailer(mailingList, data);
          }  				          
  			}
  		},3000)
  		
  		res.sendStatus(200);
  	})
  	
  }).catch(err =>{
  	console.log(err)
  	res.send(err);
  })
}


  /*info = {
    'user': user,
    'product': productName,
    'productId': productId,
    'merchant': merchant,
    'requestedPrice': requestedPrice,
    'priceDroppedTo': currentPrice
  }*/