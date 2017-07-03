var Q = require('q');

module.exports = function (client) {
    var getProfileSnap = function (limit) {
      // return only the data that will appear in the non-detail View
      var deferred = Q.defer();

      client.collection('profiles')
        .find({ "location": { $ne: null } }, { firstName: 1, lastName: 1, email: 1, location: 1, social: 1, employment: 1 })
        .limit(limit)
        .toArray(function (err, docs){
          if(err) {
            deferred.reject(err);
          } else {
            deferred.resolve(docs);
          };
        });

      return deferred.promise;
    }

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
      getSeniorityLevels: getSeniorityLevels,
      getProfileSnap: getProfileSnap
    }
};
