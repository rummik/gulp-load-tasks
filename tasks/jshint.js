var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function() {
	return this.src(['*.js', 'tasks/*.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(stylish));
};
