// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCzMNKimcw1kaaJlMdTKj7RAdlsHyaImBk",
    authDomain: "vera-pizza-app.firebaseapp.com",
    projectId: "vera-pizza-app",
    storageBucket: "vera-pizza-app.firebasestorage.app",
    messagingSenderId: "783988757356",
    appId: "1:783988757356:web:c66d3f2571aff0f125d949",
    measurementId: "G-FNLSPHKXFW"
};

// Inicializa Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);

// Obtén el servicio de mensajería
const messaging = firebase.messaging();

// Gestiona la recepción de notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
    console.log('Notificación recibida en segundo plano:', payload);

    // Configura la notificación que se mostrará en el dispositivo
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    // Muestra la notificación
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache-name').then((cache) => {
            console.log('Abriendo el caché...');

            return cache.addAll([
                '/App/index.html',
                '/App/styles.css',
                '/App/script.js',
                '/App/img/logo_vera_pizza.png',
            ]).then(() => {
                console.log('Archivos añadidos al caché con éxito');
            }).catch((error) => {
                console.error('Error al almacenar en caché:', error);
            });
        })
    );
});


// Manejo de solicitudes de red (opcional si necesitas manejar el cacheo de archivos)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).catch((error) => {
                console.error('Error en la recuperación del recurso:', error);
                return new Response('Recurso no disponible', { status: 404 });
            });
        })
    );
});

