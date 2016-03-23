module.exports = function(grunt) {
	var webpack = require('webpack');
	var glob = require("glob");

	// We define two entries. One for our application and one for vendors
	// var entry = { main: './react/panel.js', vendors: ['react', 'elemental'] };

	// Creates a special Commons bundle that our application can require from
	var commonPlugin = [new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js")];

	// We need to uglify that code on deploy
	var uglifyPlugin = [new webpack.optimize.UglifyJsPlugin()];

	// Directory where *.js and *.jsx files will be compiled and placed in ./public/build
	var directory = 'react';
	// go through files in this directory and add them to target entry
 	var files = grunt.file.expand({cwd: directory}, '*.js', '*.jsx');
 	var entry = {vendors: ['react', 'elemental']};
 	for (var i = 0; i < files.length; i++) {
 		var filename = files[i].replace(/.js[x]?/g, '');
 		entry[filename] = './' + directory + '/' + files[i];
 	}

	console.log("entry:", entry);

	// The module options takes loaders, in this case transforming JSX to normal
	// javascript
	var module = { loaders: [{ test: /\.js[x]?$/, loader: 'jsx' }, { test: /\.less$/, loader: 'style!css!less' }] };
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
