var Q = require('q');

module.exports = function (client) {
    var getAllProfiles = function (limit) {
      var deferred = Q.defer();

      client.collection('profiles').find({}).limit(limit).toArray(function (err, docs){
        if(err) {
          deferred.reject(err);
        } else {
          deferred.resolve(docs);
        };
      });

      return deferred.promise;
    };

    return {
      getAllProfiles: getAllProfiles
    }
};
