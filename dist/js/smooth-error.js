'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

;(function ($, window, document) {
  "use strict";

  function SmoothError(el, options) {
    this.$el = $(el);
    this.$eventEl = this.$el.parent(); //we attach event listeners to this el
    this.options = $.extend({}, this.defaults, options);
    this.init();
  }

  $.extend(SmoothError.prototype, {
    defaults: {
      html: false, //expect custom error msgs to be passed as plain text
      inputClass: 'se-input' //css class used to style input field
    },

    init: function init() {
      this.initErrorElement();
      this.initEvents();
    },

    initErrorElement: function initErrorElement() {
      this.$el.addClass(this.options.inputClass);
      var inputWrapper = $('<div class="se-error-wrapper">');
      this.$el.wrap(inputWrapper);

      var stateWrapper = $('<span>');
      stateWrapper.prepend($('<span class="se-field-invalid">')).prepend($('<span class="se-error-tooltip">'));

      this.$el.parent().prepend(stateWrapper);
    },

    initEvents: function initEvents() {
      var _this = this;

      this.$eventEl.on('focus', '.has-error', function (e) {
        _this.showErrorMessage(e);
      });

      this.$eventEl.on('keydown', '.has-error', function (e) {
        _this.hideErrorMessage(e);
      });

      this.$el.on('se-error', function (e) {
        if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'string') {
          _this.addError(arguments.length <= 1 ? undefined : arguments[1]);
        } else if (_typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object') {
          var error = (arguments.length <= 1 ? undefined : arguments[1]).error,
              htmlSafe = (arguments.length <= 1 ? undefined : arguments[1]).htmlSafe;
          _this.addError(error, htmlSafe);
        }
      });
    },

    hideErrorMessage: function hideErrorMessage(e) {
      $(e.currentTarget).removeClass('has-error show-error');
    },

    showErrorMessage: function showErrorMessage(e) {
      $(e.currentTarget).addClass('show-error');
    },

    addError: function addError(error, htmlSafe) {
      var errorField = this.$el.prev().find('.se-error-tooltip');

      if (this.options.html || htmlSafe) {
        errorField.html(error);
      } else {
        errorField.text(error);
      }

      this.$el.closest('.se-error-wrapper').addClass('has-error');
    }
  });

  $.fn.smoothError = function (options) {
    var attr = 'smooth-error';

    this.each(function () {
      var instance = $.data(this, attr);
      if (!instance) {
        instance = new SmoothError(this, options);
        $.data(this, attr, instance);
      }
    });
  };
})(jQuery, window, document);