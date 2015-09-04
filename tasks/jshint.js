var jshint = require('gulp-jshint');

module.exports = function() {
	return this.src(['*.js', 'tasks/*.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
};
