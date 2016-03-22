module.exports = function(grunt) {
	var webpack = require('webpack');

	// We define two entries. One for our application and one for vendors
	var entry = { main: './app.js', vendors: ['react'] };

	// Creates a special Commons bundle that our application can require from
	var commonPlugin = [new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js")];

	// We need to uglify that code on deploy
	var uglifyPlugin = [new webpack.optimize.UglifyJsPlugin()];

	// The module options takes loaders, in this case transforming JSX to normal
	// javascript
	var module = { loaders: [{ test: /\.js$/, loader: 'jsx' }] };
	grunt.initConfig({
	  webpack: {
	  	panel: {
	      entry: { main: './react/panel.js', vendors: ['react'] },
	      plugins: commonPlugin.concat(uglifyPlugin),
	      stats: {
	        timings: true
	      },
	      output: {
	        filename: 'panel.js',
	        path: './public/build'
	      },
	      module: module
	    },

	  	managerPanel: {
	      entry: { main: './react/managerPanel.js', vendors: ['react'] },
	      plugins: commonPlugin.concat(uglifyPlugin),
	      stats: {
	        timings: true
	      },
	      output: {
	        filename: 'managerPanel.js',
	        path: './public/build'
	      },
	      module: module
	    }
	  }
	});

	grunt.loadNpmTasks('grunt-webpack');
	// build all
	grunt.registerTask('build', ['webpack:panel', 'webpack:managerPanel']);
	// panel (keep alive)
	grunt.registerTask('panel', 'Build panel with keepalive', function () {
		grunt.config.set('webpack.panel.keepalive', true);
		grunt.config.set('webpack.panel.watch', true);
	  	grunt.task.run('webpack:panel');
	});
	// managerPanel (keep alive)
	grunt.registerTask('managerPanel', 'Build managerPanel with keepalive', function () {
		grunt.config.set('webpack.managerPanel.keepalive', true);
		grunt.config.set('webpack.managerPanel.watch', true);
	  	grunt.task.run('webpack:managerPanel');
	});
	// default ('grunt')
	grunt.registerTask('default', ['build']);
};
