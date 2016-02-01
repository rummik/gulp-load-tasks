var jscs = require('gulp-jscs');

module.exports = function() {
	return this.src(['*.js', 'tasks/*.js'])
		.pipe(jscs('.jscsrc'))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
};
