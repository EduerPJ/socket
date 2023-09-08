<?php
require (__DIR__ . '/vendor/autoload.php');

class WebSocketCliente {

  private $webSocketClienteConexion;

  const SERVIDOR_RUTA = 'wss://eduerpj.dev:8080';
  const MENSAJES_TIPOS_IDS_POR_NOMBRE = [
    'ANALITICA_ESTUDIANTE_PROGRESO_NOTIFICACION_POR_CORREO' => 1,
  ];

  public function __construct() {
    (
      $this
      ->webSocketClienteConexion = new \WebSocket\Client(self::SERVIDOR_RUTA)
    );
  }

  public function enviarJson($datos) {
    $this->webSocketClienteConexion->send(json_encode($datos));
  }

}
