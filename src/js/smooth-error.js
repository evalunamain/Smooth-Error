;(function($, window, document) {
  "use strict";

  function SmoothError (el, options) {
    this.$el = $(el);
    this.$eventEl = this.$el.parent(); //we attach event listeners to this el
    this.options = $.extend({}, this.defaults, options);
    this.init();
  }

  $.extend(SmoothError.prototype, {
    defaults: {
      html: false, //expect custom error msgs to be passed as plain text
      inputClass: 'se-input', //css class used to style input field
      wrapperClass: 'se-error-wrapper', //css class used to style error wrapper
      errorDivClass: 'se-error-tooltip' //css class used to style the error message
    },

    init: function () {
      this.initErrorElement();
      this.initEvents();
    },

    initErrorElement: function () {
      this.$el.addClass(this.options.inputClass);
      let inputWrapper = $(`<div class="${ this.options.wrapperClass }">`);
      this.$el.wrap(inputWrapper);

      let stateWrapper = $('<span>');
      stateWrapper.prepend($('<span class="se-field-invalid">'))
        .prepend($(`<span class="${ this.options.errorDivClass }">`));

      this.$el.parent().prepend(stateWrapper);
    },

    initEvents: function () {
      this.$eventEl.on('focus', '.has-error', (e) => {
        this.showErrorMessage(e);
      });

      this.$eventEl.on('keydown', '.has-error', (e) => {
        this.hideErrorMessage(e);
      });

      this.$el.on('se-error', (e, ...args) => {
        if (typeof args[0] === 'string') {
          this.addError(args[0]);
        } else if (typeof args[0] === 'object') {
          let error = args[0].error,
            htmlSafe = args[0].htmlSafe;
          this.addError(error, htmlSafe);
        }
      });
    },

    hideErrorMessage: function (e) {
      $(e.currentTarget).removeClass('has-error show-error');
    },

    showErrorMessage: function (e) {
      $(e.currentTarget).addClass('show-error');
    },

    addError: function (error, htmlSafe) {
      let errorField = this.$el.prev().find(`.${ this.options.errorDivClass }`);

      if (this.options.html || htmlSafe) {
        errorField.html(error);
      } else {
        errorField.text(error);
      }

      this.$el.closest(`.${ this.options.wrapperClass }`).addClass('has-error');
    }
  });

  $.fn.smoothError = function (options) {
    let attr = 'smooth-error';

    this.each(function () {
      let instance = $.data(this, attr);
      if (!instance) {
        instance = new SmoothError(this, options);
        $.data(this, attr, instance);
      }
    });
  };

}(jQuery, window, document));