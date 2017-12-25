/* eslint-env browser, serviceworker, es6 */
import './budgetBasket.png'
let url = '';

'use strict';
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  const data = JSON.parse(event.data.text())
  const title = data.title;
  url = data.clickTarget

  const options = {
    body: data.message,
    icon: './budgetBasket.png',
    badge: './budgetBasket.png'
  };

 const notificationPromise = self.registration.showNotification(title, options);
 event.waitUntil(notificationPromise);
});

// Notification click handler. 
self.addEventListener('notificationclick', function(event) {
  console.log(event)
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();
  event.waitUntil(clients.openWindow(`${url}`));
});

