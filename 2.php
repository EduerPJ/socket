<?php

require (__DIR__ . '/vendor/autoload.php');
require (__DIR__ . '/constantes.php');

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use React\Socket\ConnectorInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use React\Socket\DnsConnector;
use React\Dns\Resolver\Factory;
use React\Dns\Resolver\ResolverInterface;

class WebSocketServidor implements MessageComponentInterface {
  const MENSAJE_TIPO_CONEXION = 0;
  protected $clientes;
  private $mysqli;

  public function __construct($mysqli) {
    $this->clientes = new SplObjectStorage;
    $this->mysqli = $mysqli;
    echo 'Constructor del WebSocketServidor';
    echo PHP_EOL;
    echo __FILE__, ' ', __FUNCTION__;
    echo PHP_EOL;
  }

  public function onOpen(ConnectionInterface $conexion) {
    echo PHP_EOL;
    echo 'Intentando abrir la conexon...';
    echo PHP_EOL;

    if (empty($conexion->id)) {
      return;
    }

    $this->clientes->attach($conexion);
  }

  function obtenerUsuarioId($sesionId) {
    try {
      return (
        (
          unserialize(
            (
              $this
              ->mysqli
              ->query(
                'SELECT ' .
                'user_data usuarioDatos ' .
                'FROM ' .
                  'ci_sessions ' .
                'WHERE ' .
                'session_id = ' .
                  '"' . $this->mysqli->real_escape_string($sesionId) . '"'
              )
            )->fetch_assoc()
            ['usuarioDatos']
          )
          ['id']
        ) ??
        '0'
      );
    } catch (\Throwable $exepcion) {
      return '0';
    }
  }

  public function onMessage(ConnectionInterface $conexion, $datos) {
    $mensaje = json_decode($datos, true);

    if (
      $mensaje &&
      (($mensaje['tipo'] ?? '') === self::MENSAJE_TIPO_CONEXION)
    ) {
      $usuarioId = 1;
      if (!$usuarioId) {return;}
      $conexion->id = $usuarioId;
      $this->onOpen($conexion);
      echo PHP_EOL;
      echo 'ConectadoId: ' . $usuarioId;
      echo PHP_EOL;
      return;
    }
    $usuariosIds = ($mensaje['usuariosIds'] ?? []);
    if (empty($usuariosIds)) {return;}
    foreach ($this->clientes as $cliente) {
      if (in_array($cliente->id, $usuariosIds)) {
        $cliente->send($datos);
      }
    }
  }

  public function onClose(ConnectionInterface $conexion) {
    $this->clientes->detach($conexion);
  }

  public function onError(
    ConnectionInterface $conexion,
    \Exception $excepcion
  ) {
    error_log($excepcion->getMessage());
    $conexion->close();
  }
}

$mysqli = '';

// Creación del conector DNS
$dnsConnector = new DnsConnector(new ConnectorInterface(), 'socket.test');
// Creación del servidor web
$httpServer = new HttpServer(new WsServer(new WebSocketServidor($mysqli)));

// Creación del servidor socket
$servidor = IoServer::factory($httpServer, $dnsConnector);

// Inicio del servidor
$servidor->run();