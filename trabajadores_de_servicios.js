importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);

(
	self
	.addEventListener(
		'message',
		(evento) => {
			if (evento.data && evento.data.type === 'SKIP_WAITING') {
				self.skipWaiting();
			}
		},
	)
);

const CHAT_ZETA_CACHE = 'chatZetaCache';
const paginaDeReservaSinConexion = 'pagina_de_reserva_sin_conexion.html';
(
	self
	.addEventListener(
		'install',
		async (evento) => {
			(
				evento
				.waitUntil(
					caches
					.open(CHAT_ZETA_CACHE)
					.then((cache) => cache.add(paginaDeReservaSinConexion))
				)
			);
		},
	)
);

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

(
	self
	.addEventListener(
		'fetch',
		(evento) => {
			if (evento.request.mode !== 'navigate') {
				return;
			}
			(
				evento
				.respondWith(
					(async () => {
						try {
							const eventoRespuestaPrecargada = await evento.preloadResponse;
							if (eventoRespuestaPrecargada) {
								return eventoRespuestaPrecargada;
							}
							const eventoRespuesta = await fetch(evento.request);
							return eventoRespuesta;
						} catch (error) {
							const chatZetaCache = await caches.open(CHAT_ZETA_CACHE);
							const chatZetaCacheRespuesta = (
								await chatZetaCache.match(paginaDeReservaSinConexion)
							);
							return chatZetaCacheRespuesta;
						}
					})(),
				)
			);
		},
	)
);
