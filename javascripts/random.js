
angular.module('Draw', [])
    .controller('DrawController', function($scope) {

        $scope.numGroups = 4;

        $scope.generateDraw = function() {


            var text = $scope.teamText;
            var teamArr = text ? text.split("\n") : [];
            var teams = [];
            for(var i=0; i<teamArr.length; i++) {
                var teamClean = teamArr[i].trim();
                if(teamClean) {
                    teams.push(teamClean);
                }
            }

            var groups = [];
            for (var i=0; i<$scope.numGroups; i++) {
                groups.push([]);
            }

            var counter = 0;
            while (teams.length > 0) {
                var pos = Math.floor(Math.random() * teams.length);
                var team = teams[pos];
                groups[counter++ % groups.length].push(team);
                teams.splice(pos, 1);
            }

            shuffle(groups);

            $scope.groups = groups;

        };

        $scope.clear = function() {
            $scope.groups = null;
        };

        $scope.groupName = function(pos) {
            return String.fromCharCode(65 + pos);
        };


    });



function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}