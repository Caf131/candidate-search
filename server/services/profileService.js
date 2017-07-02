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

    var getIndustries = function () {
      var deferred = Q.defer();
      console.log('getIndustries');

      client.collection('profiles').distinct("employment.industry", function (err, docs){
        if(err) {
          deferred.reject(err);
        } else {
          deferred.resolve(docs.sort());
        };
      });

      return deferred.promise;
    }

    return {
      getAllProfiles: getAllProfiles,
      getIndustries: getIndustries
    }
};
