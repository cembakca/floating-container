  
﻿/*
 * Floating Container
 * Copyright 2020
 * Author: Cem Bakca
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Project: https://github.com/cembakca/floating-container
 */

const controlsHtml = `
  <div class="fc-controls">
    <span class="fc-putback">&#10094;</span>
    <span class="fc-close">&#10005;</span>
  </div>
`;

class FloatingContainer {
  constructor(options = {}) {
    const defaultOptions = {
      container: '#fc-container',
      wrapper: '#fc-wrapper',
      selector: '#fc-selector',
      direction: 'bottom-right', /* bottom-right, bottom-left, top-right, top-right */
      escapeHeight: 50,
      showControllers: true,
      observerOptions: { threshold: 0 },
      onCloseFC: () => {},
      onPutBackFC: () => {},
      startPreviewFC: () => {},
      endPreviewFC: () => {},
      notSupportedCallback: () => {},
    };

    this.observableElementTag = 'VIDEO'; /* VIDEO, IMG, GENERIC */
    this.observer = null;
    this.options = Object.assign(defaultOptions, options);

    this.initialize();
  }

  initialize() {
    if (typeof window == 'undefined' || !window.IntersectionObserver) {
      this.options.notSupportedCallback();
      console.warn('IntersectionObserver is not supported by your browser, so you can\'t see the effect.')
      return;
    }

    this.containerElement = document.querySelector(this.options.container);
    this.wrapperElement = document.querySelector(this.options.wrapper);
    this.selectorElement = document.querySelector(this.options.selector);
    if (!this.containerElement || !this.wrapperElement || !this.selectorElement) {
      console.warn('NODE definitions required for operation not found.');
      return
    }

    const hasAnyApperFC = document.querySelector('.fc-appear');
    if (hasAnyApperFC) {
      console.warn('This process is already implemented for a container.');
      return;
    }

    if (this.options.showControllers) {
      this.wrapperElement.innerHTML += controlsHtml;
      const closeButton = this.containerElement.querySelector('.fc-close');
      const putBackButton = this.containerElement.querySelector('.fc-putback');
      closeButton.addEventListener('click', this.handleCloseFC.bind(this));
      putBackButton.addEventListener('click', this.handlePutBackFC.bind(this)); 
    }

    this.wrapperElement.classList.add(this.options.direction);
    this.observer = this.observer || this.createObserver();

    if (this.selectorElement.tagName == 'VIDEO') {
      this.selectorElement.onloadeddata = () => {
        this.containerElement = document.querySelector(this.options.container); // override current container node
        this.observableElementTag = 'VIDEO';
        this.observer.observe(this.containerElement);
      };
    } else if (this.selectorElement.tagName == 'IMG') {
      this.selectorElement.onload = () => {
        this.containerElement = document.querySelector(this.options.container); // override current container node
        this.observableElementTag = 'IMG';
        this.observer.observe(this.containerElement);
      };
    } else {
      this.observableElementTag = 'GENERIC';
      this.observer.observe(this.containerElement);
    }
  }

  handleCloseFC(e) {
    e.preventDefault();
    this.containerElement.classList.remove('fc-appear');
    window.scrollTo({
      top: this.containerElement.offsetTop - this.options.escapeHeight,
      behavior: 'smooth'
    });

    this.options.onCloseFC(e, this.containerElement);
  }

  handlePutBackFC(e) {
    e.preventDefault();
    this.containerElement.classList.remove('fc-appear');
    window.scrollTo({
      top: this.containerElement.offsetTop - this.options.escapeHeight,
      behavior: 'smooth'
    });

    this.options.onPutBackFC(e, this.containerElement);
  }

  createObserver() {
    const _this = this;
    return new IntersectionObserver(function(entries, observer) { 
      entries.forEach(entry => {
        if(!entry.isIntersecting){
          entry.target.style.height = `${entry.target.offsetHeight}px`;
          entry.target.classList.add('fc-appear');
          _this.options.startPreviewFC(entry, entries);
        } else {
          entry.target.classList.remove('fc-appear');
          entry.target.style.height = 'auto';
          _this.options.endPreviewFC(entry, entries);
        }  
      });
    }, {..._this.options.observerOptions});
  }
}

export default FloatingContainer;
