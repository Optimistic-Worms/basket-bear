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

const sendAnEmail = (emails, info) => {
	return new Promise ((resolve,reject) => {
	 let data = {
    'name': '',
    'email': emails.join(';'),
    'message':JSON.stringify(info),
    'subject': `Price update!`,
   };
   let options = {
     'method' : 'post',
     'contentType': 'application/json',
     'payload' : data,
     'auth': emailAuth
   };
/*   let secondScriptID = 'AKfycbxjbt4Lk4MO3rVu9vG2k3kMT4ih0RwvMr6-In25nHmN32GtGuU'
   axios.post("https://script.google.com/macros/s/" + secondScriptID + "/exec", options).then((response)=>{
    resolve(response);
   }).catch(error =>{
    reject(error);
   }).catch(error =>{
    reject(error);
   });*/
   resolve('done')
	})

}

let usersList = {};

const updateUsersListWithEmails = (username, subs) => {
	for (var i in subs){ 
		if(Array.isArray(subs[i]) && subs[i].length){
			let emailArr = subs[i]; 
			emailArr.forEach(item => {
				if (item.status){
				usersList[username].emails.add(item.email)
				}
			});
		}
	}  
}

const createSubscribersList = (subs) => {
	let subscribers = [];
	for (var i in subs){ 
		if(subs[i].keys && subs[i].keys.auth ){
			subscribers.push(subs[i])
		}
	} 
	return subscribers
}


const sendNotificationToUser = (username, info) =>{
  
	return new Promise((resolve,reject)=>{
		getSubscriptionsFromDB(username).then(subs => {
			updateUsersListWithEmails(username, subs);
      const subscribers = createSubscribersList(subs)
			if(subscribers.length){
				sendPush(subscribers, info)
			} 
			resolve('done')
		}).catch(error => {
			console.log('Push Completely failed', error)
			reject(error)
		})
	})

  
}

const iterateAwaitNotifications = (data) => {

    return new Promise((resolve,reject) => {
    		  // send push notifications to user and get their emails
   let request = []
   data.forEach(prod =>{
   	if(prod.data) {
   	let user = prod.data.user;
   	usersList[user]? usersList[user].data.push(prod.data): usersList[user] = {"data":[prod.data]}
   	if(usersList[user]) usersList[user]["emails"] = new Set();
   	request.push(sendNotificationToUser(prod.data.user, prod.data).then(res => res))
    }
   });
   // now send the emails. 
   Promise.all(request).then((result) => {

   	  let requestsToEmailer = []
			for(var i in usersList){
				let mailingList = [...usersList[i].emails];
				let data = usersList[i].data
				if(mailingList.length){				
        requestsToEmailer.push(sendAnEmail(mailingList, data).then(res => res))				
			}  				          
		}
		Promise.all(requestsToEmailer).then(result => {
			resolve(result); 
		})
		
    });
    })
   }


const emptyNotificationList = (list) =>{
	list.forEach(item => {
		db.collection('awaitNotification').doc(item).delete().then(result=>{
		console.log(result)
		}).catch(err=>{
		console.log(err)
		})
	})
}


exports.notificationWorker = (req, res) =>{
  usersList = new Object();
  getSubData().then(result =>{
  	let list = [];
  	for(var i in result){
      list.push(result[i].docId)
  	}
  	iterateAwaitNotifications(result).then((result) =>{
  		//TO DO: DELETE NOTIFICATION LIST.
  		console.log(list)
      emptyNotificationList(list)
       res.sendStatus(200); 
  	}).catch(err=>{
  		res.sendStatus(500).send(err); 
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