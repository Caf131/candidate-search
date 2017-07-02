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

      client.collection('profiles').distinct("employment.industry", function (err, docs){
        if(err) {
          deferred.reject(err);
        } else {
          deferred.resolve(docs.sort());
        };
      });

      return deferred.promise;
    }

    var getLocations = function () {
      var deferred = Q.defer();

      client.collection('profiles').distinct("location.state", function (err, docs){
        if(err) {
          deferred.reject(err);
        } else {
          deferred.resolve(docs.sort());
        };
      });

      return deferred.promise;
    }

    var getSeniorityLevels = function () {
      var deferred = Q.defer();

      client.collection('profiles').distinct("employment.seniorityLevel", function (err, docs){
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
      getIndustries: getIndustries,
      getLocations: getLocations,
      getSeniorityLevels: getSeniorityLevels
    }
};
