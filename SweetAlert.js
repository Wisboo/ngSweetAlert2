import Swal from 'sweetalert2/dist/sweetalert2.js'

export const ngSweetAlert = angular.module('wisboo.ngSweetAlert2', [])
	.constant('icons', {
		success: 'https://2.cdn.wisboo.com/images/sa_done.svg',
		warning: 'https://2.cdn.wisboo.com/images/sa_alert.svg',
		error: 'https://2.cdn.wisboo.com/images/sa_error.svg',
		question: 'https://2.cdn.wisboo.com/images/sa_question.svg',
		info: 'https://2.cdn.wisboo.com/images/sa_info.svg'
	})
	
	.service('sweetAlert', ['$timeout', 'icons', '$q', function ($timeout, icons, $q) {
		//public methods
		let customSwal;
		this.setGlobals = (customParams) => {
      customSwal = Swal.mixin(customParams);
    };

		this.adv = (object) => {
			return $q(function (resolve, reject) {
				customSwal.fire(object).then(function (result) {
					if (result.value || !result.dismiss) {
						resolve(true, result.value);
					} else {
						resolve(false);
					}
				});
			});
		};

		this.close = () => {
			customSwal.close();
		};

		this.timed = (title, message, type, time) => {
			$timeout(function() {
				customSwal.fire({
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
