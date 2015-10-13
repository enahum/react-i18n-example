/**
 * Created by enahum on 12-10-15.
 */

var utils = require('../libs/utils')(),
    fs = require('fs'),
    path = require('path'),
    basename  = path.basename(module.filename);
    locales = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function(file){
        var dir = __dirname + '/' + file,
            obj = {};
        if(!fs.lstatSync(dir).isDirectory()) return;

        fs.readdirSync(dir)
            .forEach(function(f) {
                utils.extend(obj, require(dir + '/' + f));
            });
        locales[file] = obj;
    });

module.exports = locales;