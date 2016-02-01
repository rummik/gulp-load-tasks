/**
 * Gulp task loader.
 * @module gulp-load-tasks
 */

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var extend = require('extend');

/**
 * Gulp task loader. Loads Gulp tasks from a directory, instead of Gulpfile.js
 *
 * @param {object|string} [options]
 * @param {string} [options.dir='tasks'] Directory containing Gulp tasks
 * @param {string[]} [options.extensions=['.js']] Allowed extensions
 */
module.exports = function(userOpts) {
	'use strict';

	if (typeof userOpts === 'string') {
		userOpts = {
			dir: userOpts
		};
	}

	var opts = extend({
		dir: 'tasks',
		extensions: ['.js']
	}, userOpts);

	if (opts.dir[0] !== path.sep && opts.dir.slice(0, 2) !== '.' + path.sep) {
		opts.dir = path.join(process.cwd(), opts.dir);
	}

	fs
		.readdirSync(opts.dir)
		.forEach(function(filename) {
			var file = path.join(opts.dir, filename);
			var extension = path.extname(filename);
			var stat = fs.statSync(file);

			if (stat.isFile() && opts.extensions.indexOf(extension) === -1) {
				return;
			}

			var taskname = path.basename(filename, extension);
			var taskinfo = require(file);

			if (opts.params !== undefined) {
				if (!Array.isArray(taskInfo)) {
					taskInfo = [taskInfo];
				}

				var index = taskInfo.length - 1;
				var task = taskInfo[index];

				if (typeof task === 'function') {
					taskInfo[index] = task.bind.apply(task, [gulp].concat(opts.params));
				}
			}

			gulp.task.apply(gulp, [taskname].concat(taskinfo));
		});
};
