'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var Swal = _interopDefault(require('sweetalert2/dist/sweetalert2.js'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ngSweetAlert = angular.module('wisboo.ngSweetAlert2', []).constant('icons', {
  success: 'https://2.cdn.wisboo.com/images/sa_done.svg',
  warning: 'https://2.cdn.wisboo.com/images/sa_alert.svg',
  error: 'https://2.cdn.wisboo.com/images/sa_error.svg',
  question: 'https://2.cdn.wisboo.com/images/sa_question.svg',
  info: 'https://2.cdn.wisboo.com/images/sa_info.svg'
}).service('sweetAlert', ['$timeout', 'icons', '$q', function ($timeout, icons, $q) {
  var _this = this;

  //public methods
  var customSwal;

  var generateResultObject = function generateResultObject(result) {
    return _objectSpread(_objectSpread({}, result), {}, {
      isCancelled: result.dismiss === 'cancel',
      isBackdropped: result.dismiss === 'backdrop',
      isClosed: result.dismiss === 'close'
    });
  };

  this.setGlobals = function (customParams) {
    customSwal = Swal.mixin(customParams);
  };

  this.adv = function (_ref) {
    var _ref$returnResultObje = _ref.returnResultObject,
        returnResultObject = _ref$returnResultObje === void 0 ? false : _ref$returnResultObje,
        object = _objectWithoutProperties(_ref, ["returnResultObject"]);

    return $q(function (resolve, reject) {
      customSwal.fire(object).then(function (result) {
        if (returnResultObject) {
          resolve(generateResultObject(result));
        } else {
          if (result.value || !result.dismiss) {
            resolve(true, result.value);
          } else {
            resolve(false);
          }
        }
      });
    });
  };

  this.close = function () {
    customSwal.close();
  };

  this.timed = function (title, message, type, time) {
    $timeout(function () {
      customSwal.fire({
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
