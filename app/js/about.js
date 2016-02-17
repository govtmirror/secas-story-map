(function () {
  'use strict';

  var dom = require('./util').dom;
  var template = require('../templates/about.jade');
  var emitter = require('./mediator');

  var options = {},
      active = false;

  function init() {
    createModal();
    registerHandlers();
    render();
  }

  function createModal() {
    options.button = dom.create('button', 'about-button', document.body);
    options.modal = dom.create('aside', 'about-modal', document.body);
    options.modalContent = dom.create('section', 'about-content', options.modal);
    options.close = dom.create('button', 'about-close', options.modal);

    options.button.innerHTML = 'About';
    options.close.innerHTML = 'Close';
  }

  function registerHandlers() {
    options.button.addEventListener('click', toggle);
    options.close.addEventListener('click', toggle);
    document.body.addEventListener('keyup', aboutKeyup);
  }

  function aboutKeyup(e) {
    if (e.keyCode === 27 && active) hide();
  }

  function render() {
    options.modalContent.innerHTML = template();
  }

  function show() {
    active = true;
    dom.addClass(options.modal, 'active');
    emitter.emit('infowindow:close');
  }

  function hide() {
    active = false;
    dom.removeClass(options.modal, 'active');
  }

  function toggle() {
    active ? hide() : show(); //jshint ignore:line
  }

  module.exports.init = init;
})();