(function () {
    angular
        .module('CYO')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            login: login,
            register: register,
            logout: logout,
            checkAdmin: checkAdmin,
            checkLoggedIn: checkLoggedIn,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function login(username, password) {
            var url = "/api/login";

            var credentials = {username: username, password: password};

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/logout";

            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/checkAdmin";

            return $http.get(url)
                .then(function (response) {
                    return respnse.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers(username, password) {
            var url = "/api/users";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {

            var url = "/api/assignment/user?username=" + username + "&password=" + password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {

            var url = "/api/" + userId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {

            var url = "/api/user";

            // creating brand new instance because we're making a new user
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;

            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {

            var url = "/api/user/" + userId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {

            var url = "/api/assignment/graduate/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();