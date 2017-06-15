(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        model.user = findUserById(userId);

        function findUserById(userId) {

            return users.find(function (user) {
                return user._id === userId;
            });
        }

    }

})();