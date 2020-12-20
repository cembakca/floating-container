# Floating Container  
  
A simple floating for your any container. This library doesn't have any dependencies and can be used with any webpage.

### CDN Links:

[https://cdn.jsdelivr.net/npm/floating-container@latest/src/js/floating-container.min.js](https://cdn.jsdelivr.net/npm/floating-container@latest/src/js/floating-container.min.js)  
[https://cdn.jsdelivr.net/npm/floating-container@latest/src/css/floating-container.min.css](https://cdn.jsdelivr.net/npm/floating-container@latest/src/css/floating-container.min.css)  
  
### NPM

``` bash
npm i floating-container
```

[https://www.npmjs.com/package/floating-container](https://www.npmjs.com/package/floating-container)

### Usage

  ```html
    import FloatingContainer from "../src/js/floating-container.min.js";

    const fc = new FloatingContainer({
      container: '#fc-container',
      wrapper: '#fc-wrapper',
      selector: '#fc-selector',
      direction: 'bottom-right',
      escapeHeight: 50,
      showControllers: true,
      observerOptions: { threshold: 0 },
      onCloseFC: () => { },
      onPutBackFC: () => { },
      startPreviewFC: () => {},
      endPreviewFC: () => {},
      notSupportedCallback: () => { },
    });
  ```

### Parameters

| Name | Type	 | Default	 | Description	 |
| --- | --- | --- | --- |
| container | string | "#fc-container" | Container field selector |
| wrapper | string | "#fc-wrapper" | Wrapper field selector |
| selector | string | "#fc-selector" | Selector field selector |
| direction | string | "bottom-right" | Floating position enum |
| escapeHeight | number | 50 | The escape field to be created for scroll when canceling floating operation (px) |
| showControllers | boolean | true | Control field will be added |
| observerOptions | object | { threshold: 0 } | Intersection Observer options |
| onCloseFC | function | () => {} | Runs when 'close' is triggered |
| onPutBackFC | function | () => {} | Runs when 'put back' is triggered |
| startPreviewFC | function | () => {} | Runs when 'float container' is triggered |
| endPreviewFC | function | () => {} | Runs when 'float container' is prevented |
| notSupportedCallback | function | () => {} | If this code doesn't support it will be triggered |
