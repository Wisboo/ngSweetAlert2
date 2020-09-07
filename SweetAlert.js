import Swal from 'sweetalert2/dist/sweetalert2.js'

export const ngSweetAlert = angular.module('wisboo.ngSweetAlert2', [])
	.constant('icons', {
		success: 'https://2.cdn.wisboo.com/static_images/confirmacion.svg',
		warning: 'https://2.cdn.wisboo.com/static_images/alert.svg',
		error: 'https://2.cdn.wisboo.com/static_images/error.svg',
		question: 'https://2.cdn.wisboo.com/static_images/question.svg',
		info: 'https://2.cdn.wisboo.com/static_images/info.svg'
	})
	.service('sweetAlert', ['$timeout', 'icons', '$q', function ($timeout, icons, $q) {
		//public methods
		this.setGlobals = (customParams) => {
      Swal.setDefaults(customParams);
    };

		this.adv = (object) => {
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

		this.timed = (title, message, type, time) => {
			$timeout(function() {
				Swal.fire({
          title: title,
          message: message,
          type: type,
          time: time
        });
			});
		};

		this.success = (props) => {
			angular.extend(props, { imageUrl: icons.success });
			return this.adv(props);
		};

		this.error = (props) => {
			angular.extend(props, { imageUrl: icons.error });
			return this.adv(props);
		};

		this.warning = (props) => {
			angular.extend(props, { imageUrl: icons.warning });
			return this.adv(props);
		};

		this.info = (props) => {
			angular.extend(props, { imageUrl: icons.info });
			return this.adv(props);
		};

		this.question = (props) => {
			angular.extend(props, { imageUrl: icons.question });
			return this.adv(props);
		};
	}]);
