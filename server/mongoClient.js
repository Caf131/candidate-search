var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var format = require('util').format;
var client = null;

module.exports = (function () {
  var getConnectionUrl = function (username, password) {
    var user = encodeURIComponent(username);
    var pass = encodeURIComponent(password);

    return format('mongodb://%s:%s@ds131900.mlab.com:31900/respondentio-test?authMechanism=%s',
      user,
      pass,
      'DEFAULT'
    );
  };

  var openConnection = function (url) {
    var deferred = Q.defer();

    if(client == null) {
      client = MongoClient.connect(url, function(err, db) {
        if(err) deferred.reject(err);

        deferred.resolve(db);
      });
    } else {
      deferred.resolve(client);
    }

    return deferred.promise;
  };
  return {
    getConnectionUrl: getConnectionUrl,
    openConnection: openConnection
  }
})();
