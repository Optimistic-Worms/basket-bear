const db = require('../../db/db-config');

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



exports.notificationWorker = (req, res) =>{

  getSubData().then(result =>{
  	res.sendStatus(200);
  }).catch(err =>{
  	res.sendStatus(500).send(err);
  })
}