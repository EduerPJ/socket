<?php

require (__DIR__ . '/vendor/autoload.php');
require (__DIR__ . '/constantes.php');

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use React\Socket\ConnectorInterface;
use React\Socket\Connector;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use React\Socket\DnsConnector;
use React\Dns\Resolver\Factory;
use React\Dns\Resolver\ResolverInterface;

/* $connector->connect('socket.test:'. PUERTO)->then(
  function (ConnectionInterface $connection) {
    echo PHP_EOL;
    echo 'connection successfully established';
    echo PHP_EOL;
  },
  function (Exception $error) {
    echo PHP_EOL;
    echo 'failed to connect due to $error';
    echo PHP_EOL;
  }
); */

try {
  $loop = React\EventLoop\Factory::create();
  $connector = new Connector(['tcp' => false, 'tls' => true, 'unix' => false, 'dns' => false], $loop);

  $uri = 'tls://socket.test:' . PUERTO;
  $connector->connect($uri)->then(function (ConnectionInterface $connection) {
    echo PHP_EOL;
    echo 'connection successfully established';
    echo PHP_EOL;
    $connection->write('Conectando...');
    // $connection->end('Finalizada...');
  });

  echo (
    'Servidor WebSocket iniciado en el puerto ' .
    PUERTO .
    '!'
  );
  $loop->run();

} catch (\Throwable $th) {
  throw $th;
  var_dump($th); echo '👆👆👆 '; echo '💩💩💩 '; echo '👀'; exit;
}

/* $connector->connect('socket.test:8081')->then(function (ConnectionInterface $connection) {
  $connection->write('Conectado...');
  $connection->end();
}); */