
// /* eslint-env browser, es6 */

// 'use strict';
// // Need to find away to get an application Server Public key. 
// const applicationServerPublicKey = 'BLsbtk_kNrAfek4KTxD7ZhNe6HxXkRAf-DHuTxHoT7by4QSSpbACzFr6VmmaWTGyk2ZHG5W710XSdr_ArN0eSxU';

// const pushButton = document.querySelector('.js-push-btn');

// let isSubscribed = false;
// let swRegistration = null;

/*function urlB64ToUint8Array(base64String) {
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
}*/

// //Check to see if the service worker is going to be accepted. 


// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   console.log('Service Worker and Push is supported');

//   navigator.serviceWorker.register('sw.js')
//   .then(function(swReg) {
//     console.log('Service Worker is registered', swReg);

//     swRegistration = swReg;
//   })
//   .catch(function(error) {
//     console.error('Service Worker Error', error);
//   });
// } else {
//   console.warn('Push messaging is not supported');
//   pushButton.textContent = 'Push Not Supported';
// }






// // Get things rolling. 
// navigator.serviceWorker.register('sw.js')
// .then(function(swReg) {
//   console.log('Service Worker is registered', swReg);
//   swRegistration = swReg;
//   initializeUI();
// })


// // Get started and check if the user is subscribed yet. 
// function initializeUI() {
//   pushButton.addEventListener('click', function() {
//     pushButton.disabled = true;
//     if (isSubscribed) {
//       unsubscribeUser();
//     } else {
//       subscribeUser();
//     }
//   });

//   // Set the initial subscription value
//   swRegistration.pushManager.getSubscription()
//   .then(function(subscription) {
//     isSubscribed = !(subscription === null);

//     updateSubscriptionOnServer(subscription);

//     if (isSubscribed) {
//       console.log('User IS subscribed.');
//     } else {
//       console.log('User is NOT subscribed.');
//     }

//     updateBtn();
//   });
// }

// // Allow non subscribed user to subscribe

// function updateBtn() {
//   if (Notification.permission === 'denied') {
//     pushButton.textContent = 'Push Messaging Blocked.';
//     pushButton.disabled = true;
//     updateSubscriptionOnServer(null);
//     return;
//   }

//   if (isSubscribed) {
//     pushButton.textContent = 'Disable Push Messaging';
//   } else {
//     pushButton.textContent = 'Enable Push Messaging';
//   }

//   pushButton.disabled = false;
// }

// // Sign up the user for subscribing
// function subscribeUser() {
//   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//   swRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey
//   })
//   .then(function(subscription) {
//     console.log('User is subscribed.');

//     updateSubscriptionOnServer(subscription);

//     isSubscribed = true;

//     updateBtn();
//   })
//   .catch(function(err) {
//     console.log('Failed to subscribe the user: ', err);
//     updateBtn();
//   });
// }

// // Not sure what this does. 

// const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//   swRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey
// })


//   swRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey
//   })
//   .then(function(subscription) {
//     console.log('User is subscribed.');

//     updateSubscriptionOnServer(subscription);

//     isSubscribed = true;

//     updateBtn();

//   })
//   .catch(function(err) {
//     console.log('Failed to subscribe the user: ', err);
//     updateBtn();
//   });


// // Send subscription code to Firebase. 

// function updateSubscriptionOnServer(subscription) {
//   // TODO: Send subscription to application server

//   const subscriptionJson = document.querySelector('.js-subscription-json');
//   const subscriptionDetails =
//     document.querySelector('.js-subscription-details');

//   if (subscription) {
//     subscriptionJson.textContent = JSON.stringify(subscription);
//     subscriptionDetails.classList.remove('is-invisible');
//   } else {
//     subscriptionDetails.classList.add('is-invisible');
//   }
// }

// // allow user to unsubscribe. 

// function unsubscribeUser() {
//   swRegistration.pushManager.getSubscription()
//   .then(function(subscription) {
//     if (subscription) {
//       return subscription.unsubscribe();
//     }
//   })
//   .catch(function(error) {
//     console.log('Error unsubscribing', error);
//   })
//   .then(function() {
//     updateSubscriptionOnServer(null);

//     console.log('User is unsubscribed.');
//     isSubscribed = false;

//     updateBtn();
//   });
// }



