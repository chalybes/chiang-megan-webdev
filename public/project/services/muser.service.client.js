(function () {
    angular
        .module('CYO')
        .factory('muserService', muserService);

    function muserService($http) {

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
            var url = "/muser/login";

            var credentials = {username: username, password: password};

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/muser/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/muser/logout";

            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/muser/checkAdmin";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/muser/checkAuth";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers(username, password) {
            var url = "/muser/users";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {

            var url = "/muser/user?username=" + username + "&password=" + password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {

            var url = "/muser/" + userId;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {

            var url = "/muser/user";

            // creating brand new instance because we're making a new user
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/muser/user/" + userId;

            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {

            var url = "/muser/user/" + userId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {

            var url = "/muser/assignment/graduate/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();