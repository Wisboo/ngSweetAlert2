/**
@fileOverview

@toc

*/

'use strict';

angular.module('wisboo.ngSweetAlert2', [])
.constant('icons', {
	success: 'http://2.cdn.wisboo.com/static_images/confirmacion.svg',
	warning: 'http://2.cdn.wisboo.com/static_images/alert.svg',
	error: 'http://2.cdn.wisboo.com/static_images/error.svg',
	question: 'http://2.cdn.wisboo.com/static_images/question.svg',
	info: 'http://2.cdn.wisboo.com/static_images/info.svg'
})
.factory('sweetAlert', [ '$timeout', '$window', 'icons', '$q',
function ( $timeout, $window, icons, $q ) {

	var swal = $window.swal;

  var globalAttrs = {};

	var self = function ( arg1, arg2, arg3 ) {
		$timeout(function() {
			if( typeof(arg2) === 'function' ) {
				swal(arg1, function(isConfirm) {
					$timeout( function() {
						arg2(isConfirm);
					});
				}, arg3 );
			} else {
				swal( arg1, arg2, arg3 );
			}
		});
	};

	//public methods
	var props = {
		swal: swal,
    setGlobals: function(customParams) {
      swal.setDefaults(customParams)
    },
		adv: function( object ) {
			return $q(function (resolve, reject) {
				swal( object ).then(function (result) {
					if (result.value || !result.dismiss) {
						resolve(true, result.value);
					} else {
						resolve(false);
					}
				});
			});

		},
		timed: function( title, message, type, time ) {
			$timeout(function() {
				swal( {
                title: title,
                message: message,
                type: type,
                time: time
        } );
			});
		},
		success: function(props) {
			angular.extend(props, { imageUrl: icons.success });
			return this.adv(props);
		},
		error: function(props) {
			angular.extend(props, { imageUrl: icons.error });
			return this.adv(props);
		},
		warning: function(props) {
			angular.extend(props, { imageUrl: icons.warning });
			return this.adv(props);
		},
		info: function(props) {
			angular.extend(props, { imageUrl: icons.info });
			return this.adv(props);
		},
		question: function(props) {
			angular.extend(props, { imageUrl: icons.question });
			return this.adv(props);
		}
	};

	angular.extend(self, props);

	return self;
}]);
