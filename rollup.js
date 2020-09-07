import babel from 'rollup-plugin-babel';
import del from 'rollup-plugin-delete';
import json from 'rollup-plugin-json';

export default [
	{
		input: 'SweetAlert.js',
		output: {
			name: 'ngSweetAlert',
			file: 'dist/ngsweetalert.js',
			format: 'cjs'
		},
		plugins: [
      del({ targets: 'dist/*' }),
      json({}),
			babel({
        "babelrc": false,
        "runtimeHelpers": true,
        "plugins": [
          "@babel/plugin-external-helpers",
          "@babel/transform-async-to-generator",
          "@babel/plugin-transform-runtime"
        ],
        "presets": [
          "@babel/preset-env"
        ]
      })
		]
	}
];
