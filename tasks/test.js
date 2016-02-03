var gulp = require('gulp');
var exec = require('gulp-exec');
var through2 = require('through2');

module.exports = function() {
	return gulp.src('./tests/*')
		.pipe(exec('cd <%= file.path %>; basename <%= file.path %> >&2; gulp'))
		.pipe(exec.reporter({
			err: false,
			stderr: true,
			stdout: false
		}))
		.pipe(through2(function(chunk, enc, cb) {
			console.log(chunk);
			cb();
		}));
};
