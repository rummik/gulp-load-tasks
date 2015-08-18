var fs = require('fs');
var path = require('path');
var util = require('util');
var gulp = require('gulp');

module.exports = function (dir) {
  'use strict';

  var params = [].slice.call(arguments, 1);

  if (typeof dir !== 'string') { dir = 'tasks'; }

  if (dir[0] !== path.sep && dir.slice(0, 2) !== '.' + path.sep) {
    dir = path.join(process.cwd(), dir);
  }

  fs.readdirSync(dir).forEach(function(fileName) {
    var file = path.join(dir, fileName);
    var stat = fs.statSync(file);

    if (stat.isFile() && fileName.slice(-3) !== '.js') { return; }

    var taskName = fileName.slice(0, -3);
    var taskInfo = require(file);

    if (!util.isArray(taskInfo)) { taskInfo = [taskInfo]; }

    var lastIndex = taskInfo.length - 1;
    var task = taskInfo[lastIndex];

    if (typeof task === 'function') {
      taskInfo[lastIndex] = task.bind.apply(task, [gulp].concat(params));
    }

    gulp.task.apply(gulp, [taskName].concat(taskInfo));
  });
};
