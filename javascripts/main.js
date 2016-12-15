
angular.module('Draw', [])
    .controller('DrawController', function($scope) {

        $scope.totalRanks = 4;
        $scope.ranks = [{
            rank: 1
        }, {
            rank: 2
        }, {
            rank: 3
        }, {
            rank: 4
        }];

        $scope.newRank = function() {
            $scope.totalRanks++;
            var rank = {
                rank: $scope.totalRanks
            };
            $scope.ranks.push(rank);
        };

        $scope.generateDraw = function() {

            var ranks = [];
            for(var i=0; i<$scope.ranks.length; i++) {
                var gRank = $scope.ranks[i];
                var text = gRank.text;
                var teamArr = text ? text.split("\n") : [];
                var teams = [];
                for(var j=0; j<teamArr.length; j++) {
                    var teamClean = teamArr[j].trim();
                    if(teamClean) {
                        teams.push(teamClean);
                    }
                }

                ranks.push(teams);
            }

            // The number of groups is the size of the largest rank
            var totalGroups = 0;
            for(var i=0; i<ranks.length; i++) {
                totalGroups = Math.max(totalGroups, ranks[i].length);
            }

            // Normalize the groups (they will have the same size)
            for(var i=0; i<ranks.length; i++) {
                var rank = ranks[i];
                while (rank.length < totalGroups) {
                    rank.push(null);
                }
            }

            var groups = [];
            for(var i=0; i<totalGroups; i++) {
                // generating group i
                var group = [];

                for(var j=0; j<ranks.length; j++) {
                    var rank = ranks[j];
                    var pos = Math.floor(Math.random() * rank.length);
                    var team = rank[pos];
                    if (team) {
                        group.push(team);
                    }
                    rank.splice(pos, 1);
                }

                groups.push(group);
            }

            $scope.groups = groups;

        };

        $scope.groupName = function(pos) {
            return String.fromCharCode(65 + pos);
        };


    });
