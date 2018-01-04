const addSubscriptionToDb = require('./userSettings.js').addSubscriptionToDb;
const removeSubscriptionFromDb = require('./userSettings.js').removeSubscriptionFromDb;
const getSubscriptionsFromDB = require('./userSettings.js').getSubscriptionsFromDB;

exports.subscribe = (req,res) => {

  let data = req.body.subscription;
  let pushSubscription = {};
  let name = data.endpoint.replace('https://fcm.googleapis.com/fcm/send/','')
    pushSubscription[name] = {
      endpoint: data.endpoint,
      keys: {
      p256dh: data.keys.p256dh, // Public Key
      auth: data.keys.auth
    }
  };
  addSubscriptionToDb(req.username, pushSubscription).then(response => {
    res.send('Subscription accepted!');
  }).catch(error => {
    res.status(500).send(error)
  });

}

exports.unsubscribe = (req, res) => {

	let data = req.body.subscription;
	let username = req.username;
	let pushSubscription = {};
	let name = data.endpoint.replace('https://fcm.googleapis.com/fcm/send/','')
		pushSubscription[name] = {
		endpoint: data.endpoint,
		keys: {
		p256dh: data.keys.p256dh, // Public Key
		auth: data.keys.auth
	}
	};
	removeSubscriptionFromDb(username, pushSubscription);
	 res.send('Subscription removed!');
}
