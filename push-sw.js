// Wanees push service worker: shows the notification and focuses the app.
// Registered separately from Flutter's own service worker.

self.addEventListener('push', (event) => {
  let data = { title: 'ونيس', body: 'رسالة جديدة' };
  try {
    if (event.data) data = event.data.json();
  } catch (_) {
    if (event.data) data.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'ونيس', {
      body: data.body || '',
      icon: 'icons/Icon-192.png',
      badge: 'icons/Icon-192.png',
      dir: 'rtl',
      lang: 'ar',
      tag: data.chatId || 'najwa',
      renotify: true,
      data: { chatId: data.chatId || null },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const scope = self.registration.scope;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.startsWith(scope) && 'focus' in client) return client.focus();
      }
      return clients.openWindow(scope);
    }),
  );
});
