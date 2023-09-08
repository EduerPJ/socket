<?php

require 'web_socket_cliente_helper.php';
$WebSocketCliente = new WebSocketCliente();
echo PHP_EOL;
echo 'Enviando mensaje desde el servidor...';
echo PHP_EOL;
(
  $WebSocketCliente
  ->enviarJson(
    [
      'tipo' => (
        WebSocketCliente
        ::MENSAJES_TIPOS_IDS_POR_NOMBRE
        ['ANALITICA_ESTUDIANTE_PROGRESO_NOTIFICACION_POR_CORREO']
      ),
      'usuariosIds' => [1],
      'mensaje' => 'Hola mundo!!!',
    ]
  )
);
echo PHP_EOL;
echo 'Se envio el mensaje...';
echo PHP_EOL;