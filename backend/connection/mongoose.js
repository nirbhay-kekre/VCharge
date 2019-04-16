var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:password123@ds139956.mlab.com:39956/vcharge', {poolSize: 200});

module.exports = {mongoose};