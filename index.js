/**
 * Gulp task loader.
 * @module gulp-load-tasks
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var extend = require('extend');

/**
 * Gulp task loader.  Loads Gulp tasks from a directory, instead of Gulpfile.js
 *
 * @param {object|string} [options]
 * @param {string} [options.dir='tasks']  Directory containing Gulp tasks
 * @param {string[]} [options.extensions=['.js']] Allowed extensions
 */
module.exports = function(userOpts) {
	'use strict';
	
	if (typeof userOpts == 'string') {
		userOpts = {
			dir: userOpts
		};
	}

	var opts = extend({
		dir: 'tasks/',
		extensions: ['.js']
	}, userOpts);

	if (opts.dir[0] !== path.sep && opts.dir.slice(0, 2) !== '.' + path.sep) {
		opts.dir = path.join(process.cwd(), opts.dir);
	}

		fs.readdirSync(opts.dir)
			.forEach(function(filename) {
				gutil.log('[gulp-load-tasks]', filename.toString({ colors: true }));

				var file = path.join(opts.dir, filename);
				var fileExists = fs.existsSync(file);

				if (!fileExists || opts.extensions.indexOf(path.extname(filename)) == -1) {
					console.error(new Error('[gulp-load-tasks] File '+ filename +' not exists or not compatibility with extension'));
				} else {
					var taskname = path.basename(filename, path.extname(filename));
					try {
						var taskinfo = require(file);
						gulp.task.apply(gulp, [taskname].concat(taskinfo));
					} catch (err) {
						console.error(new Error('[gulp-load-tasks] - ' + err));
					}

				}
			});
};
