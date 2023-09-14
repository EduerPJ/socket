<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="manifest" href="manifest.json">
  <title>Document</title>
</head>
<body>
  <h1>PWA</h1>
  <script src="./install.js"></script>
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener("load", () => {
            navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registered');
                install();
              }).catch(function(err) {
                console.log('ServiceWorker error: ', err);
              });
        })
    }
</script>
</body>
</html>
