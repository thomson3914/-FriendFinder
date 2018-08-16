// Dependencies
// =============================================================
var path = require("path");
var friends = require('../data/friends.js');

// Routing
// =============================================================
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
      return res.json(friends);
    });
  
  app.post("/api/friends", function(req, res) {
    var userData = req.body;

    var userScores = userData.scores;

    var matchName = "";
    var matchPic = "";
    var totalDiff = 1000;


    for(var i = 0; i < friends.length; i++) {
      var diff = 0;
      for (var j = 0; j < userScores.length; j++) {
        diff += Math.abs(friends[i].scores[j] - userScores[j]);
      }
     if (diff < totalDiff) {
       totalDiff = diff;
       matchName = friends[i].name;
       matchPic = friends[i].pic;
     }
    }

    friends.push(userData);

    res.json({status: "OK", matchName: matchName, matchPic: matchPic});
  });
};