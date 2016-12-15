// Gruntfile.js
// Configuration file for compiling files with Grunt and Webpack
//
// Usage: 'grunt' command will compile and minify all *.js
//   and *.jsx files in ./react and put these in ./public/build
// 
// 'grunt watch' can be used for development, this will wait
//    and automatically recompile any changed files


module.exports = function(grunt) {
	var webpack = require('webpack');

	// Directory where *.js and *.jsx files will be compiled and placed in ./public/build
	var directory = 'react';

 	// vendors will be compiled to a file which can be shared between pages
 	var entry = {vendors: ['react', 'react-bootstrap', 'trianglify']};

	// go through files in this directory and add them to target entry
 	var files = grunt.file.expand({cwd: directory}, '*.js', '*.jsx');
 	for (var i = 0; i < files.length; i++) {
 		var filename = files[i].replace(/.js[x]?/g, '');
 		entry[filename] = './' + directory + '/' + files[i];
 	}

	// Creates a special Commons bundle that our application can require from
	var commonPlugin = [new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js")];
	// We need to uglify that code on deploy
	var uglifyPlugin = [new webpack.optimize.UglifyJsPlugin()];
	// The module options takes loaders, in this case transforming JSX to normal javascript
	var module = {
		loaders: [
			{ test: /\.js[x]?$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
          presets: ['es2015', 'react']
        }
			},
			{ test: /\.less$/,
				loader: 'style!css!less'
			},
			{ test: /\.json$/,
				loader: 'json'
			}
		]
	};

	grunt.initConfig({
	  webpack: {
	  	build: {
	      entry: entry,
	      plugins: commonPlugin.concat(uglifyPlugin),
	      stats: {
	        timings: true
	      },
	      output: {
	        filename: '[name].min.js',
	        path: './public/build'
	      },
	      module: module
	    },
	  }
	});

	/***** Set up Grunt tasks (for the command line interface 'grunt-cli') *****/

	grunt.loadNpmTasks('grunt-webpack');
	// build all files in ./react
	grunt.registerTask('build', ['webpack:build']);

	// 'watch' task (keep alive)
	grunt.registerTask('watch', 'Build all files on change', function () {
		grunt.config.set('webpack.build.keepalive', true);
		grunt.config.set('webpack.build.watch', true);
	  grunt.task.run('webpack:build');
	});

	// default ('grunt')
	grunt.registerTask('default', ['build']);
};
