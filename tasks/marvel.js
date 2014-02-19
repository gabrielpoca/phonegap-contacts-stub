var _ = require('lodash-node');
var api = require('marvel-api');
var async = require('async');
var Faker = require('Faker');
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
    var charactersInfo = [];
    var done = this.async();

    mkpath.sync(baseDir, 0777);
    marvel.characters.findAll(100).then(function(results) {
      var downloadFunctions = _.map(results.data, function(character) {
        var parsedCharacter = {};
        parsedCharacter.id = character.id;
        parsedCharacter.name = character.name;
        parsedCharacter.emails = [ Faker.Internet.email() ];

        return (function(callback) {
          var path = character.thumbnail.path + '.' + character.thumbnail.extension;
          var destPath = baseDir + 'photo-'+character.id+'.jpg';
          parsedCharacter.photos = [destPath];
          charactersInfo.push(parsedCharacter);
          request(path)
          .pipe(fs.createWriteStream(destPath))
          .on('close', callback);
        });
      });

      async.parallelLimit(downloadFunctions, 10, function(err, results) {
        fs.writeFileSync(baseDir + 'charactersInfo.json', 'load('+JSON.stringify(charactersInfo)+');');
        done();
      });
    });
  });
}
