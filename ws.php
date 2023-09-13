<?php

use Psr\Http\Message\ServerRequestInterface;
use React\Http\Server;
use Ratchet\WebSocket\WsServer;

require 'vendor/autoload.php';
require (__DIR__ . '/constantes.php');

$loop = \React\EventLoop\Factory::create();

$server = new Server(function (WsServerRequestInterface $request) {
  echo 'Conectado...';
  return new Response(
    200,
    [
      'Content-Type' => 'application/json',
      json_encode(['message' => 'Hola mundo!!!'])
    ]
    );
});

$socket = new Server('127.0.0.1:' . PUERTO, $loop);

echo 'Listening on ' . str_replace('tcp', 'http', $socket->getAddress()) . PHP_EOL;
$loop->run();