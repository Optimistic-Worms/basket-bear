const db = require('../../db/db-config');
const getSubscriptionsFromDB = require('./userSettings.js').getSubscriptionsFromDB;
const webPush = require('web-push');


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
    let subscribers = []
    for (var i in subs){
    if(subs[i].keys.auth) subscribers.push(subs[i])
  }
  if(subscribers.length === 0 ){
    console.log('user has no subscriptions')
    return;
  }
  let message = `${info.product} \nDropped to $${info.priceDroppedTo} You were asking $${info.requestedPrice}` || `Budget-basket updated`;
  let clickTarget =  `http://www.favoritemedium.com`;
  let title = `Price update!`;
  let payload = JSON.stringify({message : message, clickTarget: clickTarget, title: title});
  subscribers.forEach(pushSubscription => {
  
	webPush.sendNotification(pushSubscription, payload).then(response => {
    console.log(response)
    }).catch(error => { console.log(error) });
  });
    
  }).catch(error => {
      console.log('Push Completely failed', error)
  })

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