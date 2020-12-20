import FloatingContainer from "../src/js/floating-container.min.js";

document.addEventListener('DOMContentLoaded', function () {
  const fc = new FloatingContainer({
    container: '#fc-container',
    wrapper: '#fc-wrapper',
    selector: '#fc-selector',
    direction: 'bottom-right',
    escapeHeight: 50,
    showControllers: true,
    observerOptions: { threshold: 0 },
    onCloseFC: () => { console.log('closed') },
    onPutBackFC: () => { console.log('put back') },
    startPreviewFC: () => {},
    endPreviewFC: () => {},
    notSupportedCallback: () => { document.querySelector('#warning').style.display = 'block'; },
  });
});