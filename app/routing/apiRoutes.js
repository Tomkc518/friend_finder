var friendsList = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        return res.json(friendsList);
    });

    app.post('/api/friends', function(req, res) {
		var userInput = req.body;
		var userResponses = userInput.scores;
		var matchName = '';
		var matchImage = '';
		var totalDifference = 500; 

		// Compare answer scores against friendsList object
		for (var i = 0; i < friendsList.length; i++) {
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friendsList[i].scores[j] - userResponses[j]);
			}
			// If lowest difference, set Match
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friendsList[i].name;
				matchImage = friendsList[i].photo;
			}
		}
        // Add new user
		friendsList.push(userInput);

		// Send response to modal
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};