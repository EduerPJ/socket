<?php require (__DIR__ . '/constantes.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hola mundo!!!</title>
</head>
<body>
  <h1>Hola mundo!!!</h1>
  <input value="<?= SERVIDOR_CLIENTE_RUTA ?>" type="hidden" class="jsServidorRuta">
  <script src="./cliente.js"></script>
</body>
</html>
