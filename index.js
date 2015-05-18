var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var extend = require('extend');

/**
 * Gulp task loader.  Loads Gulp tasks from a directory, instead of Gulpfile.js
 * @param {object} options
 *   dir  Directory containing Gulp tasks (defaults to 'tasks')
 *   extensions Allowed extensions (defaults to ['js'])
 */
module.exports = function(userOpts) {
	'use strict';

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
			var stat = fs.statSync(file);

			if (stat.isFile() && opts.extensions.indexOf(path.extname(filename)) == -1) {
				return;
			}

			var taskname = path.basename(filename, path.extname(filename));
			var taskinfo = require(file);

			gulp.task.apply(gulp, [taskname].concat(taskinfo));
		});
};
