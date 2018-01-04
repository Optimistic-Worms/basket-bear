const db = require('../../db/db-config');
const getSubscriptionsFromDB = require('./userSettings.js').getSubscriptionsFromDB;

let webPush;
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
 require('dotenv').config();
 webPush = require('web-push');
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

const sendNotificationToUser = (username) =>{
// get subscription from firebase.
  //let username = req.get('user');

  getSubscriptionsFromDB(username).then(subs => {
    let subscribers = []
    for (var i in subs){
    subscribers.push(subs[i])
  }
  subscribers.shift();
  if(subscribers.length === 0 ){
    console.log('user has no subscriptions')
  }
  let message =  `Willy Wonka's chocolate is the best!`;
  let clickTarget =  `http://www.favoritemedium.com`;
  let title = `Push notification received!`;
  subscribers.forEach(pushSubscription => {

  //Can be anything you want. No specific structure necessary.
    let payload = JSON.stringify({message : message, clickTarget: clickTarget, title: title});
   webPush.sendNotification(pushSubscription, payload).then(response => {
     console.log(response)
    }).catch(error => {
    console.log(error)
      console.log(error)

    });
  });

  }).catch(error => {
      console.log('Push Completely failed', error)
    //  res.sendStatus(500)
  })

}















const sendPushNotifications =(data) => {




   data.forEach(info =>{
   	if(info.data) {
      sendNotificationToUser(info.data.user)
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