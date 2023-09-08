
(function() {
  console.clear();
  console.log('Iniciando servidor en el cliente js');
  const webSocketCliente = new WebSocket(document.querySelector('.jsServidorRuta').value);

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
                  tipo: 0,
                  sesionId: 1,
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
        console.log({datos});

        if (datos.tipo === 1) {
          console.log({datos});
        }
      },
    )
  );
})();
