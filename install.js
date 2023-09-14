// Código para mostrar un mensaje de instalación
  window.addEventListener('load', async (event) => {
    // Gather the data from your custom install UI event listener
    // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
    deferredPrompt.prompt();
    // Find out whether the user confirmed the installation or not
    const { outcome } = await deferredPrompt.userChoice;
    // The deferredPrompt can only be used once.
    deferredPrompt = null;
    // Act on the user's choice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('User dismissed the install prompt');
    }
    return;
    console.log('Preparando msn...');
    // Previene que el evento muestre automáticamente el mensaje de instalación
    event.preventDefault();

    // Guarda el evento para mostrar el mensaje cuando sea necesario
    const deferredPrompt = event;

    // Puedes personalizar el mensaje y el comportamiento aquí
    const installPrompt = {
      title: 'Instalar la PWA',
      message: 'Añade esta aplicación a tu pantalla de inicio para acceder más rápido.',
      button: 'Instalar',
    };

    // Muestra el mensaje de instalación cuando sea apropiado
    // Muestra el mensaje de instalación y espera a la respuesta del usuario
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario aceptó la instalación de la PWA');
      } else {
        console.log('El usuario rechazó la instalación de la PWA');
      }

      // Borra la referencia al evento
      deferredPrompt = null;
    });
    return;

    window.clients.matchAll().then((clients) => {
      if (clients.length === 0 || !clients[0].visibilityState || clients[0].visibilityState === 'hidden') {
        // No se muestra el mensaje si la página no está visible
        return;
      }

      
    });
  });
