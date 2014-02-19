var _ = require('lodash-node');
var api = require('marvel-api');
var async = require('async');
var fs = require('fs');
var request = require('request');
var mkpath = require('mkpath');

var marvel = api.createClient({
  publicKey: 'e06252509a69a51c05b3c92a9ca04971',
  privateKey: 'ed1b8fc758c308148d57ac8c32975a5752a1518f'
});

module.exports = function(grunt) {
  grunt.registerTask('update:info', 'Updates marvel info.', function() {
    var baseDir = __dirname + '/../vendor/';
    var done = this.async();

    mkpath.sync(baseDir, 0777);
    marvel.characters.findAll(100).then(function(results) {
      var downloadFunctions = _.map(results.data, function(character) {
        return (function(callback) {
          var path = character.thumbnail.path + '.' + character.thumbnail.extension;
          request(path)
          .pipe(fs.createWriteStream(baseDir + 'logo'+character.id+'.jpg'))
          .on('close', callback);
        });
      });
      async.parallelLimit(downloadFunctions, 10, function(err, results) {
        done();
      });
    });
  });
}
