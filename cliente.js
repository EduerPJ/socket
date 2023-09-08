
(function() {
  const webSocketCliente = new WebSocket('wss://eduerpj.dev:443');

  (
    webSocketCliente
    .addEventListener(
      'open',
      function() {
        console.log('Enviando desde el cliente...');
        (
          webSocketCliente
          .send(
            (
              JSON
              .stringify(
                {
                  tipo: window.z.webSocket.mensajeTipos.CONEXION,
                  sesionId: window.z.sesionId,
                },
              )
            ),
          )
        );
      },
    )
  );

  (
    webSocketCliente
    .addEventListener(
      'message',
      function(evento) {
        const datos = JSON.parse(evento.data);

        if (datos.tipo === 1) {
          console.log({datos});
        }
      },
    )
  );
})();
