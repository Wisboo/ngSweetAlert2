/**
@fileOverview

@toc

*/

'use strict';

angular.module('wisboo.ngSweetAlert2', [])
.constant('icons', {
	success: 'http://2.cdn.wisboo.com/static_images/confirmation.svg',
	warning: 'http://2.cdn.wisboo.com/static_images/alert.svg',
	error: 'http://2.cdn.wisboo.com/static_images/error.svg',
	question: 'http://2.cdn.wisboo.com/static_images/question.svg',
	info: 'http://2.cdn.wisboo.com/static_images/info.svg'
})
.factory('sweetAlert', [ '$timeout', '$window', 'icons', function ( $timeout, $window, icons ) {

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
			$timeout(function() {
				swal( object );
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
			return swal(props);
		},
		error: function(props) {
			angular.extend(props, { imageUrl: icons.error });
			return swal(props);
		},
		warning: function(props) {
			angular.extend(props, { imageUrl: icons.warning });
			return swal(props);
		},
		info: function(props) {
			angular.extend(props, { imageUrl: icons.info });
			return swal(props);
		},
		question: function(props) {
			angular.extend(props, { type: 'question', imageUrl: icons.question });
			return swal(props);
		}
	};

	angular.extend(self, props);

	return self;
}]);
