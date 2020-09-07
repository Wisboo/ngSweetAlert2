'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Swal = _interopDefault(require('sweetalert2/dist/sweetalert2.js'));

var ngSweetAlert = angular.module('wisboo.ngSweetAlert2', []).constant('icons', {
  success: 'https://2.cdn.wisboo.com/static_images/confirmacion.svg',
  warning: 'https://2.cdn.wisboo.com/static_images/alert.svg',
  error: 'https://2.cdn.wisboo.com/static_images/error.svg',
  question: 'https://2.cdn.wisboo.com/static_images/question.svg',
  info: 'https://2.cdn.wisboo.com/static_images/info.svg'
}).service('sweetAlert', ['$timeout', 'icons', '$q', function ($timeout, icons, $q) {
  var _this = this;

  //public methods
  this.setGlobals = function (customParams) {
    Swal.setDefaults(customParams);
  };

  this.adv = function (object) {
    return $q(function (resolve, reject) {
      Swal.fire(object).then(function (result) {
        if (result.value || !result.dismiss) {
          resolve(true, result.value);
        } else {
          resolve(false);
        }
      });
    });
  };

  this.timed = function (title, message, type, time) {
    $timeout(function () {
      Swal.fire({
        title: title,
        message: message,
        type: type,
        time: time
      });
    });
  };

  this.success = function (props) {
    angular.extend(props, {
      imageUrl: icons.success
    });
    return _this.adv(props);
  };

  this.error = function (props) {
    angular.extend(props, {
      imageUrl: icons.error
    });
    return _this.adv(props);
  };

  this.warning = function (props) {
    angular.extend(props, {
      imageUrl: icons.warning
    });
    return _this.adv(props);
  };

  this.info = function (props) {
    angular.extend(props, {
      imageUrl: icons.info
    });
    return _this.adv(props);
  };

  this.question = function (props) {
    angular.extend(props, {
      imageUrl: icons.question
    });
    return _this.adv(props);
  };
}]);

exports.ngSweetAlert = ngSweetAlert;
