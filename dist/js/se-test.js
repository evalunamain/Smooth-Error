'use strict';

;(function ($, window, document) {
  "use strict";

  var seTest = {
    init: function init() {
      $('input').smoothError();
      this.initEvents();
    },

    initEvents: function initEvents() {
      $('.se-test-form-1').on('submit', function (e) {
        e.preventDefault();
        $(e.currentTarget).find('.se-input').trigger('se-error', 'test');
      });

      $('.se-test-form-2').on('submit', function (e) {
        e.preventDefault();

        var error = {
          error: 'This error has a <a href="#" class="se-test-link">link</a>.',
          htmlSafe: true
        };
        $(e.currentTarget).find('.se-input').trigger('se-error', error);
      });
    }
  };
  new seTest();
})(jQuery, window, document);