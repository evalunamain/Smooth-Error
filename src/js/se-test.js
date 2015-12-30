;(function($, window, document) {
  "use strict";

  var seTest = {
    init: function () {
      $('input').smoothError();
      this.initEvents();
    },

    initEvents: () => {
      $('.se-test-form-1').on('submit', e => {
        e.preventDefault();
        $(e.currentTarget).find('.se-input').trigger('se-error', 'test');
      });

      $('.se-test-form-2').on('submit', e => {
        e.preventDefault();

        let error = {
          error: 'This error has a <a href="#" class="se-test-link">link</a>.', 
          htmlSafe: true
        };
        $(e.currentTarget).find('.se-input').trigger('se-error', error);
      });
    }
  };
  new seTest();
}(jQuery, window, document));