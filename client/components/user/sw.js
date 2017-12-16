/* eslint-env browser, serviceworker, es6 */
import './assets/budgetBasket.png';

'use strict';
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Budge Basket says';
  const options = {
    body: event.data.text(),
    icon: './assets/budgetBasket.png',
    badge: './assets/budgetBasket.png'
  };

 const notificationPromise = self.registration.showNotification(title, options);
 event.waitUntil(notificationPromise);
});

// Notification click handler. 
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();
  event.waitUntil(clients.openWindow('http://localhost:3000/'));
});

