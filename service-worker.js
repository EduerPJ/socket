importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

const routing = workbox.routing;
const strategies = workbox.strategies;

// Código para mostrar un mensaje de instalación
self.addEventListener('beforeinstallprompt', (event) => {
	// Previene que el evento muestre automáticamente el mensaje de instalación
	event.preventDefault();

	// Guarda el evento para mostrar el mensaje cuando sea necesario
	const deferredPrompt = event;

	// Puedes personalizar el mensaje y el comportamiento aquí
	const installPrompt = {
		title: 'Instalar la PWA',
		message: 'Añade esta aplicación a tu pantalla de inicio para acceder más rápido.',
		button: 'Instalar',
	};

	// Muestra el mensaje de instalación cuando sea apropiado
	self.clients.matchAll().then((clients) => {
		if (clients.length === 0 || !clients[0].visibilityState || clients[0].visibilityState === 'hidden') {
			// No se muestra el mensaje si la página no está visible
			return;
		}

		// Muestra el mensaje de instalación y espera a la respuesta del usuario
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('El usuario aceptó la instalación de la PWA');
			} else {
				console.log('El usuario rechazó la instalación de la PWA');
			}

			// Borra la referencia al evento
			deferredPrompt = null;
		});
	});
});

workbox.routing.registerRoute(
	/.(?:css|js|jsx|json)$/,
	new workbox.strategies.StaleWhileRevalidate({
		"cacheName": "assets",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000
			})
		]
	})
);

workbox.routing.registerRoute(
	/.(?:png|jpg|jpeg|gif|woff2)$/,
	new workbox.strategies.CacheFirst({
		"cacheName": "images",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000
			})
		]
	})
);

workbox.routing.registerRoute(
	/(\/)$/,
	new workbox.strategies.StaleWhileRevalidate({
		"cacheName": "startPage",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000
			})
		]
	})
);
