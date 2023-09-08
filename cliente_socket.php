<?php
require (__DIR__ . '/vendor/autoload.php');
require (__DIR__ . '/constantes.php');

class WebSocketCliente {

  private $webSocketClienteConexion;

  const MENSAJES_TIPOS_IDS_POR_NOMBRE = [
    'ANALITICA_ESTUDIANTE_PROGRESO_NOTIFICACION_POR_CORREO' => 1,
  ];

  public function __construct() {
    (
      $this
      ->webSocketClienteConexion = new \WebSocket\Client(SERVIDOR_CLIENTE_RUTA)
    );
    echo PHP_EOL;
    echo 'Constructor del WebSocketCliente';
    echo PHP_URL_HOST;
    echo PHP_EOL;
    echo __FILE__, ' ', __FUNCTION__;
    echo PHP_EOL;
  }

  public function enviarJson($datos) {
    $this->webSocketClienteConexion->send(json_encode($datos));
  }

}
