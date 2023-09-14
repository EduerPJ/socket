(() => {
  if (!('serviceWorker' in navigator)) {
    mostrarVentanaEmergente('', 'Este navegador no soporta serviceWorker');
    return;
  }

  (
    window
    .addEventListener(
      'load',
      () => {
        (
          navigator
          .serviceWorker
          .register('trabajadores_de_servicios.js')
          .then((registros) => {console.log({registros});})
          .catch((error) => {mostrarVentanaEmergente('', error);})
        );
      },
    )
  );
})();
