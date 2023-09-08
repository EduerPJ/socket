<?php

echo 'Hola mundo!';
echo PHP_EOL;
require 'web_socket_cliente_helper.php';
$WebSocketCliente = new WebSocketCliente();
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
